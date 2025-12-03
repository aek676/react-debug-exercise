import React, { Component } from "react";
import TMDBLogo from "@/images/tmdb.svg";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }


  handleChange(event) {
    event.target.select();
  }
  render() {
    return (
      <div className="w-full search-container">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/3">
            <a
              href="./"
              title="ReactJS TMDb Movie Search"
              onClick={() => (window.ga && window.ga('send', 'event', 'link', 'internal', 'TMDB logo'))}
            >
              <img src={TMDBLogo} className="h-10 md:h-12" alt="The Movie Database" />
            </a>
          </div>
          <div className="w-full md:w-2/3">
            <form className="searchbox w-full">
              <input
                ref={this.searchInputRef}
                onClick={this.handleChange}
                className="searchbox__input typeahead form-control w-full rounded-md bg-slate-700/40 border border-slate-600 text-slate-100 px-4 py-2 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
                type="text"
                placeholder="Search Movie Title..."
                id="q"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;