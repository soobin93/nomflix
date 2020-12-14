import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";

const Container = styled.div`
  padding: 80px 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map((show) => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}

      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {topRated.map((show) => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}

      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {topRated.map((show) => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}

      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
