import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { domainName } from "../const/details";
import { AppProps } from "next/app";
require("dotenv").config();

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      authConfig={{
        authUrl: "/api/auth",
        domain: "example.org",
        loginRedirect: "/",
      }}
    >
      <Head>
        <title>NFT Gated Website</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Learn how to use the thirdweb Auth SDK to create an NFT Gated Website'
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
