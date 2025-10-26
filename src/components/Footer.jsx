export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white/50 py-10 dark:border-white/10 dark:bg-zinc-900/40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold">LeafRead</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              A modern manga & webtoon reading experience. Fast, elegant, and crafted for long reading sessions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Explore</h4>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:underline">Trending</a></li>
              <li><a href="#" className="hover:underline">Editor’s Picks</a></li>
              <li><a href="#" className="hover:underline">Library</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Copyright</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} LeafRead. All rights reserved.</p>
          <p>Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
