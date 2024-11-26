"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';

export default function FramesPage() {
  const { useState, useEffect } = React;
  const router = useRouter();
  const [frameSizes, setFrameSizes] = useState({});

  useEffect(() => {
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
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        <div className="space-y-6">
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
    </Layout>
  );
}
