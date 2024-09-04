import { request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = `
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    };

    const result = await request(graphqlAPI, query, {}, headers);
    
    // Log the result to see if we are getting data back
    console.log('GraphQL response:', result);

    return result.postsConnection.edges;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
