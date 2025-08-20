'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/file.svg" alt="Convert All Files Logo" width={32} height={32} />
              <span className="text-xl font-bold text-foreground">Convert All Files</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-foreground hover:text-primary">
              About
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-primary" />
              ) : (
                <MoonIcon className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}