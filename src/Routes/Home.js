import React, { useState, useEffect } from "react";
import { movieApi } from "api";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px 20px;
`;

export default () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [popular, setPopular] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestNowPlaying = async () => {
    const {
      data: { results: nowPlaying },
    } = await movieApi.nowPlaying();

    setNowPlaying(nowPlaying);
  };

  const requestUpcoming = async () => {
    const {
      data: { results: upcoming },
    } = await movieApi.upcoming();

    setUpcoming(upcoming);
  };

  const requestPopular = async () => {
    const {
      data: { results: popular },
    } = await movieApi.popular();

    setPopular(popular);
  };

  useEffect(() => {
    try {
      requestNowPlaying();
      requestUpcoming();
      requestPopular();
    } catch {
      setError("Can't find movie information.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>

      {loading ? (
        <Loader />
      ) : (
        <Container>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
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

          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming Movies">
              {upcoming.map((movie) => (
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

          {popular && popular.length > 0 && (
            <Section title="Popular Movies">
              {popular.map((movie) => (
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

          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
};
