import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from '../../myCss/index.module.css';

const INITIAL_STATE = {
  phone: '',
  name: '',
};

const ContactForm = ({ onAdd, getUniqueContacts }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const { name, phone } = formData;

    const isValidatedForm = validateForm();
    if (isValidatedForm) {
      onAdd({ id: nanoid(), name, phone });
      resetForm();
    }
  };

  const validateForm = () => {
    const { name, phone } = formData;
    if (!name || !phone) {
      alert('Please fill in all fields!');
      return false;
    }
    return getUniqueContacts(name);
  };

  const resetForm = () => setFormData(INITIAL_STATE);

  const { name, phone } = formData;
  return (
    <form className={styles.decorForm} onSubmit={handleFormSubmit}>
      <input
        className={styles.decorInput}
        type="text"
        name="name"
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChangeForm}
      />
      <input
        className={styles.decorInput}
        type="text"
        name="phone"
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={phone}
        onChange={handleChangeForm}
      />
      <button className={styles.decorButton} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
