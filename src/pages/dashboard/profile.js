// The profile overview now lives on /dashboard (see components/dashboard-home.jsx).
// Keep this route working for old links and bookmarks.
export async function getServerSideProps() {
  return { redirect: { destination: "/dashboard", permanent: false } };
}

export default function ProfileRedirect() {
  return null;
}
