import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { SmartphoneIcon, PhoneIcon, UsersIcon, TagIcon, WalletIcon, LockIcon } from '@site/src/components/Icons';

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
};

/* ── Features ───────────────────────────────────── */
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
