import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PersonCard from '../components/Card';
import jsonData from '../pages/Trial.json';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(jsonData);
  }, []);

  return (
    <>
      <Header />
      <div className='bigDivPosts' >
        {posts.map((post) => (
          <div key={post.id} >
            <PersonCard cl card={post}  />
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
