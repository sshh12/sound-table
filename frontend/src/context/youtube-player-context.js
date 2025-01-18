'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

const YouTubePlayerContext = createContext({});

// Sample playlist of video IDs
const SAMPLE_PLAYLIST = [
  'dQw4w9WgXcQ', // Never Gonna Give You Up
  'y6120QOlsfU', // Sandstorm
  '9bZkp7q19f0', // Gangnam Style
];

const DEFAULT_TRACK_INFO = {
  id: '',
  title: 'Loading...',
  artist: 'Loading...',
  coverUrl: 'https://placehold.co/400',
};

export function YouTubePlayerProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackInfo, setCurrentTrackInfo] = useState(DEFAULT_TRACK_INFO);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visualProgress, setVisualProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const progressInterval = useRef(null);
  const seekTimeout = useRef(null);
  const playerRef = useRef(null);
  const isReadyRef = useRef(false);

  const playVideo = async (videoId) => {
    if (!playerRef.current || !isReadyRef.current) {
      console.log('Player not ready, cannot play video', {
        player: playerRef.current,
        isReady: isReadyRef.current,
      });
      return;
    }
    console.log('Playing video:', videoId);
    try {
      setCurrentVideo(videoId);
      setCurrentTrackInfo(DEFAULT_TRACK_INFO);
      playerRef.current.loadVideoById({
        videoId: videoId,
        startSeconds: 0,
        suggestedQuality: 'default',
      });

      // Fetch and update metadata
      const metadata = await fetchVideoMetadata(videoId);
      setCurrentTrackInfo(metadata);
    } catch (error) {
      console.error('Error playing video:', error);
    }
  };

  const skipToNext = () => {
    console.log('Skipping to next, current index:', currentTrackIndex);
    const nextIndex = (currentTrackIndex + 1) % SAMPLE_PLAYLIST.length;
    console.log(
      'Next index:',
      nextIndex,
      'Next video:',
      SAMPLE_PLAYLIST[nextIndex]
    );
    setCurrentTrackIndex(nextIndex);
    playVideo(SAMPLE_PLAYLIST[nextIndex]);
  };

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
        rel: 0,
        showinfo: 0,
        autoplay: 1,
      },
      events: {
        onReady: () => {
          console.log('Player ready');
          setIsReady(true);
          isReadyRef.current = true;
          setPlayer(newPlayer);
          playerRef.current = newPlayer;
        },
        onStateChange: (event) => {
          if (!playerRef.current) return;

          console.log('Player state changed:', event.data);
          const isVideoPlaying = event.data === window.YT.PlayerState.PLAYING;
          const isVideoEnded = event.data === window.YT.PlayerState.ENDED;
          const isVideoPaused = event.data === window.YT.PlayerState.PAUSED;
          const isVideoBuffering =
            event.data === window.YT.PlayerState.BUFFERING;

          console.log('Is playing:', isVideoPlaying, 'Is ended:', isVideoEnded);

          if (isVideoPlaying) {
            setIsPlaying(true);
            setDuration(playerRef.current.getDuration());
            startProgressTracker(playerRef.current);
          } else if (isVideoPaused || isVideoBuffering) {
            setIsPlaying(false);
            if (progressInterval.current) {
              clearInterval(progressInterval.current);
            }
          } else if (isVideoEnded) {
            console.log('Video ended, attempting to skip to next');
            setIsPlaying(false);
            if (progressInterval.current) {
              clearInterval(progressInterval.current);
            }
            if (isReadyRef.current && playerRef.current) {
              skipToNext();
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
      const newProgress = (currentTime / duration) * 100;
      setProgress(newProgress);
      setVisualProgress(newProgress);
    }, 1000);
  };

  const fetchVideoMetadata = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const data = await response.json();
      return {
        id: videoId,
        title: data.title,
        artist: data.author_name,
        coverUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    } catch (error) {
      console.error('Error fetching video metadata:', error);
      return {
        id: videoId,
        title: 'Unknown Title',
        artist: 'Unknown Artist',
        coverUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    }
  };

  const skipToPrevious = () => {
    const prevIndex =
      (currentTrackIndex - 1 + SAMPLE_PLAYLIST.length) % SAMPLE_PLAYLIST.length;
    setCurrentTrackIndex(prevIndex);
    playVideo(SAMPLE_PLAYLIST[prevIndex]);
  };

  const togglePlay = () => {
    if (!playerRef.current || !isReadyRef.current) return;
    if (!currentVideo) {
      playVideo(SAMPLE_PLAYLIST[0]);
      return;
    }
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const seekTo = (percent) => {
    if (!playerRef.current || !isReadyRef.current) return;

    setVisualProgress(percent);

    if (seekTimeout.current) {
      clearTimeout(seekTimeout.current);
    }

    seekTimeout.current = setTimeout(() => {
      const duration = playerRef.current.getDuration();
      playerRef.current.seekTo((percent / 100) * duration);
      setProgress(percent);
    }, 200);
  };

  const setPlayerVolume = (value) => {
    if (!playerRef.current || !isReadyRef.current) return;
    setVolume(value);
    playerRef.current.setVolume(value);
  };

  const value = {
    player,
    isReady,
    isPlaying,
    currentVideo,
    currentTrackInfo,
    progress: visualProgress,
    volume,
    duration,
    playVideo,
    togglePlay,
    seekTo,
    setVolume: setPlayerVolume,
    skipToNext,
    skipToPrevious,
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
