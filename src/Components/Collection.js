import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0;
  width: 600px;
`;

const Collection = styled.div`
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
  font-size: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
`;

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const Seasons = ({ collection }) => (
  <Container>
    <Collection>
      <Cover src={`${POSTER_BASE_URL}${collection.poster_path}`} />
      <Details>
        <Title>{collection.name}</Title>
      </Details>
    </Collection>
  </Container>
);

Seasons.propTypes = {
  collection: PropTypes.shape({
    poster_path: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
};

export default Seasons;
