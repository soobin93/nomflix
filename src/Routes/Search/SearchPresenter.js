import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchPresenter = ({ movieResults, tvResults, searchInput, loading, error, handleSubmit }) => null;

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchInput: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
}

export default SearchPresenter;