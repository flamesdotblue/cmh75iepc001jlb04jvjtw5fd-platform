import { Star, BookOpen } from 'lucide-react'

export default function SeriesCard({ item }) {
  return (
    <a
      href={`#/series/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
    >
      <div className="relative">
        <img src={item.cover} alt={item.title} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
          <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
            {item.status}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-400" /> {item.rating}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-1 font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">{item.author} • {item.year}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.reads.toLocaleString()} reads</div>
          <button className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-emerald-600">
            <BookOpen className="h-3.5 w-3.5" /> Start
          </button>
        </div>
      </div>
    </a>
  )
}
