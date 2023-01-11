import Link from 'next/link';
import { useStore } from '../client/context';
import styles from '../styles/Navbar.module.css';
import { getValue } from '../utils/common';
import {signOut} from 'next-auth/client'
import { authConstants } from '../client/context/constants';

export default function Navbar() {
  const [state, dispatch] = useStore();
  const user = getValue(state, ['user'], null);
  const authenticated = getValue(state, ['user', 'authenticated'], false);
  console.log('store', state);

  return (
    <>
      {/* <div className={styles.bg}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        {authenticated ? (
          <Link className="navbar-brand" href="/profile">
            {user.name}
          </Link>
        ) : (
          <Link className="navbar-brand" href="/profile">
            Welcome Guest
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/posts" className="nav-link">
                Posts
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {authenticated ? (
              <li className="nav-item active">
                {/* <Link href="/" className="nav-link"> */}
                  <button className="w-100 btn btn-primary" type="button" onClick={() => { 
                   const result = signOut({
                      redirect: false
                    }).then(result => {
                      dispatch({
                        type: authConstants.LOGIN_FAILURE
                      })
                    })
                  }}>
                    Logout
                  </button>
                {/* </Link> */}
              </li>
            ) : (
              <>
                <li className="nav-item active">
                  <Link href="/signup" className="nav-link">
                    <button className="w-100 btn btn-primary" type="submit">
                      Sign up
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className="nav-link">
                    <button className="w-100 btn btn-primary" type="submit">
                      Sign in
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
