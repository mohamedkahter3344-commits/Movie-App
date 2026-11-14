import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Clapperboard,
} from "lucide-react";

import { getVideoMedia } from "../../apis/WatchVideos/WatchVideos";

interface VideoMediaProps {
  videoId: string | undefined;
  categoryType: "movie" | "tv";
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

const VideoMedia = ({ videoId, categoryType }: VideoMediaProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["video", videoId, categoryType],
    queryFn: () => getVideoMedia(videoId, categoryType),
    enabled: !!videoId,
  });

  // All videos from TMDB
  const videos: Video[] = data?.data?.results ?? [];

  // Get YouTube trailers only and put official ones first
  const trailers = videos
    .filter((video) => video.type === "Trailer" && video.site === "YouTube")
    .sort((a, b) => Number(b.official) - Number(a.official));

  // Reset selected trailer when movie or TV changes
  useEffect(() => {
    setActiveIndex(0);
  }, [videoId, categoryType]);

  // Current selected trailer
  const activeVideo = trailers[activeIndex];

  // Next trailer
  const nextVideo = () => {
    setActiveIndex((prev) => (prev === trailers.length - 1 ? 0 : prev + 1));
  };

  // Previous trailer
  const previousVideo = () => {
    setActiveIndex((prev) => (prev === 0 ? trailers.length - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <section className="space-y-6 py-10 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-7 w-48 rounded-lg bg-(--border-color)" />
            <div className="h-4 w-64 max-w-full rounded bg-(--border-color)" />
          </div>

          <div className="h-8 w-24 rounded-full bg-(--border-color)" />
        </div>

        {/* Main Player Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary)">
          <div className="aspect-video w-full bg-(--border-color)" />
        </div>

        {/* Video Info Skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-5 w-56 max-w-full rounded bg-(--border-color)" />
            <div className="h-6 w-28 rounded bg-(--border-color)" />
          </div>

          <div className="flex gap-3">
            <div className="size-11 rounded-full bg-(--border-color)" />
            <div className="size-11 rounded-full bg-(--border-color)" />
          </div>
        </div>

        {/* Playlist Skeleton */}
        <div>
          <div className="mb-4 h-6 w-36 rounded bg-(--border-color)" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-secondary)"
              >
                <div className="aspect-video bg-(--border-color)" />

                <div className="space-y-3 p-3">
                  <div className="h-4 w-3/4 rounded bg-(--border-color)" />

                  <div className="flex justify-between">
                    <div className="h-3 w-16 rounded bg-(--border-color)" />
                    <div className="h-3 w-20 rounded bg-(--border-color)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (!trailers.length) {
    return (
      <div className="py-20 text-center text-(--text-secondary)">
        <Film size={40} className="mx-auto mb-3 opacity-50" />
        <p>No trailers available for this title.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6 py-10">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-(--text-primary)">
            Trailers & Promos
          </h2>

          <p className="mt-1 text-sm text-(--text-secondary)">
            Watch official trailers and previews
          </p>
        </div>

        <span className="rounded-full bg-(--bg-secondary) px-4 py-2 text-sm text-(--text-secondary)">
          {trailers.length} Trailers
        </span>
      </div>

      {/* Main Video Player */}
      <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-black">
        <div className="relative aspect-video w-full">
          {activeVideo?.site === "YouTube" ? (
            <ReactPlayer
              key={activeVideo.key}
              src={`https://www.youtube.com/watch?v=${activeVideo.key}`}
              width="100%"
              height="100%"
              controls
              playing={false}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white">
              <Film size={48} />
              <p>Video source is not supported</p>
            </div>
          )}
        </div>
      </div>

      {/* Current Trailer Info */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-(--text-primary)">
            {activeVideo?.name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-md bg-(--bg-secondary) px-3 py-1 text-xs text-(--text-secondary)">
              {activeVideo?.type}
            </span>

            {activeVideo?.official && (
              <span className="rounded-md bg-green-500/10 px-3 py-1 text-xs text-green-500">
                Official Trailer
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={previousVideo}
            disabled={trailers.length <= 1}
            className="rounded-full border border-(--border-color) p-3 text-(--text-primary) transition hover:bg-(--bg-secondary) disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous trailer"
          >
            <ChevronLeft />
          </button>

          <span className="text-sm text-(--text-secondary)">
            {activeIndex + 1} / {trailers.length}
          </span>

          <button
            onClick={nextVideo}
            disabled={trailers.length <= 1}
            className="rounded-full border border-(--border-color) p-3 text-(--text-primary) transition hover:bg-(--bg-secondary) disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next trailer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Trailers Playlist */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-(--text-primary)">
          More Trailers
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trailers.slice(0, 3).map((video, index) => (
            <button
              key={video.id}
              onClick={() => setActiveIndex(index)}
              className={`group overflow-hidden rounded-xl border text-left transition ${
                activeIndex === index
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-(--border-color) bg-(--bg-secondary) hover:border-blue-500/50"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black">
                <img
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt={video.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/50">
                  <div className="rounded-full bg-white/90 p-3 text-black">
                    {activeIndex === index ? (
                      <Clapperboard size={22} />
                    ) : (
                      <Play size={22} fill="currentColor" />
                    )}
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="space-y-2 p-3">
                <h4 className="line-clamp-1 font-semibold text-(--text-primary)">
                  {video.name}
                </h4>

                <div className="flex items-center justify-between gap-2 text-xs text-(--text-secondary)">
                  <span>{video.type}</span>

                  <span>{video.official ? "Official" : video.site}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoMedia;
