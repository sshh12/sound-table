import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Sidebar } from '@/components/sidebar';
import { TopNav } from '@/components/top-nav';
import { MusicPlayer } from '@/components/music-player';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sound Table',
  description: 'AI Music Player',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background')}>
        <Providers>
          <div className="flex h-screen pb-[88px] md:pb-[104px]">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:flex">
              <Sidebar />
            </div>
            {/* Main content */}
            <div className="flex-1 flex flex-col">
              <TopNav />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
