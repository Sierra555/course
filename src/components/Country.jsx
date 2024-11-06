import React from 'react';

const Country = ({ data }) => {
  return (
    <>
        {data.map(country => (
            <div key={country.name.common}>
                <h1>{country.name.common}</h1>

                <p>{country.capital}</p>
                <p>{country.area}</p>

                <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li> )}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}/>
            </div>
        ))}
    </>
  );
};

export default Country;