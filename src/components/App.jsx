import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const contactsFromStorage = localStorage.getItem('contacts');
      if (contactsFromStorage) {
        setContacts(JSON.parse(contactsFromStorage));
      }
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
    }
  }, []);

  const saveContactsToLocalStorage = contacts => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contacts to localStorage:', error);
    }
  };

  const formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const exists = contacts.some(
      i => i.name.toLowerCase() === contact.name.toLowerCase() && i.number === contact.number
    );

    if (exists) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevContacts => {
        const updatedContacts = [contact, ...prevContacts];
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
    }
  };

  const changeFilterInput = e => {
    setFilter(e.target.value);
  };

  const findContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(contact => contact.id !== id);
      saveContactsToLocalStorage(updatedContacts);
      return updatedContacts;
    });
  };

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} changeFilterInput={changeFilterInput} />
      <ContactList contacts={findContacts()} deleteContact={deleteContact} />
    </section>
  );
};
