import { useQuery } from "@tanstack/react-query";
import { getAllTrendingMedia } from "../../apis/TrendingMedia/TrendingMedia";

import CardItem from "../CardItem/CardItem";

import type { Movie } from "../../types/TrendingMovies.t";
import type { TV } from "../../types/TV.t";

interface AlsoLikeMediaProps {
  categoryType: "tv" | "movie";
  currentId: string | undefined;
}

const AlsoLikeMedia = ({ categoryType, currentId }: AlsoLikeMediaProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trendmedia", categoryType],
    queryFn: () => getAllTrendingMedia(categoryType),
    enabled: !!categoryType,
  });

  // Get trending results
  const media: (Movie | TV)[] = data?.data?.results ?? [];

  // Exclude current movie or TV show, then get only 3 cards
  const recommendedMedia = media
    .filter((item) => String(item.id) !== currentId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-10">
        <h2 className="mb-6 h-8 w-56 animate-pulse rounded bg-(--border-color)" />

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="aspect-2/3 animate-pulse rounded-2xl bg-(--border-color)"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-red-500">
        Failed to load recommendations.
      </p>
    );
  }

  if (!recommendedMedia.length) return null;

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="mb-7">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-500">
          Discover More
        </p>

        <h2 className="text-2xl font-bold text-(--text-primary) sm:text-3xl">
          You May Also Like
        </h2>

        <p className="mt-2 text-sm text-(--text-secondary)">
          More {categoryType === "movie" ? "movies" : "TV shows"} you might
          enjoy.
        </p>
      </div>

      {/* Recommended Cards */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {recommendedMedia.map((item) =>
          categoryType === "movie" ? (
            <CardItem key={item.id} type="movie" movie={item as Movie} />
          ) : (
            <CardItem key={item.id} type="tv" movie={item as TV} />
          ),
        )}
      </div>
    </section>
  );
};

export default AlsoLikeMedia;
