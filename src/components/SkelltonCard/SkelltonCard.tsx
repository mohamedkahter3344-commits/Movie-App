

const SkelltonCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-card)">
      {/* Poster Skeleton */}
      <div className="aspect-2/3 bg-gray-300 dark:bg-gray-700" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="h-10 w-full rounded-lg bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  )
}

export default SkelltonCard
