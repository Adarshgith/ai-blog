"use client";

import Link from "next/link";
import { useState } from "react";
import type { Session } from "next-auth";

function Logomark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="32" height="32" rx="9" fill="var(--primary)" />
      <path
        d="M16 7L21.5 12.5L16.9 21.5C16.6 22.1 15.9 22.4 15.3 22.1C15.1 22 14.9 21.8 14.8 21.6L10.5 13.5C10.2 12.9 10.4 12.2 11 11.9L16 7Z"
        fill="white"
      />
      <path
        d="M15.5 19.5H19.5M19.5 19.5V16.5M19.5 16.5H22.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="22.5" cy="16.5" r="1" fill="white" opacity="0.85" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
];

export default function Navbar({
  session,
  signOutAction,
}: {
  session: Session | null;
  signOutAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const user = session?.user;

  return (
    <nav className="bg-surface/95 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logomark />
          <span className="font-display text-xl font-semibold text-ink tracking-tight">
            WordCraft <span className="text-primary">AI</span>
          </span>
        </Link>

        {user && (
          <>
            {/* Desktop nav */}
            <div className="hidden md:flex gap-8 items-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/create"
                className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                + New Blog
              </Link>
              <div className="flex items-center gap-3">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name ?? "User"}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-ink">
                  {user.name}
                </span>
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                  >
                    Log out
                  </button>
                </form>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink hover:bg-primary-tint transition-colors"
            >
              {open ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M5 5L17 17M17 5L5 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M3 6H19M3 11H19M3 16H19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </>
        )}
      </div>

      {/* Mobile menu panel */}
      {user && open && (
        <div className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink-muted hover:text-ink hover:bg-primary-tint rounded-lg px-3 py-2.5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/create"
            onClick={() => setOpen(false)}
            className="mt-2 text-center bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
          >
            + New Blog
          </Link>
          <div className="mt-2 flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-ink">{user.name}</span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}