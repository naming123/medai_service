// app/layout.tsx
import "../styles/globals.css"; // 전역 스타일을 import

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Blog</h1>
          <nav>
            <a href="/">Home</a> | <a href="/blog">Blog</a> |{" "}
            <a href="/new">New Post</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>osmnick@korea.ac.kr</footer>
      </body>
    </html>
  );
}
