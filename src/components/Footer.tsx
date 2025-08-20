'use client';

import Link from 'next/link';

export default function Footer() {
  
  return (
    <footer className="bg-card border-t py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Convert All Files</h3>
            <p className="text-sm text-muted-foreground">
              Free online tool to convert between various file formats quickly and securely.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Conversions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/convert/pdf-to-word" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link href="/convert/word-to-pdf" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link href="/convert/image-to-word" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Image to Word
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-muted/20">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Convert All Files. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}