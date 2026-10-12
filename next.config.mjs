/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Serve images as-is: the hosting server's glibc is too old for sharp's native binary.
  images: { unoptimized: true },
};

export default nextConfig;
