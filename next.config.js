/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "images.unsplash.com"],
  },
  i18n,
};
