/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy bare-slug city pages -> canonical /viking-repair-{slug} form.
      { source: "/encino", destination: "/viking-repair-encino", permanent: true },
      { source: "/porter-ranch", destination: "/viking-repair-porter-ranch", permanent: true },
      { source: "/calabasas", destination: "/viking-repair-calabasas", permanent: true },
      // Legacy neighborhood pages not in the city set -> the hub.
      { source: "/west-hills", destination: "/cities-we-serve", permanent: true },
      { source: "/northridge", destination: "/cities-we-serve", permanent: true },
    ];
  },
};

export default nextConfig;
