import { useState } from "react";
import { Play } from "lucide-react";
import { filmPoster, filmSrc, type Film } from "@/data/films";

/**
 * Poster first, video on demand: the file only downloads once someone taps
 * play, so a page of films costs a few small JPEGs until then. The poster and
 * title are real HTML, so crawlers index them.
 */
export function FilmCard({ film }: { film: Film }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="group">
      <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-black bg-black transition-shadow duration-300 hover:shadow-[8px_8px_0_#0015D4]">
        {playing ? (
          <video
            src={filmSrc(film)}
            poster={filmPoster(film)}
            className="h-full w-full"
            autoPlay
            muted
            playsInline
            controls
            aria-label={film.title}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play film: ${film.title}`}
            data-cursor="hover"
          >
            <img src={filmPoster(film)} alt="" loading="lazy" className="h-full w-full object-cover" />
            {/* Corner, not centre: the posters carry their headline mid-frame. */}
            <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[3px_3px_0_#141414] transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[11px] font-semibold text-white">
              0:{String(film.seconds).padStart(2, "0")}
            </span>
          </button>
        )}
      </div>
      <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">{film.tag}</p>
      <h3 className="mt-1.5 font-display text-lg font-extrabold leading-snug tracking-tight text-black md:text-xl">{film.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-black/60">{film.desc}</p>
    </article>
  );
}

export function FilmGrid({ films }: { films: Film[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {films.map((f) => (
        <li key={f.slug}>
          <FilmCard film={f} />
        </li>
      ))}
    </ul>
  );
}
