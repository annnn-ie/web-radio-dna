import React from 'react';
import styles from './Folder.module.css';

export default function Folder({ title, color, open, onClick, children, tabLabel }) {
  return (
    <div className={styles.folderWrapper} onClick={onClick} tabIndex={0} role="button" aria-expanded={open}>
      <div
        className={styles.folderTab}
        style={{ background: color }}
        data-open={open}
      >
        <span className={styles.tabLabel}>{tabLabel}</span>
      </div>
      <div
        className={styles.folderBody}
        style={{ background: color, maxHeight: open ? 1000 : 0, padding: open ? '2rem' : '0 2rem', transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}
        data-open={open}
      >
        {open && children}
      </div>
    </div>
  );
} 