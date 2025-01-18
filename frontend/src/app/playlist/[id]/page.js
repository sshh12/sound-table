import { MusicPlayer } from '@/components/music-player';
import { Button } from '@/components/ui/button';
import { Play, MoreHorizontal } from 'lucide-react';

// Mock data - replace with real data later
const mockPlaylist = {
  id: '1',
  name: 'Chill Vibes',
  description: 'Perfect for relaxing and unwinding',
  coverUrl: 'https://placehold.co/400',
  tracks: [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'LoFi Artist',
      duration: '3:45',
    },
    {
      id: '2',
      title: 'Ocean Waves',
      artist: 'Ambient Sounds',
      duration: '4:20',
    },
    {
      id: '3',
      title: 'City Lights',
      artist: 'Night Vibes',
      duration: '3:15',
    },
  ],
};

export default function PlaylistPage({ params }) {
  const playlist = mockPlaylist; // Replace with real data fetch

  return (
    <div className="flex flex-col h-full">
      {/* Playlist header */}
      <div className="p-6 md:p-8 bg-gradient-to-b from-muted/50">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="w-48 h-48 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
            <p className="text-muted-foreground mb-4">{playlist.description}</p>
            <Button size="lg">
              <Play className="mr-2 h-5 w-5" />
              Play
            </Button>
          </div>
        </div>
      </div>

      {/* Tracks list */}
      <div className="flex-1 p-6 md:p-8">
        <div className="space-y-1">
          {playlist.tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 group"
            >
              <span className="w-8 text-center text-muted-foreground">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="font-medium">{track.title}</div>
                <div className="text-sm text-muted-foreground">
                  {track.artist}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {track.duration}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Player controls */}
      <MusicPlayer />
    </div>
  );
}
