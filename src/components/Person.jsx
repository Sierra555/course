import React from 'react';

const Person = ({ person }) => (
  <p>
    {person.name} <a href={`tel:${person.number}`}>{person.number}</a>
  </p>
);

export default Person;
