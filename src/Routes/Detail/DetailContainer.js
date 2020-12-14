import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "api";

export default class extends React.Component{
  constructor(props) {
    super(props);

    const { location: { pathname } } = props;

    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"),
      isTv: pathname.includes("/tv/")
    };
  }



  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    }  = this.props;

    const { isMovie, isTv } = this.state;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    let response;

    try {
      if (isMovie) {
        response = await movieApi.details(parsedId);
      } else if (isTv) {
        response = await tvApi.details(parsedId);
      } else {
        this.setState({ error: "Given type is invalid."});
      }
    } catch {
      this.setState({ error: "Something went wrong."});
    } finally {
      const result = response ? response.data : null;
      this.setState({ loading: false, result });
    }
  }

  render () {
    const { result, loading, error } = this.state;

    return <DetailPresenter
      result={result}
      loading={loading}
      error={error}
    />;
  }
}