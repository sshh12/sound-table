'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

const YouTubePlayerContext = createContext({});

export function YouTubePlayerProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const progressInterval = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const initPlayer = () => {
    const newPlayer = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      playerVars: {
        playsinline: 1,
        controls: 0,
      },
      events: {
        onReady: () => {
          setIsReady(true);
          setPlayer(newPlayer);
        },
        onStateChange: (event) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          if (event.data === window.YT.PlayerState.PLAYING) {
            setDuration(newPlayer.getDuration());
            startProgressTracker(newPlayer);
          } else {
            if (progressInterval.current) {
              clearInterval(progressInterval.current);
            }
          }
        },
      },
    });
  };

  const startProgressTracker = (playerInstance) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      const currentTime = playerInstance.getCurrentTime();
      const duration = playerInstance.getDuration();
      setProgress((currentTime / duration) * 100);
    }, 1000);
  };

  const playVideo = (videoId) => {
    if (!player || !isReady) return;
    setCurrentVideo(videoId);
    player.loadVideoById(videoId);
  };

  const togglePlay = () => {
    if (!player || !isReady) return;
    if (!currentVideo) {
      // Default test video if none is set
      playVideo('dQw4w9WgXcQ');
      return;
    }
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const seekTo = (percent) => {
    if (!player || !isReady) return;
    const duration = player.getDuration();
    player.seekTo((percent / 100) * duration);
  };

  const setPlayerVolume = (value) => {
    if (!player || !isReady) return;
    setVolume(value);
    player.setVolume(value);
  };

  const value = {
    player,
    isReady,
    isPlaying,
    currentVideo,
    progress,
    volume,
    duration,
    playVideo,
    togglePlay,
    seekTo,
    setVolume: setPlayerVolume,
  };

  return (
    <>
      <div id="youtube-player" />
      <YouTubePlayerContext.Provider value={value}>
        {children}
      </YouTubePlayerContext.Provider>
    </>
  );
}

export const useYouTubePlayer = () => useContext(YouTubePlayerContext);
