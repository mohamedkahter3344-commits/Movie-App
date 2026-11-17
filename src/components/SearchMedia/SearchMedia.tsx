
import { Label } from "flowbite-react";
import { useRef } from "react";
import { Search, LoaderCircle, RotateCcw } from "lucide-react";

interface SearchMediaProps {
  mediaType: "movie" | "tv";
  onSearch: (value: string) => void;
  isPending: boolean;
  onReset: () => void;
}

const SearchMedia = ({
  mediaType,
  onSearch,
  isPending,
  onReset,
}: SearchMediaProps) => {
  const searchContent = useRef<HTMLInputElement | null>(null);

  function compareSearchContent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const contentValue = searchContent.current?.value.trim();

    if (!contentValue || isPending) return;

    onSearch(contentValue);
  }

  function handleReset() {
    if (searchContent.current) {
      searchContent.current.value = "";
    }

    onReset();
  }

  const mediaLabel = mediaType === "movie" ? "movies" : "TV shows";

  return (
    <section className="mx-auto mb-10 w-full">
      {/* Search Form */}
      <form
        onSubmit={compareSearchContent}
        className="relative rounded-2xl border border-(--border-color) bg-(--bg-card) p-2 shadow-xl shadow-black/5 transition-all duration-300 focus-within:border-red-500/50 focus-within:shadow-red-500/5"
      >
        <Label htmlFor="simple-search" className="sr-only">
          Search {mediaType}
        </Label>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* Input */}
          <div className="group relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary) transition-colors group-focus-within:text-red-500"
            />

            <input
              ref={searchContent}
              type="search"
              id="simple-search"
              disabled={isPending}
              className="h-14 w-full rounded-xl border border-transparent bg-(--bg-primary) py-3 pl-12 pr-4 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-secondary) focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder={`Search for ${mediaLabel}...`}
              required
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isPending}
            className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-600/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isPending ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={19} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Search Footer */}
      <div className="mt-3 flex items-center justify-between gap-3 px-1">
        <p className="text-xs text-(--text-secondary)">
          Discover popular {mediaLabel} and more
        </p>

        <button
          type="button"
          onClick={handleReset}
          disabled={isPending}
          className="group flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-(--text-secondary) transition-all hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw
            size={14}
            className="transition-transform duration-300 group-hover:-rotate-45"
          />
          View Default
        </button>
      </div>
    </section>
  );
};

export default SearchMedia;
