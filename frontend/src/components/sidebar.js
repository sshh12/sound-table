'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Plus, PlayCircle } from 'lucide-react';

// Mock data - replace with real data later
const mockPlaylists = [
  { id: 1, name: 'Chill Vibes' },
  { id: 2, name: 'Workout Mix' },
  { id: 3, name: 'Focus Time' },
];

export function Sidebar() {
  return (
    <div className="w-64 h-full border-r bg-background">
      <div className="flex flex-col h-full p-4 space-y-4">
        <Link href="/">
          <Button className="w-full justify-start" variant="secondary">
            <PlayCircle className="mr-2 h-4 w-4" />
            Now Playing
          </Button>
        </Link>

        <Link href="/new-playlist">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Playlist
          </Button>
        </Link>

        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {mockPlaylists.map((playlist) => (
              <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  {playlist.name}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
