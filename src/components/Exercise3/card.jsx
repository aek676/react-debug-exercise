import React, { Component } from 'react';
import ReactDOM from 'react-dom';
let numeral = require('numeral');
let backdropIMG;

class Card extends Component {

  render() {
    let data = this.props.data
      // if movie ID found, then...



      let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
          production = data.production,
          productionCountries = data.production_countries,
          genres = data.genre,
          totalRevenue = data.revenue,
          productionList = nestedDataToString(production),
          productionCountriesList = nestedDataToString(productionCountries),
          noData = '-',
          genresList = nestedDataToString(genres);
          backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;



      // conditional statements for no data
       if (data.vote === 'undefined' || data.vote === 0) {
          data.vote = noData
        } else {
          data.vote = data.vote + ' / 10'
        };

      if (totalRevenue === 'undefined' || totalRevenue === 0) {
           totalRevenue = noData
         } else {
           totalRevenue = numeral(data.revenue).format('($0,0)');
         };

      if(data.poster== null){
        posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
      }



      return (
        <div className="w-full cardcont nopadding">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Poster */}
            <div className="poster-container md:col-span-4 order-1 md:order-1">
              <img id="postertest" className="poster rounded-lg shadow-xl w-full object-cover transition-transform hover:scale-105" src={posterIMG} alt={`${data.original_title} Poster`} />
            </div>

            {/* Meta data */}
            <div className="meta-data-container md:col-span-8 order-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-100">{data.original_title}</h1>

              <span className="tagline text-slate-400 italic block mt-1">{data.tagline}</span>
              <p className="mt-4 text-slate-300 leading-relaxed">{data.overview}</p>
              <div className="additional-details mt-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="genre-list text-xs bg-slate-700/40 text-slate-100 px-3 py-1 rounded-full">{genresList}</span>
                  <span className="production-list text-xs bg-slate-700/30 text-slate-200 px-3 py-1 rounded-full">{productionList}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300 release-details">
                  <div>Original Release: <span className="meta-data text-slate-100">{data.release}</span></div>
                  <div>Running Time: <span className="meta-data text-slate-100">{data.runtime} mins</span></div>
                  <div>Box Office: <span className="meta-data text-slate-100">{totalRevenue}</span></div>
                  <div>Vote Average: <span className="meta-data text-slate-100">{data.vote}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  componentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString;
  if(nestedData !== undefined){
    nestedData.forEach(function(item){
      nestedArray.push(item.name);
    });
  }
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};
  
export default Card;