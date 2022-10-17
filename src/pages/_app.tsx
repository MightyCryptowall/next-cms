import "styles/globals.scss";
import "styles/wysiwyg.scss";
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
