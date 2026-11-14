
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";

import {
  Star,
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clapperboard,
  AlertCircle,
} from "lucide-react";

import { getAllTrendingMovies } from "../../apis/Movies/Trending";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Movie } from "../../types/TrendingMovies.t";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MainSlider = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["moviesTrending"],
    queryFn: getAllTrendingMovies,
  });

const movies: Movie[] = data?.data?.results ?? [];

  // Loading State
  if (isLoading) {
    return (
      <section className="w-full h-87.5 sm:h-100 md:h-115 bg-gray-100 dark:bg-gray-950 animate-pulse transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center gap-5">
          <div className="w-32 h-7 rounded-full bg-gray-300 dark:bg-gray-800" />

          <div className="w-3/4 md:w-1/2 h-10 rounded-lg bg-gray-300 dark:bg-gray-800" />

          <div className="w-full md:w-1/2 h-16 rounded-lg bg-gray-200 dark:bg-gray-800" />

          <div className="flex gap-4">
            <div className="w-32 h-10 rounded-lg bg-gray-300 dark:bg-gray-800" />
            <div className="w-32 h-10 rounded-lg bg-gray-300 dark:bg-gray-800" />
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (isError) {
    return (
      <section className="min-h-87.5 flex flex-col items-center justify-center gap-4 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <AlertCircle size={45} className="text-red-500" />

        <h2 className="text-xl md:text-2xl font-bold">
          Something went wrong!
        </h2>

        <p className="max-w-md px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {error instanceof Error
            ? error.message
            : "Failed to load trending movies."}
        </p>
      </section>
    );
  }

  // Empty State
  if (!movies.length) {
    return (
      <section className="min-h-87.5 flex flex-col items-center justify-center gap-4 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <Clapperboard size={45} className="text-red-500" />

        <h2 className="text-xl font-bold">
          No Trending Movies Found
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Check back later for new movies.
        </p>
      </section>
    );
  }

  return (
    <section className="relative group w-full overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Swiper
        modules={[
          Autoplay,
          EffectFade,
          Navigation,
          Pagination,
        ]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        slidesPerView={1}
        loop={movies.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".slider-prev",
          nextEl: ".slider-next",
        }}
        pagination={{
          clickable: true,
          el: ".slider-pagination",
        }}
        speed={900}
        className="main-movie-slider"
      >
        {movies.slice(0, 10).map((movie, index) => {
          const releaseYear = movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "Coming Soon";

          const backdrop = movie.backdrop_path
            ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
            : movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : null;

          return (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-95 sm:h-105 md:h-120 lg:h-130">
                {/* Background Image */}
                {backdrop && (
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url("${backdrop}")`,
                    }}
                  />
                )}

                {/* Dark Cinematic Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/10" />

                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/30" />

                {/* Movie Content */}
                <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 lg:px-16 flex items-center">
                  <div className="max-w-2xl">
                    {/* Trending Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                        <Clapperboard size={15} />
                        Trending Now
                      </span>

                      <span className="text-gray-200 text-xs sm:text-sm">
                        #{index + 1} Most Popular
                      </span>
                    </div>

                    {/* Movie Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg line-clamp-2">
                      {movie.title}
                    </h1>

                    {/* Movie Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                      {/* Rating */}
                      <span className="flex items-center gap-2 text-yellow-400 font-semibold">
                        <Star
                          size={17}
                          fill="currentColor"
                        />

                        {movie.vote_average?.toFixed(1) ?? "N/A"}

                        <span className="text-gray-300 font-normal">
                          / 10
                        </span>
                      </span>

                      {/* Release Year */}
                      <span className="flex items-center gap-2 text-gray-200">
                        <CalendarDays size={16} />
                        {releaseYear}
                      </span>

                      {/* Quality */}
                      <span className="px-3 py-1 border border-white/40 rounded-md text-gray-200 text-xs backdrop-blur-sm">
                        HD
                      </span>
                    </div>

                    {/* Overview */}
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 max-w-xl drop-shadow-md">
                      {movie.overview ||
                        "Discover this amazing movie and explore its story."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/movie/${movie.id}`)
                        }
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/20"
                      >
                        <Play
                          size={17}
                          fill="currentColor"
                        />
                        Explore Movie
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/movie/${movie.id}`)
                        }
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300"
                      >
                        <Info size={17} />
                        More Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-gray-950 to-transparent pointer-events-none" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Previous Button */}
      <button
        className="slider-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-red-600 border border-white/20 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous movie"
      >
        <ChevronLeft size={23} />
      </button>

      {/* Next Button */}
      <button
        className="slider-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-red-600 border border-white/20 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next movie"
      >
        <ChevronRight size={23} />
      </button>

      {/* Pagination */}
      <div className="slider-pagination absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2" />
    </section>
  );
};

export default MainSlider;
