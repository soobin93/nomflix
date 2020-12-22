import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin: 40px 0;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 500px;
  padding: 40px 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.5);
`;

const Company = styled.div`
  margin: 10px;
`;

const CompanyLogo = styled.img`
  width: 100px;
`;

const CompanyName = styled.div`
  padding: 10px;
  font-weight: 600;
  font-size: 15px;
  color: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(20, 20, 20, 0.8);
  border-radius: 4px;
`;

const Divider = styled.hr`
  margin: 10px 0;
  width: 500px;
`;

const CountryContainer = styled.div`
  padding-bottom: 80px;
`;

const Country = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
`;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300/";

const Production = ({ companies, countries }) => (
  <Container>
    {companies.length > 0 && (
      <>
        <Header>Companies</Header>
        <CompanyContainer>
          {companies.map((company) => (
            <Company key={company.id}>
              {company.logo_path ? (
                <CompanyLogo
                  src={`${IMAGE_BASE_URL}${company.logo_path}`}
                  alt={company.name}
                />
              ) : (
                <CompanyName>{company.name}</CompanyName>
              )}
            </Company>
          ))}
        </CompanyContainer>
      </>
    )}

    {countries.length > 0 && (
      <>
        <Header>Countries</Header>
        <Divider />
        <CountryContainer>
          {countries.map((country) => (
            <Country key={country.name}>{country.name}</Country>
          ))}
        </CountryContainer>
      </>
    )}
  </Container>
);

Production.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      logo_path: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default Production;
