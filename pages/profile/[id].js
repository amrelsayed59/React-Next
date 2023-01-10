import styles from '../../styles/Login.module.css';

export const getServerSideProps = async ({ query }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const data = await response.json();

  return {
    props: {
      user: data || null,
    },
  };
};

const Profile = ({ user }) => {

  if (!Object.keys(user).length) {
    return <div>Invalid User Id</div>
  }

  return (
    <div className="container">
      {user.name} <br />
      {user.email}
    </div>
  );
};

export default Profile;
