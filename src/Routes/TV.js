import React, { useState, useEffect } from "react";
import { tvApi } from "api";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import styled from "styled-components";

const Container = styled.div`
  padding: 80px 20px;
`;

export default () => {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestTopRated = async () => {
    const {
      data: { results: topRated },
    } = await tvApi.topRated();

    setTopRated(topRated);
  };

  const requestPopular = async () => {
    const {
      data: { results: popular },
    } = await tvApi.popular();

    setPopular(popular);
  };

  const requestAiringToday = async () => {
    const {
      data: { results: airingToday },
    } = await tvApi.airingToday();

    setAiringToday(airingToday);
  };

  useEffect(() => {
    try {
      requestTopRated();
      requestPopular();
      requestAiringToday();
    } catch {
      setError("Can't find tv information.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>

      {loading ? (
        <Loader />
      ) : (
        <Container>
          {topRated && topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {topRated.map((show) => (
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

          {popular && popular.length > 0 && (
            <Section title="Popular Shows">
              {popular.map((show) => (
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

          {airingToday && airingToday.length > 0 && (
            <Section title="Airing Today">
              {airingToday.map((show) => (
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
        </Container>
      )}
    </>
  );
};
