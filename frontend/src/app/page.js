import { MusicPlayer } from '@/components/music-player';

export default function PlayerPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-8">
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto rounded-lg overflow-hidden bg-muted">
            <img
              src="https://placehold.co/800"
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile in-page player */}
          <div className="md:hidden">
            <MusicPlayer className="max-w-sm mx-auto" />
          </div>
        </div>
      </div>

      {/* Desktop bottom player */}
      <div className="hidden md:block">
        <MusicPlayer />
      </div>
    </div>
  );
}
