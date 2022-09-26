import React from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLogout } from "@thirdweb-dev/react";
import { getUser } from "../auth.config";
import checkBalance from "../util/checkBalance";
import styles from "../styles/Home.module.css";
import env from "dotenv";
require("dotenv").config();

import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
//import { NextPage } from "next";

export default function Home() {
  const logout = useLogout();

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Restricted Access Page</h1>
      <p className={styles.explain}>
        Thanks for beeing a member of this community
      </p>
      <button className={styles.mainButton} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

//This gets called on every request
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  //If User is not signed in, redirect him to the login page
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //Ensure we are able to generate an auth token using our private key instantiated SDK
  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  //Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai"
  );

  //Check to see if the user has an NFT
  const hasNFT = await checkBalance(sdk, user.address);

  //If they don´t have an NFT send them back to login page
  console.log("User", user.address, "doesnt have an NFT! Redirecting...");
  if (!hasNFT) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //If they have the NFT return the props
  //Return the Props
  return {
    props: {},
  };
}
