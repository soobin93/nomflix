import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { movieApi, tvApi } from "api";
import Helmet from "react-helmet";
import styled from "styled-components";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Videos from "Components/Videos";
import Production from "Components/Production";
import Seasons from "Components/Seasons";

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

const Details = styled.div`
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

const TabContainer = styled.div`
  margin-top: 20px;
`;

const TabLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Tab = styled.button`
  font-size: 18px;
  padding: 5px 15px;
  border: 1px #fff solid;
  border-radius: 3px;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const ImdbButton = styled.button`
  background-color: #f5c518;
  font-weight: bold;
  border-radius: 3px;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

export default (props) => {
  const IMDB_BASE_URL = "https://www.imdb.com/title/";

  const [result, setResult] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMovie, setIsMovie] = useState(false);
  const [isTv, setIsTv] = useState(false);

  const loadDetails = async (id) => {
    let response;

    try {
      if (isMovie) {
        response = await movieApi.details(id);
        const {
          data: { results: loadedVideos },
        } = await movieApi.videos(id);

        const youtubeVideos = loadedVideos.filter(
          (video) => video.site === "YouTube"
        );

        setVideos(youtubeVideos);
      } else if (isTv) {
        response = await tvApi.details(id);
      } else {
        setError("Given type is invalid.");
      }
    } catch (error) {
      setError("Something went wrong.");
      console.log(error);
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
        <Details>
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
            {result.imdb_id && (
              <>
                <Divider>⚬</Divider>
                <Info>
                  <a target="_blank" href={`${IMDB_BASE_URL}${result.imdb_id}`}>
                    <ImdbButton>IMDb</ImdbButton>
                  </a>
                </Info>
              </>
            )}
          </InfoContainer>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            {videos.length > 0 && (
              <TabLink to={`/${isMovie ? "movie" : "tv"}/${result.id}/videos`}>
                <Tab>Videos</Tab>
              </TabLink>
            )}

            <TabLink
              to={`/${isMovie ? "movie" : "tv"}/${result.id}/production`}
            >
              <Tab>Production</Tab>
            </TabLink>

            {isTv && result.seasons.length > 0 && (
              <TabLink to={`/tv/${result.id}/seasons`}>
                <Tab>Seasons</Tab>
              </TabLink>
            )}
          </TabContainer>

          {videos.length > 0 && (
            <Route path={`/${isMovie ? "movie" : "tv"}/:id/videos`}>
              <Videos videos={videos} />
            </Route>
          )}

          <Route path={`/${isMovie ? "movie" : "tv"}/:id/production`}>
            <Production
              companies={result.production_companies}
              countries={result.production_countries}
            />
          </Route>

          {isTv && result.seasons.length > 0 && (
            <Route path={`/tv/:id/seasons`}>
              <Seasons seasons={result.seasons} />
            </Route>
          )}
        </Details>
      </Content>
    </Container>
  );
};
