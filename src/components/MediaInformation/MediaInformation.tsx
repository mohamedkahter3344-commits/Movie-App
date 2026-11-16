import { Clapperboard, Film, TvIcon } from "lucide-react";

interface MediaInformationProps {
  title: string;
  description: string;
  totalResults: number;
  mediaType: "movie" | "tv";
}

const MediaInformation = ({
  title,
  description,
  totalResults,
  mediaType,
}: MediaInformationProps) => {
  const Icon = mediaType === "movie" ? Film : TvIcon;

  return (
    <section className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-5 sm:flex-row sm:items-center sm:p-6">
      <div>
        <div className="flex items-center gap-2">
          <Icon size={19} className="text-red-500" />

          <h2 className="text-lg font-bold text-(--text-primary)">{title}</h2>
        </div>

        <p className="mt-1 text-sm text-(--text-secondary)">{description}</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-(--border-color) bg-(--bg-primary) px-5 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
          <Clapperboard size={21} className="text-red-500" />
        </div>

        <div>
          <p className="text-xs font-medium text-(--text-secondary)">
            Total {mediaType === "movie" ? "Movies" : "TV"}
          </p>

          <p className="text-xl font-extrabold text-(--text-primary)">
            {totalResults.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MediaInformation;
