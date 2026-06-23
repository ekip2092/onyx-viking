/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy bare-slug city pages -> canonical /sub-zero-repair-{slug} form.
      { source: "/encino", destination: "/sub-zero-repair-encino", permanent: true },
      { source: "/porter-ranch", destination: "/sub-zero-repair-porter-ranch", permanent: true },
      { source: "/calabasas", destination: "/sub-zero-repair-calabasas", permanent: true },
      // Legacy neighborhood pages not in the city set -> the hub.
      { source: "/west-hills", destination: "/cities-we-serve", permanent: true },
      { source: "/northridge", destination: "/cities-we-serve", permanent: true },
    ];
  },
};

export default nextConfig;
