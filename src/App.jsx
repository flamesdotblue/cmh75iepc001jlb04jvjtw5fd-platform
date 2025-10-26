import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import HomeSections from './components/HomeSections'
import Footer from './components/Footer'

function App() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All') // All | Ongoing | Completed

  // Mock series data
  const series = useMemo(
    () => [
      {
        id: '1',
        slug: 'shadow-realm-chronicles',
        title: 'Shadow Realm Chronicles',
        author: 'Aiko Tan',
        status: 'Ongoing',
        year: 2024,
        rating: 4.7,
        reads: 152340,
        favorites: 10234,
        tags: ['Fantasy', 'Adventure', 'Action'],
        cover: 'https://images.unsplash.com/photo-1526312426976-593c128eea49?q=80&w=800&auto=format&fit=crop',
        trending: true,
        editorsPick: true,
        description:
          'A portal opens to a world of shadows. An unlikely hero must master the darkness to save both realms.',
      },
      {
        id: '2',
        slug: 'neon-city-runners',
        title: 'Neon City Runners',
        author: 'R. Kuro',
        status: 'Ongoing',
        year: 2023,
        rating: 4.5,
        reads: 98321,
        favorites: 8231,
        tags: ['Sci-fi', 'Cyberpunk', 'Thriller'],
        cover: 'https://images.unsplash.com/photo-1520975922438-8bdf0f6e1af8?q=80&w=800&auto=format&fit=crop',
        trending: true,
        editorsPick: false,
        description:
          'In a neon-drenched metropolis, couriers carry secrets faster than the law can chase.',
      },
      {
        id: '3',
        slug: 'petals-in-the-wind',
        title: 'Petals in the Wind',
        author: 'Hana M.',
        status: 'Completed',
        year: 2021,
        rating: 4.9,
        reads: 203401,
        favorites: 15820,
        tags: ['Romance', 'Drama', 'Slice of Life'],
        cover: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=800&auto=format&fit=crop',
        trending: false,
        editorsPick: true,
        description:
          'A tender story about love, loss, and the seasons that carry us forward.',
      },
      {
        id: '4',
        slug: 'iron-temple',
        title: 'Iron Temple',
        author: 'Ken Arata',
        status: 'Ongoing',
        year: 2022,
        rating: 4.2,
        reads: 65420,
        favorites: 4210,
        tags: ['Action', 'Martial Arts'],
        cover: 'https://images.unsplash.com/photo-1520975661595-645f04f100e1?q=80&w=800&auto=format&fit=crop',
        trending: false,
        editorsPick: false,
        description:
          'A young monk leaves the mountain to test his strength against a ruthless empire.',
      },
      {
        id: '5',
        slug: 'forest-of-lanterns',
        title: 'Forest of Lanterns',
        author: 'Mina Ko',
        status: 'Completed',
        year: 2020,
        rating: 4.8,
        reads: 188220,
        favorites: 14011,
        tags: ['Fantasy', 'Mystery'],
        cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
        trending: true,
        editorsPick: true,
        description:
          'A lantern-lit path reveals spirits and secrets in a sacred forest.',
      },
      {
        id: '6',
        slug: 'stellar-kitchen',
        title: 'Stellar Kitchen',
        author: 'Chef Nori',
        status: 'Ongoing',
        year: 2024,
        rating: 4.3,
        reads: 43211,
        favorites: 3201,
        tags: ['Comedy', 'Food', 'Slice of Life'],
        cover: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
        trending: false,
        editorsPick: false,
        description:
          'A chef travels the galaxy to gather recipes and friends along the way.',
      },
    ],
    []
  )

  // Theme setup: respect system theme, allow toggle via Header
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleToggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = series
    if (activeFilter !== 'All') {
      list = list.filter((s) => s.status === activeFilter)
    }
    if (!q) return list
    return list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [query, activeFilter, series])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header
        data={series}
        onSearch={(q) => setQuery(q)}
        onThemeToggle={handleToggleTheme}
        activeFilter={activeFilter}
        onFilterChange={(v) => setActiveFilter(v)}
      />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-indigo-500/10 p-6 ring-1 ring-zinc-200/50 backdrop-blur dark:ring-white/10">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Discover your next favorite series</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            New releases, trending picks, and editor recommendations. Enjoy a smooth reading experience with a
            beautiful, distraction-free UI.
          </p>
        </div>

        <HomeSections data={filtered} allData={series} />
      </main>

      <Footer />
    </div>
  )
}

export default App
