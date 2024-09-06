import React from 'react';
import { getPosts, getPostDetails } from '../../../services'; // Adjust the import path based on your structure
import PostDetail from '../../../components/PostDetail'; // PostDetail component
import Categories from '../../../components/Categories'; // Categories component
import PostWidget from '../../../components/PostWidget'; // PostWidget component
import Author from '../../../components/Author'; // Author component
import Comments from '../../../components/Comments'; // Comments component
import CommentsForm from '../../../components/CommentsForm'; // CommentsForm component

const PostDetails = async () => {

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Section */}
        <div className="col-span-1 lg:col-span-8">
          <PostDetail />
          <Author />
          <CommentsForm />
          <Comments />
        </div>
        
        {/* Sidebar Section */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>

      </div>
    </div>
  );
};



export default PostDetails;
