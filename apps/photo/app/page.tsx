import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import fs from "fs";
import path from "path";

// This runs on the server at build time or request time
async function getPortfolioImages() {
  const portfolioDir = path.join(process.cwd(), "public/portfolio");
  
  try {
    // Ensure directory exists
    if (!fs.existsSync(portfolioDir)) {
      return [];
    }
    
    const files = fs.readdirSync(portfolioDir);
    
    // Filter for image files
    const images = files.filter(file => 
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
    );
    
    // Map to a consistent format
    return images.map((file, index) => ({
      id: index,
      src: `/portfolio/${file}`,
      title: file.split('.')[0].replace(/-/g, ' '), // Simple title from filename
      category: "Photography",
      // Simple logic to alternate aspect ratios based on index (even=landscape, odd=portrait)
      // You can customize this logic or naming convention later
      isTall: index % 2 !== 0
    }));
  } catch (error) {
    console.error("Error reading portfolio directory:", error);
    return [];
  }
}

export default async function PhotoHome() {
  const photos = await getPortfolioImages();

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 text-center relative">
        <div className="max-w-5xl mx-auto z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display uppercase leading-[0.9] tracking-tighter mb-12">
            Hello, I'm <span className="text-white">Demore Design</span>, <span className="text-zinc-500">Visual Storyteller</span>, Creative Director & <span className="text-zinc-500">Artist</span> Based In <span className="text-white">The Digital Realm</span>.
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 border border-zinc-800 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold tracking-widest uppercase">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section id="portfolio" className="py-20 px-4 md:px-8 max-w-[1800px] mx-auto border-t border-zinc-900/50">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 uppercase tracking-tighter">Recent Work</h2>
        
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className={`relative group overflow-hidden bg-zinc-900 cursor-pointer ${photo.isTall ? 'aspect-[3/4] md:row-span-2' : 'aspect-[4/3]'}`}
              >
                <Image 
                  src={photo.src} 
                  alt={photo.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/60 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <h3 className="text-xl font-display font-bold uppercase">{photo.title}</h3>
                  <p className="text-xs text-zinc-300 tracking-widest mt-1">{photo.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </section>


      {/* Contact Section */}
      <section id="about" className="py-32 border-t border-zinc-900/50 px-4 md:px-8 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.8] mb-8">
              Contact<br />Me
            </h2>
            <p className="text-zinc-400 text-lg">
              Got an idea for a project? Let's make it happen!
            </p>
          </div>
          
          <form className="space-y-8 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Name*</label>
              <input type="text" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-white transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Email*</label>
              <input type="email" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-white transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Message</label>
              <textarea className="w-full bg-transparent border-b border-zinc-800 py-4 h-32 resize-none focus:outline-none focus:border-white transition-colors"></textarea>
            </div>
            <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
