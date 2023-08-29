import React, { useState } from 'react';
import styles from '../../myCss/index.module.css';

const Filter = ({ onChange }) => {
  const [filter, setFilter] = useState('');

  const handleChange = event => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <input
      className={styles.decorInput}
      type="text"
      name="filter"
      value={filter}
      onChange={handleChange}
      placeholder="Enter name for Search"
    />
  );
};

export default Filter;
