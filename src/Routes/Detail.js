import React, { useState, useEffect } from "react";
import { movieApi, tvApi } from "api";
import Helmet from "react-helmet";
import styled from "styled-components";

import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  margin: 20px 0;
`;

const Info = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

export default (props) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMovie, setIsMovie] = useState(false);
  const [isTv, setIsTv] = useState(false);

  const loadDetails = async (id) => {
    let response;

    try {
      if (isMovie) {
        response = await movieApi.details(id);
      } else if (isTv) {
        response = await tvApi.details(id);
      } else {
        setError("Given type is invalid.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      const result = response ? response.data : null;
      setResult(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    const {
      location: { pathname },
    } = props;

    if (pathname.includes("/movie/")) {
      setIsMovie(true);
    } else if (pathname.includes("/tv/")) {
      setIsTv(true);
    }
  }, []);

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    const parsedId = parseInt(id);

    if (isMovie || isTv) {
      loadDetails(parsedId);
    }
  }, [isMovie, isTv]);

  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message color="#e74c3c" text={error} />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>

      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
              : "/no-poster-available.jpg"
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <InfoContainer>
            <Info>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Info>
            <Divider>⚬</Divider>
            <Info>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Info>
            <Divider>⚬</Divider>
            <Info>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Info>
          </InfoContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );
};
