export default async function checkBalance(sdk, address) {
  const editionDrop = sdk.getEditionDrop(
    "0xea3d5d345e96a1c76467185a833cb11ee6e4e4b0" // Put contract address here
  );

  const balance = await editionDrop.balanceOf(address, 0);
  //gt = greater than
  return balance.gt(0);
}
