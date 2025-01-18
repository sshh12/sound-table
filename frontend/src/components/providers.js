'use client';

import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@/context/user-context';
import { YouTubePlayerProvider } from '@/context/youtube-player-context';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <UserProvider>
        <YouTubePlayerProvider>{children}</YouTubePlayerProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
