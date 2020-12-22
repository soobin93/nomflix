import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0;
  width: 600px;
`;

const Season = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  color: rgba(20, 20, 20, 0.8);
`;

const Cover = styled.div`
  width: 40%;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  height: 500px;
`;

const Details = styled.div`
  width: 60%;
  padding: 20px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
`;

const Date = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Count = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  opacity: 0.8;
`;

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const Seasons = ({ seasons }) => (
  <Container>
    {seasons.map((season) => (
      <Season>
        <Cover src={`${POSTER_BASE_URL}${season.poster_path}`} />
        <Details>
          <Title>{season.name}</Title>
          <Date>Air Date: {season.air_date}</Date>
          <Count>Episode Count: {season.episode_count}</Count>
          {season.overview && <Overview>{season.overview}</Overview>}
        </Details>
      </Season>
    ))}
  </Container>
);

Seasons.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      name: PropTypes.string.isRequired,
      air_date: PropTypes.string,
      episode_count: PropTypes.number,
      overview: PropTypes.string,
    })
  ),
};

export default Seasons;
