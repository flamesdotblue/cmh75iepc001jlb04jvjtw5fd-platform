import { Flame, Sparkles } from 'lucide-react'
import SeriesCard from './SeriesCard'

export default function HomeSections({ data = [], allData = [] }) {
  const newReleases = [...allData]
    .sort((a, b) => b.year - a.year)
    .slice(0, 6)
  const trending = data.filter((s) => s.trending).slice(0, 6)
  const picks = allData.filter((s) => s.editorsPick).slice(0, 6)

  return (
    <div className="space-y-12">
      <Section title="New Releases" description="Fresh chapters and brand-new series to jump into.">
        <Grid items={newReleases} />
      </Section>

      <Section
        title={
          <span className="inline-flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" /> Trending
          </span>
        }
        description="What readers are loving right now."
      >
        <Grid items={trending} emptyText="No trending results for current filter." />
      </Section>

      <Section
        title={
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" /> Editor’s Picks
          </span>
        }
        description="Hand-picked stories with outstanding art and storytelling."
      >
        <Grid items={picks} />
      </Section>
    </div>
  )
}

function Section({ title, description, children }) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
        <a href="#" className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400">
          View all
        </a>
      </div>
      {children}
    </section>
  )
}

function Grid({ items = [], emptyText = 'Nothing to show.' }) {
  if (!items || items.length === 0) {
    return <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">{emptyText}</div>
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <SeriesCard key={item.id} item={item} />
      ))}
    </div>
  )
}
