import styles from '../../styles/Login.module.css';
import { useState } from 'react';
import {signIn, getSession} from 'next-auth/client';
import {useRouter} from 'next/router'
import { useStore } from '../../client/context';
import { authConstants } from '../../client/context/constants';
import { getValue } from '../../utils/common';
import Loader from '../../components/Loader';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state, dispatch] = useStore();
  const user = getValue(state, ['user'], null);

  const loginHandler = async (e) => {
    e.preventDefault();
    const payload = {email, password, errorMessage, setErrorMessage};
    dispatch({
      type: authConstants.LOGIN_REQUEST
    })
    const result = await signIn("credentials", {...payload, redirect: false})
    console.log({result})
    if (!result.error) {
      const session = await getSession();
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: session
      })
      console.log('====',{result})
      router.replace(`/`);
    }else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: result.error
      })
      setErrorMessage(result.error)
    }
    const session = await getSession();
    console.log({session})
  }

  if (user && user.authenticating) {
    return <Loader/>
  }

  if (user && user.authenticated) {
    router.replace(`/`);
    return null;
  }

  return (
    <main className={styles.signIn}>
      <form onSubmit={loginHandler}>
        <img src="https://novojolt.com/assets/images/auth-illustration.svg" width="300" height="250" alt=""/>
        <h1>Please Sign In</h1>
        {errorMessage && (
          <p style={{ textTransform: 'capitalize', color: 'red' }}>
            {errorMessage}
          </p>
        )}
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
          Login
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    </main>
  );
};

export default Login;
