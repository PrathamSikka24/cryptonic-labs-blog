import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
  // Helper function to render different types of content fragments
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }
      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }
      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="mb-8 w-full rounded-lg"
          />
        );
      case 'bulleted-list':
        return (
          <ul key={index} className="list-disc pl-5 mb-4">
            {modifiedText.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="pl-4 border-l-4 border-gray-400 italic mb-4">
            {modifiedText.map((item, i) => <p key={i}>{item}</p>)}
          </blockquote>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      
      {/* Handle the featured image */}
      {Array.isArray(post.featuredImage) ? (
        post.featuredImage.length > 0 && (
          <div className="relative overflow-hidden shadow-md mb-6">
            <img
              src={post.featuredImage[0].url}  // Access the first image in the array
              alt={post.title}
              className="object-top w-full h-[500px] object-cover shadow-lg rounded-t-lg lg:rounded-lg"
            />
          </div>
        )
      ) : (
        post.featuredImage && (
          <div className="relative overflow-hidden shadow-md mb-6">
            <img
              src={post.featuredImage.url}  // Access image if it's an object
              alt={post.title}
              className="object-top w-full h-[500px] object-cover shadow-lg rounded-t-lg lg:rounded-lg"
            />
          </div>
        )
      )}

      <div className="px-4 lg:px-0">
        {/* Author and Date Info */}
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              alt={post.author.name}
              height="30px"
              width="30px"
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

        {/* Render the blog content */}
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
