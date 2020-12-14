import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "api";

export default class extends React.Component{
  state = {
    movieResults: null,
    tvResults: null,
    searchInput: "",
    loading: false,
    error: null
  };

  handleSubmit = () => {
    const { searchInput } = this.state;

    if (searchInput !== "") {
      this.search(searchInput);
    }
  };

  search = async (input) => {
    try {
      this.setState({ loading: true });
      const { data: { results: movieResults } } = await movieApi.search(input);
      const { data: { results: tvResults } } = await tvApi.search(input);

      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({ error: "Can't find results."});
    } finally {
      this.setState({ loading: false });
    }
  };

  render () {
    const { movieResults, tvResults, searchInput, loading, error } = this.state;

    return <SearchPresenter
      movieResutls={movieResults}
      tvResutls={tvResults}
      searchInput={searchInput}
      loading={loading}
      error={error}
      handleSubmit={this.handleSubmit}
    />;
  }
}