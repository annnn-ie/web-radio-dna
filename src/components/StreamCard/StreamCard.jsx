import React, { useRef, useEffect } from 'react';
import styles from './StreamCard.module.css';

export default function StreamCard({ label, icon, streamUrl, isPlaying, onPlay, onPause }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className={styles.card}>
      <img src={icon} alt={label} className={styles.icon} />
      <div className={styles.label}>{label}</div>
      <button className={styles.playBtn} onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? (
          <span className={styles.pauseIcon}>❚❚</span>
        ) : (
          <span className={styles.playIcon}>▶</span>
        )}
      </button>
      <audio ref={audioRef} src={streamUrl} />
    </div>
  );
} 