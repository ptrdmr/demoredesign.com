export default function PhotoHome() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="inline-block p-4 rounded-full bg-purple-900/20 mb-4">
          <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight">Photography</h1>
        
        <div className="h-px w-24 bg-zinc-800 mx-auto my-8"></div>
        
        <p className="text-xl text-zinc-400">
          We are currently curating our visual portfolio. 
          <br />Check back soon for the launch.
        </p>

        <div className="pt-8">
          <a href="https://demoredesign.com" className="text-sm text-zinc-500 hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
