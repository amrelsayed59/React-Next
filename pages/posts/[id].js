export default function Post1(props) {
  return (
    <>
      <div className="p-3">
      <p>{props.post.title}</p>
      <p>{props.post.body}</p>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_limit=10`
  );

  const data = await response.json();

  const paths = data.map((d) => {
    return {
      params: { id: `${d.id}` },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const data = await response.json();
  return {
    props: {
      post: data,
    },
  };
}

// calling on every context
// export async function getServerSideProps(context) {
//   const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${context.params.id}`);
//   const data = await response.json();
//   return {
//     props: {
//       post: data
//     }
//   }
// }
