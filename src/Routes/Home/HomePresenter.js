import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "Components/Loader";
import Section from "Components/Section";

const Container = styled.div`
    padding: 80px 20px;
`;

const HomePresenter = ({ nowPlaying, upcoming, popular, loading, error }) => loading ? <Loader /> : (
    <Container>
        {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
                { nowPlaying.map(movie => <span key={movie.id}>{movie.title}</span>) }
            </Section>
        )}

        {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming Movies">
                { nowPlaying.map(movie => <span key={movie.id}>{movie.title}</span>) }
            </Section>
        )}

        {popular && popular.length > 0 && (
            <Section title="Popular Movies">
                { nowPlaying.map(movie => <span key={movie.id}>{movie.title}</span>) }
            </Section>
        )}
    </Container>
);

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default HomePresenter;