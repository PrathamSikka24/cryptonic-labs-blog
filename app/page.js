import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';

export default async function Home() {
  // Fetch posts directly inside the component using an async function
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Posts Section */}
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
        </div>

        {/* Widgets Section */}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
