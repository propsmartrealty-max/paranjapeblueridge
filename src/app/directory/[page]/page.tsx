export const runtime = 'edge';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getPseoTotalCount, generatePseoChunk } from '@/data/seo-matrix';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

const CHUNK_SIZE = 1000;

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageNum = parseInt(params.page, 10);
  if (isNaN(pageNum) || pageNum < 1) return {};

  const totalCount = getPseoTotalCount();
  const totalChunks = Math.ceil(totalCount / CHUNK_SIZE);

  if (pageNum > totalChunks) return {};

  return {
    title: `Pune Real Estate Directory - Part ${pageNum} | Paranjape Blue Ridge`,
    description: `Explore part ${pageNum} of the comprehensive master directory of premium real estate properties at Paranjape Blue Ridge Hinjewadi, Pune.`,
    alternates: {
      canonical: `https://paranjapeblueridge.com/directory/${pageNum}`,
    }
  };
}

export default function DirectoryChunkPage({ params }: PageProps) {
  const pageNum = parseInt(params.page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const totalCount = getPseoTotalCount();
  const totalChunks = Math.ceil(totalCount / CHUNK_SIZE);

  if (pageNum > totalChunks) {
    notFound();
  }

  const startIndex = (pageNum - 1) * CHUNK_SIZE;
  const chunk = generatePseoChunk(pageNum - 1, CHUNK_SIZE);

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      <section className="pt-32 pb-20 bg-navy">
        <div className="container mx-auto max-w-7xl px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-gold/20 pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-warm-white mb-2">
                Property Index <span className="text-gold">— Part {pageNum}</span>
              </h1>
              <p className="text-text-light">
                Showing entries {(startIndex + 1).toLocaleString()} to {(startIndex + chunk.length).toLocaleString()} of {totalCount.toLocaleString()}
              </p>
            </div>
            
            {/* Top Pagination Controls */}
            <div className="flex items-center gap-4 bg-white/5 rounded-full p-2 border border-white/10">
              <Link 
                href="/directory" 
                className="p-2 hover:bg-gold hover:text-navy rounded-full transition-colors text-text-light flex items-center gap-2 text-xs font-bold uppercase"
                title="Directory Home"
              >
                <Home size={16} /> <span className="hidden sm:inline">Hub</span>
              </Link>
              <div className="w-px h-6 bg-white/10"></div>
              <Link 
                href={pageNum > 1 ? `/directory/${pageNum - 1}` : '#'} 
                className={`p-2 rounded-full transition-colors flex items-center ${pageNum > 1 ? 'hover:bg-gold hover:text-navy text-text-light' : 'opacity-30 cursor-not-allowed text-text-light'}`}
                aria-disabled={pageNum <= 1}
              >
                <ChevronLeft size={20} />
              </Link>
              <span className="text-sm font-bold text-warm-white min-w-[3rem] text-center">{pageNum} / {totalChunks}</span>
              <Link 
                href={pageNum < totalChunks ? `/directory/${pageNum + 1}` : '#'} 
                className={`p-2 rounded-full transition-colors flex items-center ${pageNum < totalChunks ? 'hover:bg-gold hover:text-navy text-text-light' : 'opacity-30 cursor-not-allowed text-text-light'}`}
                aria-disabled={pageNum >= totalChunks}
              >
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          {/* URL Chunk Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-16">
            {chunk.map((item) => (
              <div key={item.slug} className="flex flex-col border-b border-white/5 pb-2">
                <Link href={`/${item.slug}`} className="text-sm text-warm-white hover:text-gold transition-colors leading-snug mb-1">
                  {item.title}
                </Link>
                <span className="text-[10px] text-text-light/50 uppercase tracking-widest">{item.silo.replace(/-/g, ' ')}</span>
              </div>
            ))}
          </div>

          {/* Bottom Pagination Controls */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4 bg-white/5 rounded-full p-2 border border-white/10">
              <Link 
                href="/directory" 
                className="p-2 hover:bg-gold hover:text-navy rounded-full transition-colors text-text-light flex items-center gap-2 text-xs font-bold uppercase"
              >
                <Home size={16} /> Directory Hub
              </Link>
              <div className="w-px h-6 bg-white/10"></div>
              <Link 
                href={pageNum > 1 ? `/directory/${pageNum - 1}` : '#'} 
                className={`p-2 rounded-full transition-colors flex items-center ${pageNum > 1 ? 'hover:bg-gold hover:text-navy text-text-light' : 'opacity-30 cursor-not-allowed text-text-light'}`}
              >
                <ChevronLeft size={20} /> Prev
              </Link>
              <Link 
                href={pageNum < totalChunks ? `/directory/${pageNum + 1}` : '#'} 
                className={`p-2 rounded-full transition-colors flex items-center ${pageNum < totalChunks ? 'hover:bg-gold hover:text-navy text-text-light' : 'opacity-30 cursor-not-allowed text-text-light'}`}
              >
                Next <ChevronRight size={20} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
