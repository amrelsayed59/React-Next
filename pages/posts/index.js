import Head from 'next/head';
import Link from 'next/link';

export default function Posts(props) {
  return (
    <div>
      <Head>
        <title>Posts Comp</title>
        <meta name="description" content="posts component" />
      </Head>
      {props.posts.map((post) => (
        <div  key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </div>
      ))}
      Posts Component
    </div>
  );
}

export async function getStaticProps() {
  const request = await fetch(
    'http://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const data = await request.json();
  return {
    props: {
      posts: data,
    },
  };
}

// getStaticProps
// getStaticPath /posts/1
// getServerSideProps
