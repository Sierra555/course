import React from 'react';

const AddPersonForm = ({ newPerson, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      Name: <input 
        name='name-input' 
        type='text' 
        value={newPerson.name} 
        onChange={handleInputChange}
        required />
    </div>
    <div>
      Number: <input
        name='number-input' 
        type='tel'
        inputMode='numeric' 
        autoComplete='tel' 
        value={newPerson.number} 
        onChange={handleInputChange} 
        required />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default AddPersonForm;
