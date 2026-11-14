
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  CalendarDays,
  Clock,
  Globe,
  Film,
  Tv,
  ArrowLeft,
  Play,
  Clapperboard,
  Users,
  Bookmark,
  AlertCircle,
} from "lucide-react";

import { getCardDetails } from "../../apis/CardDetailsApi/CardDetailsApi";
import InfoCard from "../../components/InfoCard/InfoCard";
import VideoMedia from "../../components/VideoMedia/VideoMedia";

const IMAGE_URL = "https://image.tmdb.org/t/p";

const CardDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.pathname.startsWith("/tv") ? "tv" : "movie";

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cardDetails", type, id],
    queryFn: () => getCardDetails(id!, type),
    enabled: !!id,
  });

  const details = data?.data;

  // Loading State
  if (isLoading) {
    return (
      <main className="min-h-screen bg-(--bg-primary) px-4 py-12">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-100 rounded-3xl bg-(--bg-card)" />
          <div className="mt-8 grid gap-5 md:grid-cols-[280px_1fr]">
            <div className="h-100 rounded-2xl bg-(--bg-card)" />
            <div className="space-y-5">
              <div className="h-10 w-2/3 rounded-lg bg-(--bg-card)" />
              <div className="h-5 w-1/3 rounded-lg bg-(--bg-card)" />
              <div className="h-28 rounded-lg bg-(--bg-card)" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (isError || !details) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-(--bg-primary) px-4 text-center">
        <AlertCircle size={55} className="text-red-600" />

        <h2 className="text-2xl font-bold text-(--text-primary)">
          Unable to load details
        </h2>

        <p className="max-w-md text-(--text-secondary)">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later."}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </main>
    );
  }

  // Shared Data
  const isTV = type === "tv";

  const title = isTV ? details.name : details.title;

  const originalTitle = isTV
    ? details.original_name
    : details.original_title;

  const releaseDate = isTV
    ? details.first_air_date
    : details.release_date;

  const year = releaseDate
    ? new Date(releaseDate).getFullYear()
    : "Unknown";

  const rating = details.vote_average
    ? details.vote_average.toFixed(1)
    : "N/A";

  const genres = details.genres ?? [];

  const runtime = isTV
    ? details.episode_run_time?.[0]
      ? `${details.episode_run_time[0]} min / episode`
      : "N/A"
    : details.runtime
      ? `${details.runtime} min`
      : "N/A";

  const backdrop = details.backdrop_path
    ? `${IMAGE_URL}/original${details.backdrop_path}`
    : details.poster_path
      ? `${IMAGE_URL}/w500${details.poster_path}`
      : null;

  const poster = details.poster_path
    ? `${IMAGE_URL}/w500${details.poster_path}`
    : null;

  return (
    <main className="min-h-screen overflow-hidden bg-(--bg-primary) pb-16 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative min-h-145 overflow-hidden">

        {backdrop && (
          <img
            src={backdrop}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-primary) via-transparent to-black/30" />

        <div className="relative mx-auto flex min-h-145 max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-red-600 hover:border-red-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="grid items-center gap-10 md:grid-cols-[250px_1fr] lg:grid-cols-[320px_1fr]">

            {/* Poster */}
            <div className="mx-auto w-full max-w-62.5 md:mx-0 lg:max-w-[320px]">
              <div className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/50">
                {poster ? (
                  <img
                    src={poster}
                    alt={title}
                    className="aspect-2/3 w-full object-cover transition duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-2/3 items-center justify-center bg-gray-800 text-white">
                    <Clapperboard size={60} />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl text-white">

              {/* Type Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/20 px-4 py-2 text-sm font-bold text-red-400">
                {isTV ? <Tv size={17} /> : <Film size={17} />}
                {isTV ? "TV Series" : "Movie"}
              </div>

              {/* Title */}
              <h1 className="mb-3 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              {originalTitle && originalTitle !== title && (
                <p className="mb-5 text-lg text-gray-300">
                  {originalTitle}
                </p>
              )}

              {/* Metadata */}
              <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-300">

                <span className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-red-500" />
                  {year}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={17} className="text-red-500" />
                  {runtime}
                </span>

                <span className="flex items-center gap-2">
                  <Globe size={17} className="text-red-500" />
                  {details.original_language?.toUpperCase() || "N/A"}
                </span>
              </div>

              {/* Rating */}
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
                  <Star
                    size={24}
                    fill="currentColor"
                    className="text-yellow-400"
                  />

                  <span className="text-2xl font-extrabold text-yellow-400">
                    {rating}
                  </span>

                  <span className="text-sm text-gray-300">/ 10</span>
                </div>

                <div>
                  <p className="font-semibold text-white">TMDB Rating</p>
                  <p className="text-xs text-gray-400">
                    {details.vote_count?.toLocaleString() || 0} votes
                  </p>
                </div>
              </div>

              {/* Genres */}
              <div className="mb-7 flex flex-wrap gap-2">
                {genres.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-gray-200 backdrop-blur-md"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="mb-3 text-xl font-bold">Overview</h2>

                <p className="max-w-2xl text-sm leading-8 text-gray-300 sm:text-base">
                  {details.overview || "No overview available for this title."}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    document.getElementById("more-info")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-1 hover:bg-red-700"
                >
                  <Play size={18} fill="currentColor" />
                  Explore Details
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <ArrowLeft size={18} />
                  Back to Browse
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* More Information */}
      <section
        id="more-info"
        className="mx-auto max-w-7xl scroll-mt-10 px-4 pt-10 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[3px] text-red-600">
            Discover More
          </span>

          <h2 className="mt-2 text-3xl font-black text-(--text-primary)">
            More Information
          </h2>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Everything you need to know about {title}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            icon={<CalendarDays size={21} />}
            title="Release Date"
            value={releaseDate || "Not available"}
          />

          <InfoCard
            icon={<Clock size={21} />}
            title={isTV ? "Episode Runtime" : "Runtime"}
            value={runtime}
          />

          <InfoCard
            icon={<Users size={21} />}
            title="Popularity"
            value={details.popularity?.toFixed(1) || "N/A"}
          />

          <InfoCard
            icon={<Bookmark size={21} />}
            title="Status"
            value={details.status || "N/A"}
          />

          {isTV ? (
            <>
              <InfoCard
                icon={<Tv size={21} />}
                title="Seasons"
                value={String(details.number_of_seasons ?? "N/A")}
              />

              <InfoCard
                icon={<Film size={21} />}
                title="Episodes"
                value={String(details.number_of_episodes ?? "N/A")}
              />
            </>
          ) : (
            <>
              <InfoCard
                icon={<Film size={21} />}
                title="Budget"
                value={
                  details.budget
                    ? `$${details.budget.toLocaleString()}`
                    : "N/A"
                }
              />

              <InfoCard
                icon={<Clapperboard size={21} />}
                title="Revenue"
                value={
                  details.revenue
                    ? `$${details.revenue.toLocaleString()}`
                    : "N/A"
                }
              />
            </>
          )}
        </div>

        {/* Production Companies */}
        {details.production_companies?.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-extrabold text-(--text-primary)">
              Production Companies
            </h2>

            <div className="flex flex-wrap gap-3">
              {details.production_companies.map(
                (company: { id: number; name: string }) => (
                  <div
                    key={company.id}
                    className="rounded-xl border border-(--border-color) bg-(--bg-secondary) px-5 py-3 text-sm font-semibold text-(--text-primary)"
                  >
                    {company.name}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <VideoMedia videoId={id} categoryType={type}/>
      </section>
    </main>
  );
};



export default CardDetails;
