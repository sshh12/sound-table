'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  Plus,
  PlayCircle,
  MoreHorizontal,
  Pencil,
  Share2,
  GitFork,
  Headphones,
  Dumbbell,
  Brain,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

// Mock data - replace with real data later
const mockPlaylists = [
  { id: 1, name: 'Chill Vibes', icon: Headphones },
  { id: 2, name: 'Workout Mix', icon: Dumbbell },
  { id: 3, name: 'Focus Time', icon: Brain },
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
              <div key={playlist.id} className="flex items-center group">
                <Link href={`/playlist/${playlist.id}`} className="flex-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                  >
                    {playlist.icon && (
                      <playlist.icon className="mr-2 h-4 w-4" />
                    )}
                    {playlist.name}
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GitFork className="mr-2 h-4 w-4" />
                      Remix
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
