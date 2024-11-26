"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { useUpload } from "../utilities/runtime-helpers";
import Layout from '../components/Layout';

function MainComponent() {
  const { useState, useEffect, useRef } = React;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("frames");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState("https://i.imgur.com/IhwDheg.png"); 
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);
  const [upload, { loading }] = useUpload();
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleTabSwitch = (event) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('switchTab', handleTabSwitch);
    return () => window.removeEventListener('switchTab', handleTabSwitch);
  }, []);

  useEffect(() => {
    const frameId = searchParams.get('frame');
    if (frameId) {
      const frame = frames.find(f => f.id === parseInt(frameId));
      if (frame) {
        setSelectedFrame(frame.src);
        setActiveTab('frames');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (selectedFrame && frameRef.current) {
      const img = new Image();
      img.onload = () => {
        setFrameSize({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.src = selectedFrame;
    }
  }, [selectedFrame]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setFrameSize({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = selectedFrame;
  }, []);

  useEffect(() => {
    if (uploadedImage) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let newWidth, newHeight;
        
        if (frameSize.width && frameSize.height) {
          if (aspectRatio > frameSize.width / frameSize.height) {
            newWidth = frameSize.width;
            newHeight = frameSize.width / aspectRatio;
          } else {
            newHeight = frameSize.height;
            newWidth = frameSize.height * aspectRatio;
          }
        } else {
          newWidth = img.naturalWidth;
          newHeight = img.naturalHeight;
        }

        setImageSize({
          width: newWidth,
          height: newHeight
        });
        
        setImagePosition({
          x: (frameSize.width - newWidth) / 2,
          y: (frameSize.height - newHeight) / 2
        });
      };
      img.src = uploadedImage;
    }
  }, [uploadedImage, frameSize]);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setImageScale(1);
        try {
          localStorage.setItem('uploadedImage', event.target.result);
        } catch (e) {
          console.error('Error saving image to localStorage:', e);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (e, data) => {
    setIsDragging(false);
    setImagePosition({ x: data.x, y: data.y });
  };

  const handleScale = (direction) => {
    const scaleFactor = direction === 'up' ? 1.1 : 0.9;
    const newScale = imageScale * scaleFactor;
    
    if (newScale >= 0.1 && newScale <= 3) {
      setImageScale(newScale);
    }
  };

  const resetImage = () => {
    setImageScale(1);
    setImagePosition({
      x: (frameSize.width - imageSize.width) / 2,
      y: (frameSize.height - imageSize.height) / 2
    });
  };

  const handleSeeMoreClick = (e) => {
    e.preventDefault();
    router.push('/frames');
  };

  const handleSaveCreation = async () => {
    if (!canvasRef.current || !uploadedImage) return;
    
    setIsSaving(true);
    setShowControls(false); // Hide controls before capture
    
    try {
      // Wait for any transitions to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // Enable cross-origin image loading
        allowTaint: true,
        backgroundColor: null,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = 'my-creation.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error saving creation:', err);
      setError('Failed to save creation. Please try again.');
    } finally {
      setIsSaving(false);
      setShowControls(true); // Show controls after capture
    }
  };

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

  const videoTemplates = [
    { 
      id: 1, 
      name: "Slideshow", 
      src: "/Videos/template1.mp4", 
      thumbnail: "/Videos/template1-thumb.jpg",
      type: "video" 
    },
    {
      id: 2,
      name: "Celebration",
      src: "/Videos/template2.mp4",
      thumbnail: "/Videos/template2-thumb.jpg",
      type: "video",
    },
  ];

  const [showAllFrames, setShowAllFrames] = useState(false);

  const initialFrames = frames.slice(0, 4);
  const visibleFrames = showAllFrames ? frames : initialFrames;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <header className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 font-dancing mb-2">
            Birthday Creator
          </h1>
          <p className="text-gray-600 font-roboto">
            Create beautiful birthday memories
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 overflow-hidden">
          <div className="space-y-4">
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 font-roboto">
                {activeTab === "frames"
                  ? "Choose a Frame"
                  : "Choose a Template"}
              </h3>

              <div className="relative -mx-4">
                <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory no-scrollbar">
                  {activeTab === "frames" &&
                    visibleFrames.map((frame) => (
                      <div
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame.src)}
                        className="flex-shrink-0 w-[calc(25%-12px)] min-w-[200px] snap-start rounded-lg overflow-hidden border-2 border-purple-200 hover:border-purple-600 cursor-pointer"
                        style={{ height: '120px' }}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={frame.src}
                            alt="template"
                            className="absolute inset-0 w-full h-full object-contain bg-gray-50"
                          />
                        </div>
                      </div>
                    ))}

                  {!showAllFrames && activeTab === "frames" && frames.length > 4 && (
                    <button
                      onClick={handleSeeMoreClick}
                      className="flex-shrink-0 w-[calc(25%-12px)] min-w-[200px] snap-start rounded-lg border-2 border-purple-200 hover:border-purple-600 cursor-pointer flex items-center justify-center bg-gray-50"
                      style={{ height: '120px' }}
                    >
                      <div className="text-center">
                        <span className="block text-purple-600 font-semibold">See More</span>
                        <span className="text-gray-500 text-sm">{frames.length - 4} more frames</span>
                      </div>
                    </button>
                  )}

                  {activeTab === "videos" && (
                    <div className="flex flex-col h-full">
                      {selectedVideo ? (
                        <div className="flex-1 flex items-center justify-center p-4">
                          <div className="w-full max-w-4xl">
                            <button
                              onClick={() => setSelectedVideo(null)}
                              className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                              </svg>
                              Choose Different Template
                            </button>
                            <video
                              key={selectedVideo.src}
                              src={selectedVideo.src}
                              className="w-full rounded-lg shadow-lg"
                              controls
                              preload="auto"
                              playsInline
                              onError={(e) => {
                                console.error('Video error:', e);
                                setError('Error loading video. Please try again.');
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 p-4">
                          {videoTemplates.map((template) => (
                            <div
                              key={template.id}
                              className="relative group cursor-pointer bg-gray-100 rounded-lg overflow-hidden"
                              onClick={() => setSelectedVideo(template)}
                            >
                              <div className="aspect-video relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-gray-500 text-sm">Loading preview...</span>
                                </div>
                                <video
                                  key={template.src}
                                  src={template.src}
                                  className="w-full h-full object-cover"
                                  preload="metadata"
                                  playsInline
                                  muted
                                  onLoadedMetadata={(e) => {
                                    e.target.currentTime = 0;
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.play().catch(() => {});
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.pause();
                                    e.target.currentTime = 0;
                                  }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200">
                                  <span className="text-white text-lg font-medium">
                                    {template.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {error && (
                        <div className="text-red-500 text-center mt-2">
                          {error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div 
                ref={canvasRef}
                className={`relative w-full overflow-hidden rounded-lg border bg-gray-50 ${activeTab === "videos" ? "hidden" : ""}`}
                style={frameSize.width && frameSize.height 
                  ? { paddingBottom: `${(frameSize.height / frameSize.width) * 100}%` }
                  : { paddingBottom: '100%' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {uploadedImage && (
                    <>
                      <Draggable
                        position={imagePosition}
                        onStart={handleDragStart}
                        onStop={handleDragStop}
                        disabled={!uploadedImage}
                      >
                        <div
                          className={`cursor-move transition-transform ${
                            isDragging ? 'z-20' : 'z-10'
                          }`}
                          style={{
                            width: imageSize.width,
                            height: imageSize.height,
                            transformOrigin: 'center'
                          }}
                        >
                          <img
                            ref={imageRef}
                            src={uploadedImage}
                            alt="Uploaded Image"
                            className="max-w-full max-h-full object-contain pointer-events-none"
                            style={{
                              width: '100%',
                              height: '100%',
                              transform: `scale(${imageScale})`,
                              transition: 'transform 0.2s ease-out'
                            }}
                          />
                        </div>
                      </Draggable>
                      {showControls && (
                        <div className="absolute bottom-4 left-4 flex gap-3 z-30">
                          <button
                            onClick={() => handleScale('up')}
                            className="bg-white p-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-colors
                              border border-black/20 hover:border-black/40 hover:scale-110"
                            title="Zoom In"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleScale('down')}
                            className="bg-white p-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-colors
                              border border-black/20 hover:border-black/40 hover:scale-110"
                            title="Zoom Out"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                            </svg>
                          </button>
                          <button
                            onClick={resetImage}
                            className="bg-white p-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-colors
                              border border-black/20 hover:border-black/40 hover:scale-110"
                            title="Reset Image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {selectedFrame && (
                    <img
                      ref={frameRef}
                      src={selectedFrame}
                      alt="Frame Overlay"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                      style={{ zIndex: 15 }}
                    />
                  )}
                </div>
              </div>

              {/* Upload and Save Buttons */}
              <div className="mt-4 flex justify-center gap-4">
                {/* Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold 
                      hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Image
                  </label>
                </div>

                {/* Save Creation Button */}
                {uploadedImage && (
                  <button
                    onClick={handleSaveCreation}
                    disabled={isSaving}
                    className={`px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold 
                      hover:bg-purple-700 transition-colors flex items-center gap-2
                      ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save Creation
                      </>
                    )}
                  </button>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-center mt-4 font-roboto">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MainComponent;