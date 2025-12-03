import React, { Component } from 'react';
// Add imports for jQuery, Bloodhound and twitter-typeahead so the
// global variables used by legacy code are available in this module.
import Bloodhound from 'bloodhound-js';
import SearchBox from '@/components/Exercise3/search';
import Card from '@/components/Exercise3/card';

class Exercise3 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieID: 157336 // set initital load movie - Interstellar
    }
  }
  render() {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 text-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Search header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="w-full md:w-1/2">
                  <SearchBox fetchMovieID={this.fetchMovieID.bind(this)} />
                </div>
                <div className="hidden md:block md:w-1/2 text-right text-sm text-slate-300">
                  <span>Busca películas y haz click en una sugerencia para ver los detalles.</span>
                </div>
              </div>

              <div className="mt-2">
                <div className="bg-linear-to-br from-slate-900/40 to-black/40 rounded-lg p-4 md:p-6">
                  <Card data={this.state} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } // END render

  // the api request function
  fetchApi(url) {

    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
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

      })
    })

    // .catch((err) => console.log('Movie not found!'))

  } // end function

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)
  } // end function

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)

    //========================= BLOODHOUND ==============================//
    let suggests = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
        filter: function(movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, function(movie) {
            return {
              value: movie.original_title, // search original title
              id: movie.id // get ID of movie simultaniously
            };
          });
        } // end filter
      } // end remote
    }); // end new Bloodhound

    suggests.initialize(); // initialise bloodhound suggestion engine

    //========================= END BLOODHOUND ==============================//

    //========================= TYPEAHEAD ==============================//
    // Instantiate the Typeahead UI
    $('.typeahead').typeahead({
      hint: false,
      highlight: true,
      minLength: 2
    }, {
      source: suggests.ttAdapter()
    }).on('typeahead:selected', (obj, datum) => {
      this.fetchMovieID(datum.id)
    }); // END Instantiate the Typeahead UI
    //========================= END TYPEAHEAD ==============================//

  } // end component did mount function

  // } // END CLASS - APP
}

export default Exercise3;