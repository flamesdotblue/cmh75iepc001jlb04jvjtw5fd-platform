import { useEffect, useMemo, useRef, useState } from 'react'
import { Home, BookOpen, Sparkles, User, Sun, Moon, Search, ChevronRight, Filter } from 'lucide-react'

export default function Header({ data = [], onSearch, onThemeToggle, activeFilter, onFilterChange }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    onSearch?.(query)
  }, [query, onSearch])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return data
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6)
  }, [data, query])

  const themeIsDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-zinc-900/60">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 rounded-md p-1 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
          <BookOpen className="h-5 w-5" />
          <span className="font-semibold">LeafRead</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <NavItem icon={<Home className="h-4 w-4" />} label="Home" />
          <NavItem icon={<Sparkles className="h-4 w-4" />} label="Picks" />
          <NavItem icon={<User className="h-4 w-4" />} label="Profile" />
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div ref={containerRef} className="relative w-60 sm:w-80">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm ring-emerald-500 focus-within:ring-2 dark:border-white/10 dark:bg-zinc-900">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                placeholder="Search titles, authors, tags"
                className="w-full bg-transparent outline-none placeholder:text-zinc-400"
              />
            </div>

            {open && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200/70 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
                <ul className="max-h-72 divide-y divide-zinc-100 overflow-auto dark:divide-white/5">
                  {suggestions.map((s) => (
                    <li key={s.id}>
                      <button
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-zinc-50 dark:hover:bg-white/5"
                        onClick={() => {
                          setQuery(s.title)
                          setOpen(false)
                          inputRef.current?.blur()
                        }}
                      >
                        <img src={s.cover} alt="" className="h-10 w-8 rounded object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{s.title}</p>
                            <ChevronRight className="h-4 w-4 text-zinc-400" />
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.author} • {s.tags.join(', ')}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <label className="sr-only">Filter status</label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 py-1.5 text-xs shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <Filter className="h-3.5 w-3.5 text-zinc-500" />
              {['All', 'Ongoing', 'Completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange?.(f)}
                  className={`rounded-lg px-2 py-1 transition ${
                    activeFilter === f
                      ? 'bg-emerald-500 text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-white/5"
            title="Toggle theme"
          >
            {themeIsDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}

function NavItem({ icon, label }) {
  return (
    <a
      href="#"
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}
