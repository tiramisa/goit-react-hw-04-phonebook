import React, { useState, useEffect } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactsList from './contactsList/ContactsList';
import Filter from './filter/Filter';
import styles from '../myCss/index.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    if (handleGetUniqueContacts(newContact.name)) {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleRemoveContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleGetUniqueContacts = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);

    if (isExistContact) {
      alert('Контакт уже существует, убей его и создай новый:)');
    }

    return !isExistContact;
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>Form Contact</h2>
      <ContactForm
        onAdd={handleAddContact}
        getUniqueContacts={handleGetUniqueContacts}
      />
      <h2 className={styles.formTitle}>Contact List</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactsList contacts={visibleContacts} onRemove={handleRemoveContact} />
    </div>
  );
}

export default App;
