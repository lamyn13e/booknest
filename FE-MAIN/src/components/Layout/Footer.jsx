import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-bg text-muted text-center py-6 text-sm">
      © {new Date().getFullYear()} BookNest. All rights reserved.
    </footer>
  );
}