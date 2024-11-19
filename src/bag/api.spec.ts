import { fixture, transactionSuccess } from "@gala-chain/test";

import { BagContract } from "./BagContract";

/*
 * Snapshot Test for BagContract API
 *
 * This test ensures that the API definition of the BagContract remains consistent and unchanged
 * unless intentional modifications are made. It is useful for detecting unexpected changes in the
 * API structure that may lead to breaking changes or unintended side effects.
 */
test(`${BagContract.name} API should match snapshot`, async () => {
  // Given
  // Create a test fixture for the BagContract. This provides a mock environment for the contract.
  const { contract, ctx } = fixture(BagContract);

  // When
  // Retrieve the API definition of the BagContract using the GetContractAPI method.
  const contractApi = await contract.GetContractAPI(ctx);

  // Then
  // Verify the response indicates a successful transaction.
  expect(contractApi).toEqual(transactionSuccess());

  // Match the API definition (with a placeholder for contract version) against the saved snapshot.
  // This ensures that any changes to the API will be detected by snapshot testing tools.
  expect({ ...contractApi.Data, contractVersion: "?.?.?" }).toMatchSnapshot();
});
