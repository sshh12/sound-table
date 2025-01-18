'use client';

import { useState } from 'react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useYouTubePlayer } from '@/context/youtube-player-context';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function MusicPlayer({ className }) {
  const {
    isPlaying,
    progress,
    volume,
    duration,
    currentTrackInfo,
    togglePlay,
    seekTo,
    setVolume,
    skipToNext,
    skipToPrevious,
  } = useYouTubePlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prevVolume, setPrevVolume] = useState(100);

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mobile player (in-page)
  if (className) {
    return (
      <div className={cn('w-full', className)}>
        <div className="space-y-6">
          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={skipToPrevious}
              >
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button onClick={togglePlay} size="icon" className="h-16 w-16">
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={skipToNext}
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
            <div className="w-full space-y-2">
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={(value) => seekTo(value[0])}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime((progress / 100) * duration)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop player (bottom bar)
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-background border-t p-4',
        isExpanded && 'h-full md:h-auto'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-md bg-muted">
              <img
                src={currentTrackInfo.coverUrl}
                alt={currentTrackInfo.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="max-w-[200px]">
                <h3 className="font-medium truncate">
                  {currentTrackInfo.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {currentTrackInfo.artist}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem>Never play this again</DropdownMenuItem>
                    <DropdownMenuItem>Not today</DropdownMenuItem>
                    <DropdownMenuItem>Too slow</DropdownMenuItem>
                    <DropdownMenuItem>Not my style</DropdownMenuItem>
                    <DropdownMenuItem>Bad quality</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="hidden md:flex flex-col items-center space-y-2 flex-1 max-w-xl mx-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={skipToPrevious}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button onClick={togglePlay} size="icon">
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={skipToNext}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            <div className="w-full flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {formatTime((progress / 100) * duration)}
              </span>
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => seekTo(value[0])}
              />
              <span className="text-sm text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" side="top">
                <div className="h-24">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    orientation="vertical"
                    className="h-full"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile expand button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile expanded controls */}
        {isExpanded && (
          <div className="md:hidden mt-4 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={skipToPrevious}
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button onClick={togglePlay} size="icon" className="h-16 w-16">
                  {isPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8 ml-1" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={skipToNext}
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              <div className="w-full space-y-2">
                <Slider
                  value={[progress]}
                  max={100}
                  step={1}
                  onValueChange={(value) => seekTo(value[0])}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime((progress / 100) * duration)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
