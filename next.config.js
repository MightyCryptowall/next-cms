const path = require("path");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    disableStaticImages: true,
    domains: ["i.picsum.photos/", "sbn-bucket.s3.ap-south-1.amazonaws.com", "picsum.photos", "sbn-mm-test-bucket.s3.amazonaws.com", "sbn-mm-test.s3.amazonaws.com"],
    formats: ["image/webp"],
  },
  sassOptions: {
    includePaths: ["./src"],
    prependData: `
      @import "~assets/styles/definitions.scss"; 
    `,
  } 
};

module.exports = nextConfig;
