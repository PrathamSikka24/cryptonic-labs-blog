// app/page.js

import React from 'react';
import { getPosts } from '../services'; // Adjust the path to services if necessary
import PostCard from '../components/PostCard'; // Make sure PostCard is correctly imported

const Home = async () => {
  const posts = await getPosts();

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
