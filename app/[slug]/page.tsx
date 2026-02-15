import { Metadata } from 'next';
import ImageConverter from '../components/ImageConverter';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split('-to-');
  if (parts.length !== 2) return { title: 'Image Converter' };

  const [from, to] = parts.map(p => p.toUpperCase());

  return {
    title: `Convert ${from} to ${to} Online | Fast & High Quality`,
    description: `Easily convert ${from} to ${to} for free. Batch processing, high compression, and no quality loss. Optimized for web developers.`,
  };
}

export default async function DynamicConverterPage({ params }: Props) {
  const { slug } = await params;
  const parts = slug.split('-to-');
  
  if (parts.length !== 2) notFound();

  const [from, to] = parts;

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-black tracking-tight mb-4 text-slate-900">
          {from.toUpperCase()} to {to.toUpperCase()}
        </h1>
        <p className="text-lg text-slate-500 mb-12 uppercase tracking-wide">Optimization Engine</p>
        
        <ImageConverter defaultFormat={to} />

        <section className="mt-24 text-left border-t pt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 italic">Why convert to {to.toUpperCase()}?</h2>
            <p className="text-slate-600 leading-relaxed">
              Converting your images to modern formats like WebP or AVIF can reduce file size by up to 80% without visible quality loss. This leads to faster page loads and better SEO rankings.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 italic">How it works?</h2>
            <p className="text-slate-600 leading-relaxed">
              Our tool uses the industry-standard <strong>Sharp</strong> library. Images are processed instantly on our high-performance server and delivered back to you in a ZIP archive.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}