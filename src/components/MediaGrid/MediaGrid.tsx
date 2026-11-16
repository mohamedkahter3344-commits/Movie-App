import type { Movie } from "../../types/TrendingMovies.t";
import type { TV } from "../../types/TV.t";
import CardItem from "../CardItem/CardItem";

interface MediaGridProps {
  items: (Movie | TV)[];
  mediaType: "movie" | "tv";
  isFetching: boolean;
}

const MediaGrid = ({ items, mediaType, isFetching }: MediaGridProps) => {
  const mediaName = mediaType === "movie" ? "movies" : "TV";

  return (
    <section className="relative">
      {isFetching && (
        <div className="absolute inset-0 z-10 flex items-start justify-center bg-(--bg-primary)/40 pt-20 backdrop-blur-[2px]">
          <div className="rounded-full border border-(--border-color) bg-(--bg-card) px-5 py-3 text-sm font-medium text-(--text-primary) shadow-lg">
            Loading {mediaName}...
          </div>
        </div>
      )}

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {mediaType === "movie"
            ? (items as Movie[]).map((item) => (
                <CardItem key={item.id} type="movie" movie={item} />
              ))
            : (items as TV[]).map((item) => (
                <CardItem key={item.id} type="tv" movie={item} />
              ))}
        </div>
      ) : (
        <p className="py-20 text-center text-(--text-secondary)">
          No {mediaName} found.
        </p>
      )}
    </section>
  );
};

export default MediaGrid;
