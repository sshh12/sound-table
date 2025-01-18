import { MusicPlayer } from '@/components/music-player';
import { PlayerContent } from '@/components/player-content';

export default function PlayerPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <PlayerContent />
      </div>

      {/* Desktop bottom player */}
      <div className="hidden md:block">
        <MusicPlayer />
      </div>
    </div>
  );
}
