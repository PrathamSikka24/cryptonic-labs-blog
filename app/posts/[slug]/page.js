import { getPosts, getPostDetails } from '../../../services';  // Import the necessary functions

export default async function PostDetails({ params }) {
  // Fetch the post details based on the slug from params
  const post = await getPostDetails(params.slug);

  return (
    <div className="container mx-auto px-10 mb-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
      {/* Render other post details like author, date, etc. */}
    </div>
  );
}

// Generate static params for the dynamic routes
export async function generateStaticParams() {
  const posts = await getPosts();  // Fetch all posts

  return posts.map((post) => ({
    slug: post.node.slug,  // Use the slug for dynamic routing
  }));
}
