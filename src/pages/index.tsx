import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/* ── Hero ───────────────────────────────────────── */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          Powerful, developer-friendly APIs for SMS, Voice, and Contact
          management — start sending messages in minutes.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.primaryBtn} to="/docs/api-reference/quick-start">
            Quick Start Guide →
          </Link>
          <Link className={styles.secondaryBtn} to="/docs/api-reference">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ── Stats Bar ──────────────────────────────────── */
function StatsBar() {
  const stats = [
    { number: '6', label: 'API Services' },
    { number: '20+', label: 'Endpoints' },
    { number: 'v1.0', label: 'Stable Release' },
    { number: '60/min', label: 'Rate Limit' },
  ];
  return (
    <section className={styles.statsBar}>
      {stats.map((s, i) => (
        <div key={i} className={styles.statItem}>
          <div className={styles.statNumber}>{s.number}</div>
          <div className={styles.statLabel}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}

/* ── Code Snippet ───────────────────────────────── */
function CodeSnippet() {
  const codeText = [
    '# Send an SMS message',
    'curl -X POST https://api.messaging.example.com/api/v1/sms/send \\',
    '  -H "Authorization: Bearer <token>" \\',
    '  -H "Content-Type: application/json" \\',
    "  -d '{",
    '    "recipients": ["+233547071660"],',
    '    "message": "Hello from Push Messaging API!",',
    '    "sender": "MYAPP"',
    "  }'",
  ].join('\n');

  return (
    <section className={styles.codeSection}>
      <div className={styles.codeSectionInner}>
        <Heading as="h2" className={styles.codeSectionTitle}>
          Send Your First SMS in Seconds
        </Heading>
        <p className={styles.codeSectionSub}>
          A single API call is all it takes to reach your users
        </p>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={`${styles.codeDot} ${styles.codeDotRed}`} />
            <span className={`${styles.codeDot} ${styles.codeDotYellow}`} />
            <span className={`${styles.codeDot} ${styles.codeDotGreen}`} />
            <span className={styles.codeHeaderLabel}>terminal</span>
          </div>
          <div className={styles.codeContent}>
            <pre>
              <code>{codeText}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Use Cases ──────────────────────────────────── */
function UseCases() {
  const cases = [
    {
      icon: '⚡',
      title: 'Transactional Messages',
      desc: 'OTP verification, order confirmations, shipping notifications, and account alerts.',
    },
    {
      icon: '📣',
      title: 'Marketing Campaigns',
      desc: 'Promotional offers, event invitations, newsletter distribution, and product launches.',
    },
    {
      icon: '🔔',
      title: 'Notifications',
      desc: 'Appointment reminders, payment due dates, system alerts, and emergency broadcasts.',
    },
    {
      icon: '🤝',
      title: 'Customer Engagement',
      desc: 'Survey invitations, feedback requests, re-engagement campaigns, and birthday wishes.',
    },
  ];

  return (
    <section className={styles.useCases}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Built for Every Use Case
        </Heading>
        <p className={styles.sectionSub}>
          From transactional alerts to marketing campaigns — we've got you covered
        </p>
        <div className={styles.useCaseGrid}>
          {cases.map((c, i) => (
            <div key={i} className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>{c.icon}</div>
              <Heading as="h3" className={styles.useCaseTitle}>
                {c.title}
              </Heading>
              <p className={styles.useCaseDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bottom CTA ─────────────────────────────────── */
function BottomCta() {
  return (
    <section className={styles.bottomCta}>
      <Heading as="h2" className={styles.bottomCtaTitle}>
        Ready to Start Building?
      </Heading>
      <p className={styles.bottomCtaSub}>
        Get your API keys and send your first message in under 5 minutes.
      </p>
      <Link className={styles.bottomCtaBtn} to="/docs/api-reference/quick-start">
        Get Started Free →
      </Link>
    </section>
  );
}

/* ── Page ────────────────────────────────────────── */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Developer Documentation"
      description="Push Messaging API — powerful developer-friendly APIs for SMS, Voice, and Contact management.">
      <HomepageHeader />
      <StatsBar />
      <main>
        <HomepageFeatures />
        <CodeSnippet />
        <UseCases />
      </main>
      <BottomCta />
    </Layout>
  );
}
