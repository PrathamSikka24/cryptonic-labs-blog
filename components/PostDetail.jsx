import React from 'react';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import Comments from './Comments';
import CommentsForm from './CommentsForm';

const PostDetail = ({ post }) => {
  // Assuming getContentFragment function is defined elsewhere in your file

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt || 'Default description...'} />
      </Head>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        {/* Existing content rendering logic */}
        <Comments slug={post.slug} />
        <CommentsForm slug={post.slug} />
      </div>
    </>
  );
};

export default PostDetail;
