const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const baseUrl = "";

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  exportTrailingSlash: true,
  trailingSlash: true,
  basePath: baseUrl,
  env: {
    baseUrl: baseUrl,
  },
});

// next.config.js
module.exports = withCss(
  withPurgeCss({
    purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
    purgeCss: {
      whitelist: ["html", "body"],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html", "js", "css", "tsx"],
        },
      ],
    },
  })
);