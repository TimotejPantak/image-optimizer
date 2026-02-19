import ImageConverter from './components/ImageConverter';
import Link from 'next/link';

export default function Home() {
  const popularConversions = [
    'png-to-webp', 'jpg-to-webp', 'png-to-avif', 'jpg-to-avif', 'webp-to-jpg', 'png-to-jpg'
  ];

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
<h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-slate-900 leading-tight">
  Best <span className="text-[#FF3C00]">free</span> online <span className="text-[#FF3C00]">Image Converter</span> & Optimizer
</h1>
<p className="text-xl text-slate-500 max-w-2xl mx-auto mb-6" >
    Bulk convert PNG, JPG, and WebP to next-gen formats like <strong>AVIF</strong> and <strong>WebP</strong>. 
    Fast, secure, and high-quality compression.
  </p>        
        <ImageConverter />

        <div className="mt-20">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Popular Tools</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {popularConversions.map(slug => (
              <Link key={slug} href={`/${slug}`} className="text-blue-500 hover:text-orange-700 font-medium text-sm">
                {slug.replace(/-/g, ' ').toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
