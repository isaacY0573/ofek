import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/edit" element={<EditPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
