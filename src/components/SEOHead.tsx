import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  jsonLd?: object | object[];
}

const DEFAULT_TITLE = 'DentiPay | The Future of Dental Financing';
const DEFAULT_DESCRIPTION = 'AI-powered dental financing solutions that increase case acceptance for providers and make dental care accessible for patients. Get approved in minutes with our intelligent financing platform.';
const DEFAULT_OG_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/7htnnBxzcGZ3G73QD6Po4YJWzEp1/social-images/social-1765340203483-full_logo_dentipay.png';
const SITE_URL = 'https://mydentipay.com';

export const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | DentiPay` : DEFAULT_TITLE;
  const canonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="DentiPay" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DentiPay',
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  description: 'AI-powered dental financing platform revolutionizing healthcare finance.',
  sameAs: [
    'https://www.linkedin.com/company/dentipay',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish'],
  },
};

// WebSite Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DentiPay',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/provider-search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Service Schema for Dental Financing
export const dentalFinancingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'DentiPay Dental Financing',
  description: 'AI-powered dental financing with instant approvals, flexible payment plans, and 94% approval rates.',
  provider: {
    '@type': 'Organization',
    name: 'DentiPay',
  },
  serviceType: 'Dental Financing',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dental Financing Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Patient Financing',
          description: 'Flexible payment plans for dental procedures with instant approval decisions.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Provider Solutions',
          description: 'AI-powered financing platform for dental practices to increase case acceptance.',
        },
      },
    ],
  },
};

// FAQ Schema helper
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
