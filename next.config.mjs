/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/clients',
            permanent: false,
          },
        ]
      },
};

export default nextConfig;
