import Head from "next/head";

const SITE_NAME = "KIK QRcard";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kikqrcard.netlify.app";
const DEFAULT_DESCRIPTION =
  "Create digital QR-based business cards with KIK QRcard. Share your contact, portfolio, and business info instantly — no apps or paper needed.";
const DEFAULT_IMAGE = `${SITE_URL}/intro.jpg`;

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Digital QR Business Cards`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}

export default Seo;
