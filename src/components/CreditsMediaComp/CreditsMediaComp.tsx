import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import { getCreditsMedia } from "../../apis/CreditsMedia/CreditsMedia";
import type { CastMember } from "../../types/CreditsMedia.t";

interface CreditsMediaProps {
  postId: string | undefined;
  categoryType: "movie" | "tv";
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const CreditsMediaComp = ({
  postId,
  categoryType,
}: CreditsMediaProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Credits", postId, categoryType],
    queryFn: () => getCreditsMedia(postId!, categoryType),
    enabled: !!postId,
  });

  const cast = data?.data?.cast ?? [];

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="mb-6 h-7 w-48 animate-pulse rounded bg-(--border-color)" />

        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="min-w-0 flex-1">
              <div className="aspect-[3/4] animate-pulse rounded-xl bg-(--border-color)" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-(--border-color)" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-(--border-color)" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load cast members.
      </p>
    );
  }

  if (!cast.length) {
    return null;
  }

  return (
    <section className="py-10">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Users size={21} className="text-(--text-secondary)" />
            <span className="text-sm text-(--text-secondary)">
              Meet the cast
            </span>
          </div>

          <h2 className="text-2xl font-bold text-(--text-primary)">
            Top Cast
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            className="cast-prev flex size-10 items-center justify-center rounded-full border border-(--border-color) text-(--text-primary) transition hover:bg-(--border-color)"
            aria-label="Previous cast members"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className="cast-next flex size-10 items-center justify-center rounded-full border border-(--border-color) text-(--text-primary) transition hover:bg-(--border-color)"
            aria-label="Next cast members"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Cast Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".cast-prev",
          nextEl: ".cast-next",
        }}
        spaceBetween={18}
        slidesPerView={2}
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 22,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 24,
          },
        }}
        className="!pb-3"
      >
        {cast.slice(0, 20).map((person:CastMember) => (
          <SwiperSlide key={`${person.id}-${person.credit_id ?? person.order}`}>
            <div className="group overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-card) transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Profile Image */}
              <div className="aspect-[3/4] overflow-hidden bg-(--bg-secondary)">
                <img
                  src={
                    person.profile_path
                      ? `${IMAGE_BASE_URL}${person.profile_path}`
                      : "/placeholder-person.png"
                  }
                  alt={person.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Person Info */}
              <div className="p-3">
                <h3 className="truncate font-semibold text-(--text-primary)">
                  {person.name}
                </h3>

                <p className="mt-1 truncate text-sm text-(--text-secondary)">
                  {person.character || "Unknown Role"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CreditsMediaComp;