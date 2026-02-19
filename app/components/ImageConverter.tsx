'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { Upload, FileImage, CheckCircle, Loader2, Download, Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileStatus {
  file: File;
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  originalSize: number;
  compressedSize?: number;
  resultBlob?: Blob;
}

interface Props {
  defaultFormat?: string;
}

export default function ImageConverter({ defaultFormat = 'webp' }: Props) {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [format, setFormat] = useState(defaultFormat);

  useEffect(() => {
    setFormat(defaultFormat);
  }, [defaultFormat]);

  // Funkcia na konverziu jedného súboru
  const convertFile = async (item: FileStatus) => {
    setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'processing' } : f));

    try {
      const formData = new FormData();
      formData.append('file', item.file);
      formData.append('format', format);

      const res = await fetch('/api/convert', { method: 'POST', body: formData });
      if (!res.ok) throw new Error();
      
      const blob = await res.blob();
      
      setFiles(prev => prev.map(f => f.id === item.id ? { 
        ...f, 
        status: 'completed', 
        compressedSize: blob.size, 
        resultBlob: blob 
      } : f));
    } catch (e) {
      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error' } : f));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const id = Math.random().toString(36).substring(7);
      const newFileObj: FileStatus = {
        file,
        id,
        status: 'pending',
        originalSize: file.size,
      };
      
      // Spustíme konverziu hneď po vytvorení objektu
      convertFile(newFileObj);
      
      return newFileObj;
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  }, [format]); // Reaguje na zmenu formátu

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] } 
  });

  const downloadSingle = (item: FileStatus) => {
    if (!item.resultBlob) return;
    const url = URL.createObjectURL(item.resultBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.file.name.split('.')[0]}.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsZip = async () => {
    const zip = new JSZip();
    const completedFiles = files.filter(f => f.status === 'completed' && f.resultBlob);
    
    completedFiles.forEach(f => {
      zip.file(`${f.file.name.split('.')[0]}.${format}`, f.resultBlob!);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optimized_images.zip`;
    link.click();
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Format Selector */}
      <div className="flex justify-center gap-2 flex-wrap mb-10">
        {['webp', 'avif', 'png', 'jpg'].map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              format === f ? 'bg-[#FF3C00] text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Drag & Drop Area */}
      <div {...getRootProps()} className={`border-4 border-dashed rounded-[2.5rem] p-12 text-center cursor-pointer transition-all ${
        isDragActive ? 'border-[#FF3C00] bg-orange-50' : 'border-slate-200 hover:border-[#FF3C00] bg-slate-50/50'
      }`}>
        <input {...getInputProps()} />
        <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
          <Upload className="text-[FF3C00]" size={28} />
        </div>
        <p className="text-xl font-bold text-slate-800">Drop and Convert</p>
        <p className="text-slate-400 mt-1">Files will be processed immediately</p>
      </div>

      {/* File List */}
      <div className="mt-8 space-y-3">
        <AnimatePresence>
          {files.map((item) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
              key={item.id} 
              className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-3xl shadow-sm"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="bg-slate-50 p-3 rounded-2xl flex-shrink-0">
                  <FileImage className="text-slate-400" size={24} />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="font-bold text-slate-800 truncate text-sm">{item.file.name}</p>
                  <p className="text-xs font-medium text-slate-400">
                    {(item.originalSize / 1024).toFixed(0)} KB 
                    {item.compressedSize && ` ${<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/></svg>} ${(item.compressedSize / 1024).toFixed(0)} KB`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {item.status === 'processing' && <Loader2 className="animate-spin text-[#FF3C00]" size={20} />}
                
                {item.status === 'completed' && (
                  <>
                    <span className="hidden sm:inline-block bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-md font-black">
                      -{(((item.originalSize - item.compressedSize!) / item.originalSize) * 100).toFixed(0)}%
                    </span>
                    <button 
                      onClick={() => downloadSingle(item)}
                      className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                  </>
                )}

                <button onClick={() => removeFile(item.id)} className="p-2.5 text-slate-300 hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Actions (ZIP & Clear) */}
      {files.length > 0 && (
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-6 rounded-[2rem]">
          <button 
            onClick={() => setFiles([])}
            className="text-slate-400 hover:text-red-500 font-bold text-sm transition order-2 sm:order-1"
          >
            Clear all files
          </button>
          
          {completedCount > 0 && (
            <button 
              onClick={downloadAsZip}
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 order-1 sm:order-2"
            >
              <Zap size={20} fill="currentColor" />
              Download All as ZIP ({completedCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
