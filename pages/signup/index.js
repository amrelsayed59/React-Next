import { useState } from 'react';
import { signup } from '../../client/request';
import styles from '../../styles/Login.module.css';
import { useRouter } from 'next/router';
import { useStore } from '../../client/context';
import { getValue } from '../../utils/common';
import Loader from '../../components/Loader';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state, ] = useStore();
  const user = getValue(state, ['user'], null);

  const signupHandler = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };
    const result = await signup(payload);
    if (result.hasError) {
      setErrorMessage(result.errorMessage);
    } else {
      setErrorMessage(null);
      setName('');
      setEmail('');
      setPassword('');
      router.replace(`/login`);
    }
  };

  if (user && user.authenticating) {
    return <Loader/>
  }

  if (user && user.authenticated) {
    router.replace(`/`);
    return null;
  }

  return (
    <main className={styles.signIn}>
      <form
        style={{
          margin: '50px 0',
        }}
        onSubmit={signupHandler}
      >
        <h1>Please Sign Up</h1>
        {errorMessage && (
          <p style={{ textTransform: 'capitalize', color: 'red' }}>
            {errorMessage}
          </p>
        )}
        <div className="form-floating">
          <input
            id="floatingName"
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="floatingName">Name</label>
        </div>
        <div className="form-floating">
          <input
            id="floatingInput"
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="form-floating">
          <input
            id="floatingPassword"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    </main>
  );
};

// export const getServerSideProps = (ctx) => {
//   //ctx provides req object and req object provides cookie and cooke provides
// }

export default Signup;
