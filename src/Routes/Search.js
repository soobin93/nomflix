import React, { useState } from "react";
import { movieApi, tvApi } from "api";
import Helmet from "react-helmet";
import styled from "styled-components";

import Loader from "Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";

const Container = styled.div`
  padding: 40px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

export default () => {
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (input) => {
    try {
      setLoading(true);

      const {
        data: { results: moveResponse },
      } = await movieApi.search(input);
      const {
        data: { results: tvResponse },
      } = await tvApi.search(input);

      setMovieResults(moveResponse);
      setTvResults(tvResponse);
    } catch {
      setError("Can't find results.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchInput !== "") {
      search(searchInput);
    }
  };

  const updateSearchInput = (event) => {
    const {
      target: { value },
    } = event;

    setSearchInput(value);
  };

  return (
    <Container>
      <Helmet>
        <title>Search | Nomflix</title>
      </Helmet>

      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={searchInput}
          onChange={updateSearchInput}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Results">
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message color="#95a5a6" text="Nothing found" />
            )}
        </>
      )}
    </Container>
  );
};
