"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white">
      {/* Desktop Navigation */}
      <div className="hidden md:grid md:grid-cols-3 md:items-center md:px-6 md:py-4">
        {/* Left: Submissions (25% from left edge) */}
        <div className="pl-[8%]">
          <Link
            href="/submissions"
            className="font-display text-sm text-ww-orange transition-opacity hover:opacity-70"
          >
            SUBMISSIONS
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <Link href="/" className="font-display text-2xl text-ww-orange">
            WORK WIFE
          </Link>
        </div>

        {/* Right: Waitlist + About Us */}
        <div className="flex items-center justify-end gap-6 pr-[8%]">
          <Link
            href="/coming-soon"
            className="font-display text-sm text-ww-orange transition-opacity hover:opacity-70"
          >
            WAITLIST
          </Link>
          <Link
            href="/about"
            className="font-display text-sm text-ww-orange transition-opacity hover:opacity-70"
          >
            ABOUT US
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <Link href="/" className="font-display text-2xl text-ww-orange">
          WORK WIFE
        </Link>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-opacity ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display text-sm text-ww-orange"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/submissions"
              className="font-display text-sm text-ww-orange"
              onClick={() => setIsOpen(false)}
            >
              SUBMISSIONS
            </Link>
            <Link
              href="/coming-soon"
              className="font-display text-sm text-ww-orange"
              onClick={() => setIsOpen(false)}
            >
              WAITLIST
            </Link>
            <Link
              href="/about"
              className="font-display text-sm text-ww-orange"
              onClick={() => setIsOpen(false)}
            >
              ABOUT US
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
