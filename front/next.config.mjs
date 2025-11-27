import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup dev platform for local development
if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
