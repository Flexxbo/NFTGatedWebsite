import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useClaimNFT,
  useNetwork,
  useNetworkMismatch,
  useUser,
  useLogin,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

import { ChainId } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";

export default function Login() {
  //Wallet & Network Information
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // Hooks to ensure user is on the right network
  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();

  // For user to claim an NFT to then view the restricted content
  const editionDropContract = useEditionDrop(
    "here goes your NFT Drop contract address" //replace with contract address
  );

  // Hook to claim NFTs from the NFT drop (to allow users to claim and *then* view the restricted content)
  const { mutate: claimNFT, isLoading: isClaiming } =
    useClaimNFT(editionDropContract);

  const login = useLogin(); //Sign in
  const { user } = useUser(); // Get current user (unused on this page)
  return (
    <div className={styles.container}>
      {address ? (
        <>
          <p>Welcome, {address.slice(0, 6)}...</p>
          <button
            className={styles.mainButton}
            style={{ width: 256 }}
            onClick={login}
          >
            {" "}
            Sign In
          </button>
          <p>
            For demo purposes you can claim an NFT from our collection below:
          </p>

          <button
            className={styles.secondaryButton}
            onClick={() => {
              if (networkMismatch) {
                switchNetwork(ChainID.Mumbai);
                return;
              }
              claimNft({
                quantity: 1,
                tokenId: 0,
                to: address,
              });
            }}
          >
            {!isClaiming ? "Claim An NFT" : "Claiming"}
          </button>
        </>
      ) : (
        <>
          <button
            className={styles.mainButton}
            style={{ width: "fit-content", paddingRoght: 16, paddingLeft: 16 }}
            onClick={() => connectWithMetamask()}
          >
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
}
