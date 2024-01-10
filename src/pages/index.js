import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container" >
        <Heading as="h1" className="hero__title">
          XSwift
        </Heading>
        <p className="hero__subtitle">XSwift is an open-source and lightweight library to develop a Backend service based on DDD and BDD approaches by DotNet Core .</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview">
            Overview
          </Link>
        </div>
        <br />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorial/get-started">
            XSwift Tutorial - 60min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const centeredDivStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div style={centeredDivStyle}>
        the art pictures in this page have been&nbsp;<a href="http://www.freepik.com">Designed by vectorjuice / Freepik</a>
        </div>
      </main>
    </Layout>
  );
}
