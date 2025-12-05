import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500">
          DEMOREDESIGN
        </h1>
        <p className="text-gray-400 text-lg">Select a portfolio to explore</p>
      </header>

      <main className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Web Design Card */}
        <a 
          href="https://web.demoredesign.com"
          className="group block p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-green-500 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="h-12 w-12 bg-green-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">Web Design</h2>
          <p className="text-zinc-400">Custom digital experiences, full-stack applications, and business solutions.</p>
        </a>

        {/* Photography Card */}
        <a 
          href="https://photo.demoredesign.com"
          className="group block p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="h-12 w-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Photography</h2>
          <p className="text-zinc-400">Visual storytelling, event coverage, and artistic portraiture.</p>
        </a>

        {/* Data Card */}
        <a 
          href="https://data.demoredesign.com"
          className="group block p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="h-12 w-12 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Data</h2>
          <p className="text-zinc-400">Analytics, visualization, and data-driven insights.</p>
        </a>
      </main>

      <footer className="mt-20 text-zinc-500 text-sm">
        &copy; {new Date().getFullYear()} Demore Design. All rights reserved.
      </footer>
    </div>
  );
}
