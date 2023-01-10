import styles from '../../styles/Login.module.css';
import logoImg from '../../public/login.png'

const Login = () => {
  return (
    <main className={styles.signIn}>
      <form>
        <img src="https://novojolt.com/assets/images/auth-illustration.svg" width="300" height="250" alt=""/>
        <h1>Please Sign In</h1>
        <div className="form-floating">
          <input
            id="floatingInput"
            type="email"
            className="form-control"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="form-floating">
          <input
            id="floatingPassword"
            type="password"
            className="form-control"
            placeholder="Password"
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

export default Login;
