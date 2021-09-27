import { useUser } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import CreateRoomForm from '../components/CreateRoomForm'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>Cebula poker!</title>
        <meta name="description" content="Poor man's planning poker." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isLoading && <div>Loading...</div>}

        {!user && !isLoading && (
          <>
            <h1 className={styles.title}>
              Welcome to <a href="https://media.istockphoto.com/photos/onion-bulbs-picture-id513920379" target="_blank" rel="noreferrer">Planning Poker!</a>
            </h1>

            <p className={styles.description}>
              Get started by logging in with your CK Source email address.
            </p>

            <div className={styles.grid}>
              <Link href="/login">
                <a className={styles.card}>
                  <h2>Log in &rarr;</h2>
                  <p>Only emails from <code className={styles.code}>cksource.com</code> domain are allowed</p>
                </a>
              </Link>
            </div>
          </>
        )}

        {user && !isLoading && (
          <div>
            <CreateRoomForm user={user} />
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
