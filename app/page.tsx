import type { Metadata } from 'next';
import ImageConverter from './components/ImageConverter';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Shield, Layers, ImageIcon, UserX, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Images are processed instantly on high-performance servers. No waiting around.' },
  { icon: Shield, title: 'Secure & Private', description: 'Your images are never stored. Everything is processed in memory and discarded.' },
  { icon: Layers, title: 'Bulk Processing', description: 'Drop dozens of files at once and download them all in a single ZIP archive.' },
  { icon: ImageIcon, title: 'Next-Gen Formats', description: 'Convert to WebP and AVIF for up to 80% smaller files with no quality loss.' },
  { icon: UserX, title: 'No Signup Required', description: 'Start converting immediately. No account, no email, no strings attached.' },
  { icon: DollarSign, title: '100% Free', description: 'No hidden fees, no watermarks, no file limits. Completely free to use.' },
];

const steps = [
  {
    number: '01',
    title: 'Upload Your Images',
    description: 'Drag and drop your PNG, JPG, or WebP files directly onto the converter, or click to browse. You can upload dozens of files at once — there is no limit.',
  },
  {
    number: '02',
    title: 'Choose Output Format',
    description: 'Select your target format: WebP for broad browser support or AVIF for the smallest possible file size. Adjust quality with a simple slider.',
  },
  {
    number: '03',
    title: 'Download & Deploy',
    description: 'Your optimized images are ready in seconds. Download them individually or grab all files at once as a ZIP archive — ready to drop straight into your project.',
  },
];

const faqs = [
  {
    question: 'What is WebP and why should I use it?',
    answer: 'WebP is an image format developed by Google. It produces files roughly 25–35% smaller than JPEG and 50% smaller than PNG at the same visual quality. All modern browsers — Chrome, Firefox, Safari, Edge — support WebP, making it the safest next-gen format to adopt today. Switching to WebP is one of the fastest wins you can get from Google PageSpeed Insights.',
  },
  {
    question: 'What is AVIF and how does it compare to WebP?',
    answer: 'AVIF (AV1 Image File Format) is the newest generation of web image formats, offering 50–80% smaller files than JPEG. It handles gradients, photographic content, and transparency exceptionally well. Browser support is now excellent across Chrome, Firefox, and Safari. AVIF is ideal when file size is the top priority, such as for e-commerce product images or hero photos.',
  },
  {
    question: 'How does image optimization affect my website\'s SEO?',
    answer: 'Page speed is a confirmed Google ranking factor. Google\'s Core Web Vitals — especially Largest Contentful Paint (LCP) — are directly tied to how fast your images load. Large, unoptimized images are the single biggest cause of slow LCP scores. Converting images to WebP or AVIF and reducing file sizes by 50–80% can dramatically improve your Core Web Vitals, which in turn boosts your search rankings and user experience.',
  },
  {
    question: 'Are my uploaded images stored on your servers?',
    answer: 'No. All image processing happens in memory on the server and is immediately discarded after your download is complete. We never write your files to disk, never store them in a database, and never share them with third parties. Your images are private.',
  },
  {
    question: 'Is there a file size or number limit?',
    answer: 'There are no artificial limits. You can upload as many files as you want in one session and process them all at once. Practical limits depend only on your browser and network speed.',
  },
  {
    question: 'Do converted images lose quality?',
    answer: 'Only if you choose to reduce quality. By default, the converter uses a high-quality setting that is visually indistinguishable from the original while still achieving significant size reduction. You can lower the quality slider further if you need even smaller files, for example for thumbnails or previews.',
  },
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

      {/* How It Works */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#FF3C00] font-bold text-sm uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">How it works</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Converting and optimizing your images takes three steps and less than a minute — no software to install, no account needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative bg-white rounded-3xl border border-slate-100 p-8 hover:shadow-lg transition-all">
                <span className="text-6xl font-black text-slate-100 leading-none select-none">{step.number}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Image Optimization Matters */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#FF3C00] font-bold text-sm uppercase tracking-widest mb-3">SEO & performance</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Why image optimization matters for your website</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Images are the biggest performance bottleneck</h3>
                <p className="text-slate-500 leading-relaxed">
                  On average, images account for over 50% of a webpage&apos;s total byte weight. Unoptimized images slow down page load times,
                  increase bandwidth costs, and frustrate visitors — especially on mobile networks. Simply switching from PNG or JPEG to
                  WebP or AVIF can cut image payload by 50–80% with no visible quality difference.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Google rewards fast pages</h3>
                <p className="text-slate-500 leading-relaxed">
                  Page speed has been a Google ranking signal since 2010, and it became even more important with the introduction of
                  Core Web Vitals in 2021. The <strong>Largest Contentful Paint (LCP)</strong> metric — which measures how fast the main
                  content of a page loads — is almost always dominated by a hero image or product photo. Optimizing that single image
                  can move your LCP from &quot;Poor&quot; to &quot;Good&quot; and directly improve your search rankings.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">WebP vs AVIF vs JPEG: which format to choose?</h3>
                <p className="text-slate-500 leading-relaxed">
                  <strong>JPEG</strong> is the legacy standard — universally supported but inefficient.{' '}
                  <strong>WebP</strong> is Google&apos;s answer: 25–35% smaller than JPEG at the same quality, supported by all modern
                  browsers, and a safe default for any web project.{' '}
                  <strong>AVIF</strong> is the next evolution: up to 80% smaller than JPEG, with better handling of gradients and
                  fine detail. It is now supported by Chrome, Firefox, and Safari, making it viable for production use today.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Better UX, lower bounce rate</h3>
                <p className="text-slate-500 leading-relaxed">
                  Studies consistently show that a 1-second delay in page load time increases bounce rate by up to 32%. Visitors who
                  land on a fast page stay longer, view more content, and convert at higher rates. Image optimization is the single
                  highest-leverage change most websites can make to improve both user experience and business outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#FF3C00] font-bold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Frequently asked questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl border border-slate-100 p-7">
                <h3 className="text-base font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
