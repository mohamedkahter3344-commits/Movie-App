
import { Heart } from "lucide-react";


const FavoriteButtonUi = () => {
  return (
    <button
      type="button"
      aria-label="Add to favorites"
      onClick={(e) => e.preventDefault()}
      className="absolute left-3 top-14 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-red-500/50 hover:bg-red-600 hover:text-white active:scale-95"
    >
      <Heart
        size={19}
        strokeWidth={2}
        className="transition-all duration-300"
      />
    </button>
  );
};

export default FavoriteButtonUi;
