import React, { useRef, useEffect, useState } from 'react';
import styles from './AudioCard.module.css';

export default function AudioCard({ title, timestamp, duration, url, isPlaying, onPlay, onPause }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    setProgress(current / duration);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>{timestamp} &bull; {formatDuration(duration)}</div>
      </div>
      <button className={styles.playBtn} onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
        <svg className={styles.progressRing} width="48" height="48">
          <circle
            className={styles.ringBg}
            cx="24" cy="24" r="20"
            strokeWidth="4"
            fill="none"
          />
          <circle
            className={styles.ringFg}
            cx="24" cy="24" r="20"
            strokeWidth="4"
            fill="none"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={(1 - progress) * 2 * Math.PI * 20}
          />
        </svg>
        {isPlaying ? (
          <span className={styles.pauseIcon}>❚❚</span>
        ) : (
          <span className={styles.playIcon}>▶</span>
        )}
      </button>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onPause}
      />
    </div>
  );
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
} 