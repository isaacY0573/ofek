import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPost';
import EditPostPage from './pages/EditPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPostPage />} />
        <Route path="/edit" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
