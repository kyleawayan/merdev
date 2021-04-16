import "../styles/globals.css";
import "../styles/react-mde/react-mde-all.scss";
import "katex/dist/katex.min.css";
import Menu from "../components/menu/Menu";
import { ProvideAuth } from "../utils/use-auth.js";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Menu />
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
