/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/clients',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
