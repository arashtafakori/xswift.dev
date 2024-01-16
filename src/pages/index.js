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
      title={`Implement a backend dotnet service by ${siteConfig.title}`}
      description="Implement a scalable and testable backend dotnet service based on Domain-driven design, test-driven development, and clean architecture approaches quickly">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
