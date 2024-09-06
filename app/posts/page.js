import { getPosts } from '../services';  // Fetch posts from your service
import PostCard from '../components/PostCard';  // Import necessary components
import PostWidget from '../components/PostWidget';  // Import PostWidget
import Categories from '../components/Categories';  // Import Categories

// Server-side component for fetching posts
export default async function Home() {
  // Fetch posts directly within the component using async/await
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-10 mb-8">
      {/* Featured Posts Section */}

      {/* Main Content and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Posts Section */}
        <div className="lg:col-span-8 col-span-1">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.node.slug} post={post.node} />  // Use slug as a unique key
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />  {/* Widget for recent or related posts */}
            <Categories />  {/* List of categories */}
          </div>
        </div>
      </div>
    </div>
  );
}