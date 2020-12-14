import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  searchInput,
  handleSubmit,
  error
}) => (
  <Container>
    <Form onSubmit={handleSubmit}>

    </Form>
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults:PropTypes.array,
  searchInput:PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

export default SearchPresenter;