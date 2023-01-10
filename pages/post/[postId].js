import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          postId: '5',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  return {
    props: {
      post: data || null,
    },
    revalidate: 3,
  };
};

const PostDetails = ({ post }) => {
  const router = useRouter();
  // const {postId} = router.query

  if (router.isFallback) {
    return <h1>Loading...!</h1>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;
