import React from 'react';
import Person from './Person';
import Notification from '../components/Notification';

const PersonList = ({ persons, handleDelete, notification }) => (
  <div>
    <h2>Numbers</h2>
    {notification && <Notification message={notification.message} type={notification.type} />}
    <ul>
      {persons.map(person => (
        <li style={{display: 'flex', listStyle: 'none'}} key={`item-${person.id}`}>
          <Person key={person.id} person={person} /> 
          <button 
          key={`btn-${person.id}`} 
          type='button' onClick={() => handleDelete(person.name, person.id)} 
          aria-label='Delete contact'>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default PersonList;
