"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';

export default function FramesPage() {
  const { useState, useEffect } = React;
  const router = useRouter();
  const [frameSizes, setFrameSizes] = useState({});
  const [visibleFrames, setVisibleFrames] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('simple');

  const collections = {
    simple: {
      name: "Simple Frames",
      frames: [
        {
          id: 1,
          name: "Frame 1",
          src: "/Frames Callaction/Simple Frames/Frame 1.webp",
          type: "frame",
        },
        {
          id: 2,
          name: "Frame 2",
          src: "/Frames Callaction/Simple Frames/Frame 2.webp",
          type: "frame",
        },
        {
          id: 3,
          name: "Frame 3",
          src: "/Frames Callaction/Simple Frames/Frame 3.webp",
          type: "frame",
        },
        {
          id: 4,
          name: "Frame 4",
          src: "/Frames Callaction/Simple Frames/Frame 4.webp",
          type: "frame",
        },
        {
          id: 5,
          name: "Frame 5",
          src: "/Frames Callaction/Simple Frames/Frame 5.webp",
          type: "frame",
        },
        {
          id: 6,
          name: "Frame 6",
          src: "/Frames Callaction/Simple Frames/Frame 6.webp",
          type: "frame",
        },
        {
          id: 7,
          name: "Frame 7",
          src: "/Frames Callaction/Simple Frames/Frame 7.webp",
          type: "frame",
        },
      ],
    },
    cat: {
      name: "Cat Frames",
      frames: [
        {
          id: 1,
          name: "Cat Frame 1",
          src: `/Frames collection/Cat Frames/Cat Frame 1(a).png?t=${Date.now()}`,
          type: "frame",
        },
      ],
    },
  };

  useEffect(() => {
    // Reset visible frames when collection changes
    setVisibleFrames(10);
    setFrameSizes({});

    // Get frame sizes for current collection
    collections[selectedCollection].frames.forEach(frame => {
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
  }, [selectedCollection]);

  const handleFrameSelect = (frameId) => {
    const collection = collections[selectedCollection];
    const frame = collection.frames.find(f => f.id === frameId);
    if (frame) {
      router.push(`/?frame=${frameId}&collection=${selectedCollection}&src=${encodeURIComponent(frame.src)}`);
    }
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleFrames(prev => prev + 10);
      setLoading(false);
    }, 500);
  };

  const currentFrames = collections[selectedCollection].frames;
  const displayedFrames = currentFrames.slice(0, visibleFrames);
  const hasMore = visibleFrames < currentFrames.length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        <div className="space-y-6">
          {/* Collection Selector */}
          <div className="flex justify-center space-x-4 mb-6">
            {Object.entries(collections).map(([key, collection]) => (
              <button
                key={key}
                onClick={() => setSelectedCollection(key)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedCollection === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayedFrames.map((frame) => {
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
                        alt={frame.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'See More'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
