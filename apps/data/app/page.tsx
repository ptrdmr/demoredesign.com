export default function DataHome() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="inline-block p-4 rounded-full bg-blue-900/20 mb-4">
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight">Data & Analytics</h1>
        
        <div className="h-px w-24 bg-zinc-800 mx-auto my-8"></div>
        
        <p className="text-xl text-zinc-400">
          Construction in progress.
          <br />Preparing datasets and visualizations for display.
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
