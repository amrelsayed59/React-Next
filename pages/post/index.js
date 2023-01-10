
export const getStaticProps = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/5');
    const data = await response.json();

    return {
        props: {
            post: data || null
        }
    }
}

const Post = ({post}) => {
    return (
        <>
            <h1>Post</h1>
            <h2>By {post.title}</h2>
            <h2>By {post.body}</h2>
        </>
    )
}

export default Post;