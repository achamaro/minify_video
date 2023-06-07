/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.npm_lifecycle_event === "dev") {
  nextConfig.headers = async () => {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  };
} else {
  nextConfig.output = "export";
}

module.exports = nextConfig;
