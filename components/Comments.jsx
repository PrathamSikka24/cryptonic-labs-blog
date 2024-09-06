import React from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const comments = await getComments(slug);

  return {
    props: { comments }, // will be passed to the page component as props
  };
};

const Comments = ({ comments }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {comments.length} Comments
      </h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4"> {/* Assuming each comment has a unique `id` */}
            <p className="mb-4">
              <span className="font-semibold">{comment.name}</span> on{' '}
              {moment(comment.createdAt).format('MMM DD, YYYY')}
            </p>
            <p className="whitespace-pre-line text-gray-600 w-full">
              {parse(comment.comment)}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default Comments;
