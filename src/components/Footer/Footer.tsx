
import { Link } from "react-router-dom";
import {
  Clapperboard,
  Film,
  Tv,
  Heart,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-(--border-color) bg-(--bg-secondary) transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="mb-5 inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/20">
                <Clapperboard size={25} />
              </div>

              <span className="text-2xl font-extrabold text-(--text-primary)">
                Movie<span className="text-red-600">Hub</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-(--text-secondary)">
              Discover your next favorite movie and TV show.
              Explore trending titles, ratings, and cinematic
              experiences all in one place.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 font-bold text-(--text-primary)">
              Explore
            </h3>

            <ul className="space-y-4 text-sm text-(--text-secondary)">
              <li><Link to="/" className="hover:text-red-600">Home</Link></li>
              <li><Link to="/movies" className="hover:text-red-600">Movies</Link></li>
              <li><Link to="/tvShows" className="hover:text-red-600">TV Shows</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 font-bold text-(--text-primary)">
              Discover
            </h3>

            <ul className="space-y-4 text-sm text-(--text-secondary)">
              <li className="flex items-center gap-2">
                <Film size={16} />
                <Link to="/movies" className="hover:text-red-600">
                  Popular Movies
                </Link>
              </li>

              <li className="flex items-center gap-2">
                <Tv size={16} />
                <Link to="/tvShows" className="hover:text-red-600">
                  Popular TV Shows
                </Link>
              </li>

              <li><Link to="/movies" className="hover:text-red-600">Top Rated</Link></li>
              <li><Link to="/movies" className="hover:text-red-600">Upcoming Releases</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 font-bold text-(--text-primary)">
              About MovieHub
            </h3>

            <p className="text-sm leading-7 text-(--text-secondary)">
              Your ultimate destination for discovering movies
              and TV shows. Find ratings, explore details, and
              stay updated with the latest releases.
            </p>
          </div>
        </div>

        <div className="my-9 border-t border-(--border-color)" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
          <p className="text-sm text-(--text-secondary)">
            © {new Date().getFullYear()} MovieHub. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-(--text-secondary)">
            Made with
            <Heart size={15} className="fill-red-600 text-red-600" />
            for movie lovers.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-color) text-(--text-secondary) transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
