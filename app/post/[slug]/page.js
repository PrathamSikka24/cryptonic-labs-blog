import React from 'react';
import { getPostDetails, getPosts } from '../../../services';
import PostDetail from '../../../components/PostDetail';
import Categories from '../../../components/Categories';
import PostWidget from '../../../components/PostWidget';
import Author from '../../../components/Author';
import Comments from '../../../components/Comments';
import CommentsForm from '../../../components/CommentsForm';

const PostDetails = async ({ params }) => {
  const post = await getPostDetails(params.slug);
  
  if (!post) {
    // If post not found, return a 404
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories.map(cat => cat.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const posts = await getPosts();
  console.log("Generated Slugs:", posts.map(post => post.node.slug));
  return posts.map(post => ({
    slug: post.node.slug,
  }));
}

export default PostDetails;
