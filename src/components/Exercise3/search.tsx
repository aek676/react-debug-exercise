import TMDBLogo from "@/images/tmdb.svg";
import { useState, useEffect, useRef } from "react";

interface SearchBoxProps {
    fetchMovieID: (movieID: string) => void;
}

interface Suggestion {
    id: number;
    title: string;
    release_date: string;
}

export default function SearchBox({ fetchMovieID }: SearchBoxProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const searchMovies = async (searchTerm: string) => {
        if (searchTerm.length < 2) {
            setSuggestions([]);
            return;
        }

        const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=cfe422613b250f702980a3bbf9e90716`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            const results = data.results.slice(0, 5).map((movie: any) => ({
                id: movie.id,
                title: movie.original_title,
                release_date: movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
            }));
            setSuggestions(results);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        searchMovies(value);
    };

    const handleSelectMovie = (movieID: string, title: string) => {
        setQuery(title);
        setShowSuggestions(false);
        fetchMovieID(movieID);
    };

    return (
        <div className="w-full search-container" ref={wrapperRef}>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/3">
                    <a href="#" title="ReactJS TMDb Movie Search">
                        <img src={TMDBLogo} className="h-10 md:h-12" alt="The Movie Database" />
                    </a>
                </div>
                <div className="w-full md:w-2/3 relative">
                    <form className="searchbox w-full" onSubmit={(e) => e.preventDefault()}>
                        <input
                            value={query}
                            onChange={handleChange}
                            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                            className="searchbox__input form-control w-full rounded-md bg-slate-700/40 border border-slate-600 text-slate-100 px-4 py-2 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                            type="text"
                            placeholder="Search Movie Title..."
                        />
                    </form>

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-slate-800 border border-slate-600 rounded-md mt-1 shadow-xl max-h-60 overflow-auto">
                            {suggestions.map((movie) => (
                                <li
                                    key={movie.id}
                                    onClick={() => handleSelectMovie(movie.id.toString(), movie.title)}
                                    className="px-4 py-2 hover:bg-indigo-600 cursor-pointer text-slate-200 border-b border-slate-700 last:border-0 transition-colors"
                                >
                                    <span className="font-bold">{movie.title}</span>
                                    <span className="text-xs text-slate-400 ml-2">({movie.release_date})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
