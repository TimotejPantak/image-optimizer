import ImageConverter from './components/ImageConverter';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Shield, Layers, ImageIcon, UserX, DollarSign } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Images are processed instantly on high-performance servers. No waiting around.' },
  { icon: Shield, title: 'Secure & Private', description: 'Your images are never stored. Everything is processed in memory and discarded.' },
  { icon: Layers, title: 'Bulk Processing', description: 'Drop dozens of files at once and download them all in a single ZIP archive.' },
  { icon: ImageIcon, title: 'Next-Gen Formats', description: 'Convert to WebP and AVIF for up to 80% smaller files with no quality loss.' },
  { icon: UserX, title: 'No Signup Required', description: 'Start converting immediately. No account, no email, no strings attached.' },
  { icon: DollarSign, title: '100% Free', description: 'No hidden fees, no watermarks, no file limits. Completely free to use.' },
];

const marqueeItems = [
  'PNG', 'JPG', 'WebP', 'AVIF', 'Sharp', 'Next.js', 'Vercel',
];

export default function Home() {
  const popularConversions = [
    'png-to-webp', 'jpg-to-webp', 'png-to-avif', 'jpg-to-avif', 'webp-to-jpg', 'png-to-jpg'
  ];

  return (
    <>
      {/* Hero + Converter */}
      <main
        className="relative min-h-screen py-16 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(179, 178, 178, 0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(179, 178, 178, 0.13) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      >
        {/* Top-left glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,60,0,0.18) 0%, transparent 70%)' }} />
        {/* Bottom-right glow */}
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,60,0,0.12) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto text-center px-4">
          <a href="https://metinas.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-full border border-slate-100 hover:border-[#FF3C00] transition-colors">
            <Image src="/metinas_logo.webp" alt="METINAS" width={20} height={20} className="rounded-sm" />
            <span className="text-sm font-bold text-slate-500">By <span className="text-slate-800">METINAS</span></span>
          </a>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-slate-900 leading-tight">
            Best <span className="text-[#FF3C00]">free</span> online <span className="text-[#FF3C00]">Image Converter</span> & Optimizer
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-6">
            Bulk convert PNG, JPG, and WebP to next-gen formats like <strong>AVIF</strong> and <strong>WebP</strong>.
            Fast, secure, and high-quality compression.
          </p>

          <ImageConverter />

          <div className="mt-20">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Popular Tools</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {popularConversions.map(slug => (
                <Link key={slug} href={`/${slug}`} className="text-black hover:text-orange-700 hover:cursor-pointer font-medium text-sm">
                  {slug.replace(/-/g, ' ').toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#FF3C00] font-bold text-sm uppercase tracking-widest mb-3">Why choose us</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Everything you need. Nothing you don&apos;t.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-[#FF3C00]/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
                  <feature.icon className="text-[#FF3C00]" size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Marquee */}
      {/* <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest mb-10">Powered by modern technologies</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee 25s linear infinite', width: 'max-content' }}
          >
            {Array.from({ length: 6 }, (_, setIndex) =>
              marqueeItems.map((item, i) => (
                <span
                  key={`${setIndex}-${i}`}
                  className="text-3xl font-black tracking-tight text-slate-200 select-none mx-10"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="https://metinas.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:opacity-70 transition-opacity">
              <Image src="/metinas_logo.webp" alt="METINAS" width={28} height={28} className="rounded-lg" />
              <span className="text-slate-900 font-black text-base tracking-tight">METINAS</span>
            </a>

            <div className="flex items-center gap-6">
              <a href="https://metinas.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-[#FF3C00] transition-colors font-medium">
                metinas.com
              </a>
              <span className="hidden md:inline text-slate-200">|</span>
              <span className="text-sm text-slate-300 font-mono">&copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
