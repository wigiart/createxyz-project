import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Wigiart - Create Beautiful Custom Frames',
  description: 'Transform your photos with custom frames using Wigiart. Create, customize, and share your beautiful memories.',
  keywords: 'photo frames, custom frames, photo editor, image editing, Wigiart',
  openGraph: {
    title: 'Wigiart - Create Beautiful Custom Frames',
    description: 'Transform your photos with custom frames using Wigiart',
    type: 'website',
    url: 'https://www.wigiart.com',
    siteName: 'Wigiart',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}