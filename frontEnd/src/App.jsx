import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';

const App = () => {
  return (
<<<<<<< HEAD
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
=======
    <div>
      <Button variant="text">Text</Button>
    </div>
  )
>>>>>>> d1a5cbae3f0405d6ae077b6787ca7ab60712b4b9
}

export default App;
