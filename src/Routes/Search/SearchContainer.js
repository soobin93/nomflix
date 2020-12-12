import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component{
  state = {
    movieResults: null,
    tvResults: null,
    searchInput: "",
    loading: false,
    error: null
  };

  render () {
    const { movieResults, tvResults, searchInput, loading, error } = this.state;

    return <SearchPresenter
      movieResutls={movieResults}
      tvResutls={tvResults}
      searchInput={searchInput}
      loading={loading}
      error={error}
    />;
  }
}