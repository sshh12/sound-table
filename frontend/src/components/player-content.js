'use client';

import { useYouTubePlayer } from '@/context/youtube-player-context';
import { MusicPlayer } from './music-player';

export function PlayerContent() {
  const { currentTrackInfo } = useYouTubePlayer();

  return (
    <div className="text-center space-y-8">
      <div className="w-64 md:w-96 mx-auto rounded-lg overflow-hidden bg-muted">
        <div className="relative pb-[56.25%]">
          <img
            src={currentTrackInfo.coverUrl}
            alt={currentTrackInfo.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile in-page player */}
      <div className="md:hidden">
        <MusicPlayer className="max-w-sm mx-auto" />
      </div>
    </div>
  );
}
