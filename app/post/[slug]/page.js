import React from 'react';
import { getPostDetails, getPosts } from '../../../services';  // Ensure correct imports
import PostDetail from '../../../components/PostDetail';  // Import PostDetail component
import Categories from '../../../components/Categories';
import PostWidget from '../../../components/PostWidget';
import Author from '../../../components/Author';
import Comments from '../../../components/Comments';
import CommentsForm from '../../../components/CommentsForm';

const PostDetails = async ({ params }) => {
  const post = await getPostDetails(params.slug);  // Fetch post details dynamically

  if (!post) {
    // If no post is found, return an error message
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />  {/* Render PostDetail */}
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.category.slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({
    slug: post.node.slug,
  }));
}

export default PostDetails;
