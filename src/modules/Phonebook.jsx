import React, { useState } from 'react';
import SearchFilter from '../components/SearchFilter';
import AddPersonForm from '../components/AddPersonForm';
import PersonList from '../components/PersonList';
import { postData, updateData, deleteData } from "../services/notes";

const Phonebook = ({ persons, hostUrl }) => {
  const [nextPersons, setNextPersons] = useState(persons);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedPerson, setUpdatedPerson] = useState(null);
  const [isExisted, setIsExisted] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name-input') {
      const existedContact = nextPersons.find(item => item.name.toLowerCase() === value.toLowerCase());
      if (existedContact) {
        const confirmReplacement = window.confirm(`${value} is already in the phonebook, replace the old number with a new one?`);
        if (confirmReplacement) {
          setUpdatedPerson(existedContact);
          setNewPerson({ ...newPerson, name: existedContact.name });
          setIsExisted(true);
        } else {
          setNewPerson({ name: '', number: '' });
        }
      } else {
        setNewPerson(prev => ({ ...prev, name: value }));
      }
    } else if (name === 'number-input') {
      setNewPerson(prev => ({ ...prev, number: value }));
    }
  };

  const showMessage = (message, type) => {
    setNotification({message, type});
    setTimeout(() => setNotification(null), 2000);
  }

  const handleDelete = async (name, id) => {
    const confirmDeletion = window.confirm(`Delete ${name}?`);
    if (confirmDeletion) {
      try {
        await deleteData(`${hostUrl}/${id}`);
        setNextPersons(prevPersons => {
          const deletedPersons = prevPersons.filter(person => (person.id !== id))
  
          setFilteredPersons(deletedPersons);
          return deletedPersons;
        });
        showMessage(`Contact was deleted succesfully!`,'success');
      } catch {
        showMessage('Failed to delete the person. Please try again.', 'error');
      }
    }
  }

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredPersons(nextPersons.filter(person => person.name.toLowerCase().includes(searchValue)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const personToSubmit = {
        ...newPerson,
        id: isExisted ? updatedPerson.id : crypto.randomUUID()
      };
      const manageDataPosting = isExisted 
        ? await updateData(`${hostUrl}/${updatedPerson.id}`, personToSubmit)
        : await postData(hostUrl, personToSubmit);

      setNextPersons(prevPersons => {
        const updatedPersons = isExisted 
          ? prevPersons.map(person => (person.id === manageDataPosting.id ? manageDataPosting : person))
          : [...prevPersons, manageDataPosting];

        setFilteredPersons(updatedPersons);
        return updatedPersons;
      });

      setNewPerson({ name: '', number: '' });
      setUpdatedPerson(null);
      setIsExisted(false);
      showMessage(`Contact was ${isExisted ? 'updated' : 'added'} succesfully!`, 'success');
    } catch {
      showMessage(`Failed to ${isExisted ? 'update' : 'add'} the contact. Please try again.`, 'error');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <AddPersonForm 
        newPerson={newPerson} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        isExisted={isExisted} 
        updatedPerson={updatedPerson} 
      />
      <PersonList persons={filteredPersons.length > 0 ? filteredPersons : nextPersons} handleDelete={handleDelete} notification={notification} />
    </div>
  );
};

export default Phonebook;