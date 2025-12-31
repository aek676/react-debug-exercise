import Card from "@/components/Exercise3/card";
import SearchBox from "@/components/Exercise3/search";
import { useEffect, useState } from "react";

export interface Movie {
    id: string;
    original_title?: string;
    tagline?: string;
    overview?: string;
    homepage?: string;
    poster?: string;
    production?: any[];
    production_countries?: any[];
    genre?: any[];
    release?: string;
    vote?: number;
    runtime?: number;
    revenue?: number;
    backdrop?: string;
    movieID?: string;
}

async function fetchApiData(url: string): Promise<Movie> {
    const res = await fetch(url);
    const data = await res.json();
    return {
        id: data.id, // Usamos id estándar
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path
    };
}

export default function Exercise3() {
    const [movie, setMovie] = useState<Movie | null>({ id: "157336" });

    const handleFetchMovieID = async (movieID: string) => {
        const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
        try {
            const movieData = await fetchApiData(url);
            setMovie(movieData);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };

    useEffect(() => {
        handleFetchMovieID("157336");
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 text-slate-100 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                            <div className="w-full md:w-1/2">
                                <SearchBox fetchMovieID={handleFetchMovieID} />
                            </div>
                            <div className="hidden md:block md:w-1/2 text-right text-sm text-slate-300">
                                <span>Busca películas y haz click en una sugerencia para ver los detalles.</span>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="bg-linear-to-br from-slate-900/40 to-black/40 rounded-lg p-4 md:p-6">
                                <Card data={movie} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
