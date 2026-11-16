

const LoadingSkeleton = () => {
  return (
    <main className="min-h-screen bg-(--bg-primary) px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-4 h-4 w-36 animate-pulse rounded bg-(--bg-card)" />
            <div className="h-10 w-64 animate-pulse rounded-lg bg-(--bg-card)" />
            <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-(--bg-card)" />
          </div>

          <div className="h-12 w-full animate-pulse rounded-lg bg-(--bg-card) sm:w-64" />
        </div>

        <div className="mb-8 h-20 w-full animate-pulse rounded-xl bg-(--bg-card)" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-2/3 rounded-xl bg-(--bg-card)" />
              <div className="mt-3 h-4 w-3/4 rounded bg-(--bg-card)" />
              <div className="mt-2 h-3 w-1/2 rounded bg-(--bg-card)" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LoadingSkeleton;
