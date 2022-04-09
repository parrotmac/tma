import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tell Me About...</title>
        <meta name="description" content="Handy Multi-Tool For Inspecting Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav>
          <a href="/">Home</a>
          <a href="/examples">Examples</a>
          <a href="/download">Download</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
        </nav>
        <div className={styles.accountActions}>
          <a className={styles.signin} href="/login">Sign In</a>
          <a className={styles.signup} href="/login">Sign Up</a>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://tma.ware.dev">TMA!</a>
        </h1>

        <p className={styles.description}>
          TMA (Tell Me About...) is a handy tool for inspecting resources.
        </p>

        <div className={styles.grid}>
          <a href="/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about the TMA Tool</p>
          </a>

          <a href="/pricing" className={styles.card}>
            <h2>Pricing &rarr;</h2>
            <p>See plans to enable advanced features.</p>
          </a>

          <a
            href="/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Get started quick with inspiring examples</p>
          </a>

          <a
            href="/download"
            className={styles.card}
          >
            <h2>Download &rarr;</h2>
            <p>
              Download TMA to get started.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>
          Made with &lt;3 by <a href="https://github.com/parrotmac" target={'_blank'} rel={'noreferrer noopener'}>@parrotmac</a>
        </span>
      </footer>
    </div>
  )
}

export default Home
