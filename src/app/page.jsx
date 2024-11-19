"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const { useState, useCallback } = React;
  const [activeTab, setActiveTab] = useState("frames");
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [upload, { loading }] = useUpload();

  const handleImageUpload = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { url, mimeType, error } = await upload({ file });
      if (error) {
        setError(error);
        return;
      }
      if (mimeType.startsWith("image/")) {
        setSelectedImage(url);
      }
    }
  };

  const frames = [
    {
      id: 1,
      name: "Red Birthday",
      src: "https://www.loonapix.com/img/frame/screen/RedBirthdayFrame-1690728275.png",
      type: "frame",
    },
    {
      id: 2,
      name: "Pink Birthday",
      src: "https://www.loonapix.com/img/frame/screen/PinkBirthdayFrame-1690728151.png",
      type: "frame",
    },
    {
      id: 3,
      name: "Gold Frame",
      src: "https://www.loonapix.com/img/frame/screen/GoldFrame-1690728355.png",
      type: "frame",
    },
    {
      id: 4,
      name: "Party Frame",
      src: "https://www.loonapix.com/img/frame/screen/PartyFrame-1690728422.png",
      type: "frame",
    },
    {
      id: 5,
      name: "Balloon Frame",
      src: "https://www.loonapix.com/img/frame/screen/BalloonFrame-1690728499.png",
      type: "frame",
    },
    {
      id: 6,
      name: "Confetti Frame",
      src: "https://www.loonapix.com/img/frame/screen/ConfettiFrame-1690728566.png",
      type: "frame",
    },
  ];

  const videoTemplates = [
    { id: 1, name: "Slideshow", src: "/videos/slideshow.mp4", type: "video" },
    {
      id: 2,
      name: "Celebration",
      src: "/videos/celebration.mp4",
      type: "video",
    },
  ];

  const [showAllFrames, setShowAllFrames] = useState(false);

  const initialFrames = frames.slice(0, 4);
  const visibleFrames = showAllFrames ? frames : initialFrames;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <div className="max-w-4xl mx-auto p-4">
        <header className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 font-dancing mb-2">
            Birthday Creator
          </h1>
          <p className="text-gray-600 font-roboto">
            Create beautiful birthday memories
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("frames")}
              className={`flex-1 py-3 px-6 rounded-lg font-roboto ${
                activeTab === "frames"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <i className="fas fa-image mr-2"></i>
              Frames
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`flex-1 py-3 px-6 rounded-lg font-roboto ${
                activeTab === "video"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <i className="fas fa-video mr-2"></i>
              Video
            </button>
          </div>

          <div className="space-y-4">
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 font-roboto">
                {activeTab === "frames"
                  ? "Choose a Frame"
                  : "Choose a Template"}
              </h3>

              <div className="relative">
                <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                  {activeTab === "frames" &&
                    visibleFrames.map((frame) => (
                      <div
                        key={frame.id}
                        onClick={() => setSelectedImage(frame.src)}
                        className="flex-shrink-0 w-64 aspect-square rounded-lg overflow-hidden border-2 border-purple-200 hover:border-purple-600 cursor-pointer"
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={frame.src}
                            alt={`${frame.name} template`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <p className="absolute bottom-0 left-0 right-0 text-center py-2 bg-white font-roboto text-sm">
                            {frame.name}
                          </p>
                        </div>
                      </div>
                    ))}

                  {!showAllFrames && activeTab === "frames" && frames.length > 4 && (
                    <button
                      onClick={() => setShowAllFrames(true)}
                      className="flex-shrink-0 w-64 aspect-square rounded-lg border-2 border-purple-200 hover:border-purple-600 cursor-pointer flex items-center justify-center bg-gray-50"
                    >
                      <div className="text-center">
                        <span className="block text-purple-600 font-semibold">See More</span>
                        <span className="text-gray-500 text-sm">{frames.length - 4} more items</span>
                      </div>
                    </button>
                  )}

                  {activeTab === "video" &&
                    videoTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedImage(template.src)}
                        className="flex-shrink-0 w-64 aspect-square rounded-lg overflow-hidden border-2 border-purple-200 hover:border-purple-600 cursor-pointer"
                      >
                        <div className="relative w-full h-full">
                          <video
                            src={template.src}
                            className="absolute inset-0 w-full h-full object-cover"
                            muted
                            loop
                            onMouseOver={(e) => e.target.play()}
                            onMouseOut={(e) => e.target.pause()}
                          />
                          <p className="absolute bottom-0 left-0 right-0 text-center py-2 bg-white font-roboto text-sm">
                            {template.name}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Uploaded Image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {selectedImage && (
                  <img
                    src={
                      frames.find((frame) => frame.src === selectedImage)?.src ||
                      visibleFrames[0].src
                    }
                    alt="Frame Overlay"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ zIndex: 10 }}
                  />
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                  name="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <i className="fas fa-cloud-upload-alt text-4xl text-purple-500 mb-4"></i>
                  <p className="font-roboto text-gray-600">
                    {loading ? "Uploading..." : "Tap to upload your image"}
                  </p>
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-center font-roboto">
                  {error}
                </div>
              )}

              <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-roboto hover:bg-purple-700">
                <i className="fas fa-download mr-2"></i>
                Save Creation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;