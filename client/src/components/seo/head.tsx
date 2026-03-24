import { Helmet, HelmetData } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

const helmetData = new HelmetData({});

const BASE_URL = "https://battlepad.app";
const APP_NAME = "BattlePad";
const DEFAULT_DESCRIPTION = "Your digital battle companion for Warhammer 40k. Optimized for tablets. Track victory points, manage command points, navigate phases, and execute stratagems for any game size—from Combat Patrol to Full Scale battles.";

export const Head = ({
  title = "",
  description = DEFAULT_DESCRIPTION,
  noIndex = false,
}: HeadProps = {}) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : BASE_URL;
  
  return (
    <Helmet
      helmetData={helmetData}
      defaultTitle={APP_NAME}
    >
      {/* Title */}
      <title>{fullTitle}</title>
      
      {/* Primary Meta */}
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${BASE_URL}/og-image.png`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": APP_NAME,
          "description": description,
          "url": BASE_URL,
          "applicationCategory": "GameApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "42"
          }
        })}
      </script>
    </Helmet>
  );
};
