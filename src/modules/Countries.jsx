import React from 'react';
import useSWR from 'swr';
import Country from '../components/Country';

const ENDPOINT = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const fetcher = async (endpoint) => {
  const response = await fetch(endpoint);
  const data = response.json();
  return data;
};

const Countries = () => {
    const { data } = useSWR(ENDPOINT, fetcher);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSearchData, setFilteredSearchData] = useState([]);
    const [countryToShow, setCountryToShow] = useState(null);
  
    const handleSearch = (e) => {
      const searchValue = e.currentTarget.value.toLowerCase();
      const filteredData = data.filter(country => country.name.common.toLowerCase().includes(searchValue));
  
      setSearchTerm(searchValue);
      setFilteredSearchData(filteredData);
    };
  
    const toggleCountryView = (country) => {
      setCountryToShow(prevCountry => prevCountry?.name.common === country.name.common ? null : country);
    };
  
    return (
      <>
        <label htmlFor="search-input">Find a country</label>
        <input
          id="search-input"
          name="search-input"
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
        />
        {filteredSearchData.length > 10 && (
          <p>Too many matches, please specify another filter</p>
        )}
        {filteredSearchData.length <= 10 && (
          <ul>
            {filteredSearchData.map(country => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => toggleCountryView(country)}>
                  {countryToShow?.name.common === country.name.common ? 'Hide' : 'Show'}
                </button>
              </li>
            ))}
          </ul>
        )}
        {countryToShow && <Country data={[countryToShow]} />}
      </>
    );
};

export default Countries;