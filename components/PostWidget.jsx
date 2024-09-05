import { getRecentPosts, getSimilarPosts } from '../services';
import Link from 'next/link';
import moment from 'moment';

const PostWidget = async ({ categories, slug }) => {
  let relatedPosts = [];

  // Fetch similar posts if slug exists, otherwise fetch recent posts
  if (slug) {
    relatedPosts = await getSimilarPosts(categories, slug);
  } else {
    relatedPosts = await getRecentPosts();
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.length > 0 ? (
        relatedPosts.map((post) => (
          <div key={post.title} className="flex items-center w-full mb-4">
            {/* <div className="w-16 flex-none">
              <Image
                loader={grpahCMSImageLoader}
                alt={post.title}
                height="60px"
                width="60px"
                unoptimized
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </div> */}
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} className="text-md">
                {post.title}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostWidget;
