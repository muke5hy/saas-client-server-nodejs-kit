import React from "react";

import { AppProps } from "next/app";

import "../styles/main.css";
import "../styles/prism-a11y-dark.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
