import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
};

export const getPosts = async () => {
    const query = gql`
      query GetPosts {
        posts {
          title
          slug
          excerpt
          featuredImage {
            url
          }
          author {
            name
            photo {
              url
            }
          }
          createdAt
          category {
            name
            slug
          }
        }
      }
    `;
  
    try {
      const result = await request(graphqlAPI, query, {}, headers);
      return result.posts; // Directly return the posts array
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  
// Fetch recent posts (latest 3 posts)
export const getRecentPosts = async () => {
    const query = gql`
      query GetRecentPosts {
        posts(orderBy: createdAt_DESC, first: 3) {
          title
          slug
          createdAt
        }
      }
    `;
  
    try {
      const headers = {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      };
      const result = await request(graphqlAPI, query, {}, headers);
      console.log("Fetched recent posts:", result.posts);
      return result.posts;
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      return [];
    }
  };

// Fetch similar posts based on slug and categories
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
        first: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const variables = { slug, categories };
    const result = await request(graphqlAPI, query, variables, headers);
    return result.posts;
  } catch (error) {
    console.error("Error fetching similar posts:", error);
    return [];
  }
};

export const getComments = async (slug) => {
    const query = gql`
      query GetComments($slug: String!) {
        comments(where: { post: { slug: $slug } }) {
          name
          createdAt
          comment
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
    return result.comments;
  };
  
  export const submitComment = async (commentData) => {
    const mutation = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) {
          id
        }
      }
    `;
  
    const result = await request(graphqlAPI, mutation, commentData);
    return result;
  };
  


  export const getCategories = async () => {
    const query = gql`
      query GetCategories {
        categories {  // Use plural 'categories' here based on the schema
          name
          slug
        }
      }
    `;
  
    try {
      const result = await request(graphqlAPI, query, {}, headers);
      console.log("Full Categories API response:", result);
      return result.categories;  // Return 'categories' (plural)
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  
  
  

  export const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug: String!) {
        post(where: { slug: $slug }) {
          title
          content {
            raw
          }
          featuredImage {
            url
          }
          author {
            name
            bio
            photo {
              url
            }
          }
          createdAt
          category {
            name
            slug
          }
        }
      }
    `;
  
    try {
      const result = await request(graphqlAPI, query, { slug });
      return result.post;
    } catch (error) {
      console.error("Error fetching post details:", error);
      return null;
    }
  };
  