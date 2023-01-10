import styles from '../../styles/Login.module.css';

const Signup = () => {
  return (
    <main className={styles.signIn}>
      <form style={{
        margin: '50px 0'
      }}>
        <h1>Please Sign Up</h1>
        <div className="form-floating">
          <input
            id="floatingName"
            type="text"
            className="form-control"
            placeholder="Name"
          />
          <label htmlFor="floatingName">Name</label>
        </div>
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

export default Signup;
