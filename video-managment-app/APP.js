import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

const defaultVideos = [
  { id: 1, title: "React Tutorial", desc: "Learn React from scratch!", thumb: "https://img.youtube.com/vi/Ke90Tje7VS0/0.jpg" },
  { id: 2, title: "JavaScript Basics", desc: "Understanding JS fundamentals", thumb: "https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg" },
  { id: 3, title: "CSS Grid Crash Course", desc: "Master CSS Grid in 20 minutes", thumb: "https://img.youtube.com/vi/jV8B24rSN5o/0.jpg" },
  { id: 4, title: "Flexbox Explained", desc: "A complete guide to Flexbox", thumb: "https://img.youtube.com/vi/fYq5PXgSsbE/0.jpg" },
  { id: 5, title: "Node.js Tutorial", desc: "Build backend with Node.js", thumb: "https://img.youtube.com/vi/TlB_eWDSMt4/0.jpg" },
  { id: 6, title: "MongoDB for Beginners", desc: "Learn NoSQL database MongoDB", thumb: "https://img.youtube.com/vi/Www3GcZqH74/0.jpg" },
  { id: 7, title: "React Router Explained", desc: "How to use React Router", thumb: "https://img.youtube.com/vi/Ul3y1LXxzdU/0.jpg" },
  { id: 8, title: "Next.js Guide", desc: "Understanding Next.js features", thumb: "https://img.youtube.com/vi/Sklc_fQBmcs/0.jpg" },
  { id: 9, title: "TypeScript Crash Course", desc: "Introduction to TypeScript", thumb: "https://img.youtube.com/vi/BwuLxPH8IDs/0.jpg" },
  { id: 10, title: "GraphQL Basics", desc: "Learn GraphQL step by step", thumb: "https://img.youtube.com/vi/ed8SzALpx1Q/0.jpg" },
];

const getStoredVideos = () => {
  const storedVideos = JSON.parse(localStorage.getItem("videos"));
  return storedVideos && storedVideos.length > 0 ? storedVideos : defaultVideos;
};

const VideoManager = () => {
  const [videos, setVideos] = useState(getStoredVideos);
  const [newVideo, setNewVideo] = useState({ title: "", desc: "", thumb: "" });

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  const addVideo = () => {
    if (!newVideo.title || !newVideo.desc || !newVideo.thumb) {
      return;
    }
    const updatedVideos = [...videos, { ...newVideo, id: Date.now() }];
    setVideos(updatedVideos);
    setNewVideo({ title: "", desc: "", thumb: "" });
  };

  const deleteVideo = (id) => {
    setVideos(videos.filter((vid) => vid.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">🎬 Video Management App</h1>
      <div className="video-list">
        {videos.map((v) => (
          <div key={v.id} className="video-card">
            <Link to={`/video/${v.id}`}>
              <img src={v.thumb} alt={v.title} className="thumbnail" />
            </Link>
            <div>
              <h2 className="video-title">{v.title}</h2>
              <p className="video-desc">{v.desc}</p>
              <button onClick={() => deleteVideo(v.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-video-form">
        <h2>Add New Video</h2>
        <input
          placeholder="Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          className="input"
        />
        <input
          placeholder="Description"
          value={newVideo.desc}
          onChange={(e) => setNewVideo({ ...newVideo, desc: e.target.value })}
          className="input"
        />
        <input
          placeholder="Thumbnail URL"
          value={newVideo.thumb}
          onChange={(e) => setNewVideo({ ...newVideo, thumb: e.target.value })}
          className="input"
        />
        <button onClick={addVideo} className="add-btn">Add Video</button>
      </div>
    </div>
  );
};

const VideoDetails = () => {
  const { id } = useParams();
  const videos = getStoredVideos();
  const video = videos.find((v) => v.id === parseInt(id));

  if (!video) return <h2>Video not found!</h2>;

  return (
    <div className="container">
      <h1 className="title">{video.title}</h1>
      <img src={video.thumb} alt={video.title} className="full-thumbnail" />
      <p className="thumbnail-description">{video.desc}</p>
      <Link to="/" className="back-link">← </Link>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoManager />} />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </Router>
  );
}
