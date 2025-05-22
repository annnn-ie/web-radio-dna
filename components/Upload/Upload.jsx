import React from 'react';
import styles from './Upload.module.css';

export default function Upload({ onUpload, label }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload({
        title: file.name,
        timestamp: new Date().toLocaleString(),
        duration: 0, // Will be set after loading
        url,
        file
      });
    }
  };

  return (
    <label className={styles.uploadLabel}>
      <input
        type="file"
        accept="audio/*"
        className={styles.input}
        onChange={handleChange}
      />
      <span className={styles.button}>{label}</span>
    </label>
  );
} 