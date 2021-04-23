import Menu from "../components/menu/Menu";
import { ProvideAuth } from "../utils/use-auth.js";
import NProgress from "nprogress";
import Router from "next/router";
import Footer from "../components/footer/Footer";

import "../styles/globals.css";
import "../styles/react-mde/react-mde-all.scss";
import "katex/dist/katex.min.css";
import "../styles/nprogress.css";
import "../styles/autosuggest.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Menu />
      <Component {...pageProps} />
      <Footer />
    </ProvideAuth>
  );
}

export default MyApp;
