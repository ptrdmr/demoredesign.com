"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  isTall: boolean;
}

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPhotoIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex]);

  const navigate = (direction: number) => {
    if (selectedPhotoIndex === null) return;
    
    const newIndex = selectedPhotoIndex + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setSelectedPhotoIndex(newIndex);
    } else if (newIndex < 0) {
        // Loop to end
        setSelectedPhotoIndex(photos.length - 1);
    } else {
        // Loop to start
        setSelectedPhotoIndex(0);
    }
  };

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  if (photos.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        <p className="mb-4">No photos found in public/portfolio.</p>
        <p className="text-sm">Add images to apps/photo/public/portfolio to see them here.</p>
        {/* Fallback grid just for design visualization if empty */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 opacity-50 pointer-events-none">
           <div className="aspect-[4/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center">Example 1</div>
           <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 flex items-center justify-center md:row-span-2">Example 2 (Tall)</div>
           <div className="aspect-[4/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center">Example 3</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedPhotoIndex(index)}
            className={`relative group overflow-hidden bg-zinc-900 cursor-pointer ${photo.isTall ? 'aspect-[3/4] md:row-span-2' : 'aspect-[4/3]'}`}
          >
            <Image 
              src={photo.src} 
              alt={photo.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
            />
            {/* Optimization: Only show gradients if needed, or use simple opacity instead of gradients if perf is bad */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/60 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
              <h3 className="text-xl font-display font-bold uppercase">{photo.title}</h3>
              <p className="text-xs text-zinc-300 tracking-widest mt-1">{photo.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors z-[102]"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-[102] p-4"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors z-[102] p-4"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={() => setSelectedPhotoIndex(null)} // Close when clicking outside image
          >
            <div 
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
                <Image 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title} 
                fill
                sizes="100vw"
                className="object-contain"
                priority
                />
            </div>
            
            {/* Caption Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-[101]">
                <h3 className="text-2xl font-display font-bold uppercase text-white mb-1 drop-shadow-lg">{selectedPhoto.title}</h3>
                <p className="text-sm text-zinc-300 tracking-widest drop-shadow-lg">{selectedPhoto.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
