import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0;
`;

const Video = styled.div`
  position: relative;
  width: 600px;
  height: 0;
  padding-bottom: 337.5px;
  margin-bottom: 40px;
`;

const Youtube = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YOUTUBE_BASE_URL = "https://www.youtube.com/embed/";

const Videos = ({ videos }) => (
  <Container>
    {videos.map((video) => (
      <Video key={video.key}>
        <Youtube src={`${YOUTUBE_BASE_URL}${video.key}`} />
      </Video>
    ))}
  </Container>
);

Videos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Videos;
