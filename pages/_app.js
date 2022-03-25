import "../styles/globals.css";
import { CHAINID } from "../constants";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={CHAINID}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
