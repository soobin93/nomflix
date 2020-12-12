import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component{
  state = {
    result: null,
    loading: true,
    error: null
  };

  render () {
    const { result, loading, error } = this.state;

    return <DetailPresenter
      result={result}
      loading={loading}
      error={error}
    />;
  }
}