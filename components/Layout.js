import { getSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useStore } from '../client/context';
import { authConstants } from '../client/context/constants';
import { getValue } from '../utils/common';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const [state, dispatch] = useStore();

  useEffect(() => {
    const isAuth = async () => {
      const authenticated = getValue(state, ['user', 'authenticated'], false);
      if (!authenticated) {
        console.log('Layout', authenticated);
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const session = await getSession();
        if (session) {
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: session,
          });
        } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: session,
          });
        }
      }
    };
    isAuth();
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
