import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
};

/* ── Icons ───────────────────────────────────────── */
const SmartphoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
    <path d="M12 18h.01"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const TagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l8.58-8.58a1 1 0 0 0 0-1.42L12 2z"></path>
    <path d="M7 7h.01"></path>
  </svg>
);

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const FeatureList: FeatureItem[] = [
  {
    icon: <SmartphoneIcon />,
    title: 'SMS Messaging',
    description:
      'Send, schedule, and track delivery of text messages worldwide. Supports individual, bulk, and group messaging with real-time status tracking.',
    link: '/docs/api-reference/sms',
    linkLabel: 'SMS docs →',
  },
  {
    icon: <PhoneIcon />,
    title: 'Voice Calls',
    description:
      'Make automated voice calls with pre-recorded audio messages. Upload audio files, schedule calls, and reach entire contact groups.',
    link: '/docs/api-reference/voice',
    linkLabel: 'Voice docs →',
  },
  {
    icon: <UsersIcon />,
    title: 'Contact Management',
    description:
      'Organize your recipients into manageable groups for bulk messaging. Upload contacts via CSV or Excel and manage groups effortlessly.',
    link: '/docs/api-reference/contacts',
    linkLabel: 'Contacts docs →',
  },
  {
    icon: <TagIcon />,
    title: 'Sender ID',
    description:
      'Register and manage branded sender identities for your messages. Establish trust with your audience through recognizable sender names.',
    link: '/docs/api-reference/sender-id',
    linkLabel: 'Sender ID docs →',
  },
  {
    icon: <WalletIcon />,
    title: 'Balance & Billing',
    description:
      'Monitor your account balance, top up funds, and view transaction history. Get cost estimates before sending at scale.',
    link: '/docs/api-reference/balance',
    linkLabel: 'Balance docs →',
  },
  {
    icon: <LockIcon />,
    title: 'Authentication',
    description:
      'Secure API key management with Bearer token authentication. Generate credentials, manage access, and follow security best practices.',
    link: '/docs/api-reference/authentication',
    linkLabel: 'Auth docs →',
  },
];

function Feature({ icon, title, description, link, linkLabel }: FeatureItem) {
  return (
    <Link to={link} className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDesc}>{description}</p>
      <span className={styles.featureLink}>{linkLabel}</span>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Everything You Need to Communicate
        </Heading>
        <p className={styles.sectionSub}>
          A comprehensive suite of APIs for every messaging channel
        </p>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
