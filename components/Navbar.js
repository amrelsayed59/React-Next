import Link from 'next/link';
import styles from '../styles/Navbar.module.css'


export default function Navbar() {
  return (
    <>
      <div className={styles.bg}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </div>
    </>
  );
}
