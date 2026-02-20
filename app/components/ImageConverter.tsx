'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { Upload, FileImage, Loader2, Download, Trash2, Zap, ArrowRight, Link } from 'lucide-react';
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
  const [urlInput, setUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState('');

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

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || urlLoading) return;

    setUrlError('');
    setUrlLoading(true);

    try {
      const res = await fetch('/api/fetch-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch image');
      }

      const blob = await res.blob();
      const contentType = res.headers.get('content-type') || 'image/png';
      const ext = contentType.split('/')[1]?.replace('jpeg', 'jpg') || 'png';

      // Extract filename from URL or use a default
      let filename = 'image';
      try {
        const pathname = new URL(urlInput.trim()).pathname;
        const basename = pathname.split('/').pop();
        if (basename && basename.includes('.')) {
          filename = basename;
        } else {
          filename = `image.${ext}`;
        }
      } catch {
        filename = `image.${ext}`;
      }

      const file = new File([blob], filename, { type: contentType });
      const id = Math.random().toString(36).substring(7);
      const newFileObj: FileStatus = {
        file,
        id,
        status: 'pending',
        originalSize: file.size,
      };

      convertFile(newFileObj);
      setFiles(prev => [...prev, newFileObj]);
      setUrlInput('');
    } catch (err) {
      setUrlError(err instanceof Error ? err.message : 'Failed to fetch image');
    } finally {
      setUrlLoading(false);
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const processingCount = files.filter(f => f.status === 'processing' || f.status === 'pending').length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Format Selector */}
      <div className="flex justify-center gap-2 flex-wrap mb-10">
        {['webp', 'avif', 'png', 'jpg'].map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              format === f ? 'bg-[#FF3C00] text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:cursor-pointer'
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

      {/* URL Input */}
      <form onSubmit={handleUrlSubmit} className="mt-6 flex gap-3">
        <div className="flex-1 relative">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => { setUrlInput(e.target.value); setUrlError(''); }}
            placeholder="Paste image URL here..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#FF3C00] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!urlInput.trim() || urlLoading}
          className="px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#FF3C00] transition-all disabled:opacity-40 disabled:hover:bg-slate-900 hover:cursor-pointer flex items-center gap-2"
        >
          {urlLoading ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
          Convert
        </button>
      </form>
      {urlLoading && (
        <div className="mt-3 flex items-center gap-3 px-4 py-3 border rounded-2xl">
          <Loader2 className="animate-spin text-[#FF3C00]" size={18} />
          <span className="text-sm font-medium text-slate-600">Fetching image from URL...</span>
          <div className="flex-1 h-1.5 bg-grey-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF3C00] rounded-full animate-pulse w-2/3" />
          </div>
        </div>
      )}
      {urlError && (
        <p className="mt-2 text-sm text-red-500 font-medium pl-2">{urlError}</p>
      )}

      {/* Processing Banner */}
      {processingCount > 0 && (
        <div className="mt-6 flex items-center gap-3 px-4 py-3 border rounded-2xl">
          <Loader2 className="animate-spin text-[#FF3C00]" size={18} />
          <span className="text-sm font-medium text-slate-600">
            Converting {processingCount} {processingCount === 1 ? 'file' : 'files'}...
          </span>
          <div className="flex-1 h-1.5 bg-grey-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF3C00] rounded-full transition-all duration-300"
              style={{ width: `${files.length > 0 ? (completedCount / files.length) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-400">{completedCount}/{files.length}</span>
        </div>
      )}

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
<p className="text-xs font-medium text-slate-400 flex items-center gap-1">
  {(item.originalSize / 1024).toFixed(0)} KB 
  {item.compressedSize && (
    <>
      <ArrowRight size={12} className="inline-block mx-0.5 text-slate-300" />
      <span className="text-slate-600">{(item.compressedSize / 1024).toFixed(0)} KB</span>
    </>
  )}
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
                      className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition hover:cursor-pointer"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                  </>
                )}

                <button onClick={() => removeFile(item.id)} className="p-2.5 text-slate-300 hover:text-red-500 transition hover:cursor-pointer">
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
            className="text-slate-400 hover:text-red-500 hover:cursor-pointer font-bold text-sm transition order-2 sm:order-1"
          >
            Clear all files
          </button>
          
          {completedCount > 0 && (
            <button 
              onClick={downloadAsZip}
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#FF3C00] hover:cursor-pointer transition-all shadow-xl shadow-slate-200 order-1 sm:order-2"
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
