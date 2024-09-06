import React from 'react';
import Link from 'next/link';
import { getRecentPosts } from '../services';

const RecentPosts = async () => {
  const posts = await getRecentPosts();

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Recent Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}`}>
            <div className="flex items-center w-full mb-4">
              <div className="w-16 flex-none">
                <p className="text-gray-500 text-xs">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-700 font-semibold">{post.title}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No recent posts available</p>
      )}
    </div>
  );
};

export default RecentPosts;
