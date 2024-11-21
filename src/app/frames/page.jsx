"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FramesPage() {
  const { useState, useEffect } = React;
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [frameSizes, setFrameSizes] = useState({});

  useEffect(() => {
    // Get uploaded image from localStorage
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }

    // Get frame sizes
    frames.forEach(frame => {
      const img = new Image();
      img.onload = () => {
        setFrameSizes(prev => ({
          ...prev,
          [frame.id]: {
            width: img.naturalWidth,
            height: img.naturalHeight
          }
        }));
      };
      img.src = frame.src;
    });
  }, []);

  const frames = [
    {
      id: 1,
      name: "Frame 1",
      src: "https://i.imgur.com/IhwDheg.png",
      type: "frame",
    },
    {
      id: 2,
      name: "Frame 2",
      src: "https://i.imgur.com/VtsiaW3.png",
      type: "frame",
    },
    {
      id: 3,
      name: "Frame 3",
      src: "https://i.imgur.com/lTjjElf.png",
      type: "frame",
    },
    {
      id: 4,
      name: "Frame 4",
      src: "https://i.imgur.com/bLLXr0k.png",
      type: "frame",
    },
    {
      id: 5,
      name: "Frame 5",
      src: "https://i.imgur.com/sMnvLuD.png",
      type: "frame",
    },
    {
      id: 6,
      name: "Frame 6",
      src: "https://i.imgur.com/cQ5J6vS.png",
      type: "frame",
    },
    {
      id: 7,
      name: "Frame 7",
      src: "https://i.imgur.com/0TB1iiu.png",
      type: "frame",
    },
  ];

  const handleFrameSelect = (frameId) => {
    router.push(`/?frame=${frameId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 font-dancing">
            All Frames
          </h1>
          <Link 
            href="/"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Editor
          </Link>
        </div>

        {uploadedImage && (
          <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Your Image</h2>
            <div className="relative w-full overflow-hidden rounded-lg border bg-gray-50" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={uploadedImage}
                  alt="Uploaded Image"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {frames.map((frame) => {
              const frameSize = frameSizes[frame.id];
              const paddingBottom = frameSize 
                ? `${(frameSize.height / frameSize.width) * 100}%` 
                : '100%';

              return (
                <button
                  key={frame.id}
                  onClick={() => handleFrameSelect(frame.id)}
                  className="relative overflow-hidden rounded-lg border-2 border-purple-200 hover:border-purple-600 cursor-pointer transition-colors bg-gray-50"
                  style={{ paddingBottom }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={frame.src}
                      alt={`Frame ${frame.id}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
