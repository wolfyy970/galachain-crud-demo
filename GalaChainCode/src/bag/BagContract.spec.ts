import { ChainUser } from "@gala-chain/client";
import { fixture, transactionErrorMessageContains, transactionSuccess, writesMap } from "@gala-chain/test";

import { Bag } from "./Bag";
import { BagContract } from "./BagContract";
import { AddItemDto, BagDto, FetchBagItemsDto, ItemDto, RemoveItemDto, UpdateItemDto } from "./dtos";

// Test for creating a new bag
it("should allow creating a new bag", async () => {
  // Create a random user and prepare a test fixture for BagContract
  const user = ChainUser.withRandomKeys();
  const { contract, ctx, writes } = fixture(BagContract).callingUser(user);

  // Define the DTO (Data Transfer Object) for creating a bag
  const dto = new BagDto(ctx.callingUser, "uniqueBag1", 100);

  // Define the expected state of the bag after creation
  const expectedBag = new Bag(dto.bagHolder, dto.id, dto.maxWeight);

  // Call the CreateBag method and capture the response
  const response = await contract.CreateBag(ctx, dto);

  // Assert that the response is successful and the bag state matches expectations
  expect(response).toEqual(transactionSuccess());
  expect(writes).toEqual(writesMap(expectedBag));
});

// Test for attempting to create a bag that already exists
it("should fail to create a bag if it already exists", async () => {
  const user = ChainUser.withRandomKeys();
  const { contract, ctx, writes } = fixture(BagContract)
    .callingUser(user)
    .savedState(new Bag(user.identityKey, "uniqueBag2", 100)); // Pre-existing bag in state

  const dto = new BagDto(ctx.callingUser, "uniqueBag2", 100);

  // Attempt to create a bag with the same ID and expect an error
  const response = await contract.CreateBag(ctx, dto);

  // Assert that the response contains the appropriate error message
  expect(response).toEqual(transactionErrorMessageContains("Bag already exists"));
  expect(writes).toEqual({});
});

// Test for adding an item to a bag
it("should allow adding an item to a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const item = new ItemDto("item1", "Item 1", 10, 1, "Sample Item");
  const bagId = "uniqueBag3";

  // Define initial and updated states of the bag
  const initialBag = new Bag(user.identityKey, bagId, 100);
  const updatedBag = new Bag(user.identityKey, bagId, 100);
  updatedBag.addItem(item);

  const { contract, ctx, writes } = fixture(BagContract).callingUser(user).savedState(initialBag);

  const dto = new AddItemDto(bagId, item);

  // Add the item to the bag and verify the state
  const response = await contract.AddItem(ctx, dto);

  expect(response).toEqual(transactionSuccess());
  expect(writes).toEqual(writesMap(updatedBag));
});

// Test for fetching all items from a bag
it("should fetch all items from a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const item = new ItemDto("item1", "Item 1", 10, 1, "Sample Item");

  const bagId = "uniqueBag4";
  const expectedBag = new Bag(user.identityKey, bagId, 100);
  expectedBag.addItem(item);

  const { contract, ctx } = fixture(BagContract).callingUser(user).savedState(expectedBag);
  const dto = new FetchBagItemsDto(bagId);

  // Fetch items and assert that the expected items are retrieved
  const response = await contract.FetchBagItems(ctx, dto);

  expect(response.Data).toEqual(expect.arrayContaining([expect.objectContaining(item)]));
});

// Test for removing an item from a bag
it("should allow removing an item from a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const item1 = new ItemDto("item3", "Item 1", 10, 1, "First item");
  const item2 = new ItemDto("item4", "Item 2", 20, 2, "Second item");

  const bagId = "uniqueBag5";

  // Define initial and updated states of the bag
  const initialBag = new Bag(user.identityKey, bagId, 100);
  initialBag.addItem(item1);
  initialBag.addItem(item2);

  const updatedBag = new Bag(user.identityKey, bagId, 100);
  updatedBag.addItem(item2); // Remove item1

  const { contract, ctx, writes } = fixture(BagContract).callingUser(user).savedState(initialBag);
  const dto = new RemoveItemDto(bagId, item1.id);

  // Remove the item and verify the state
  const response = await contract.RemoveItem(ctx, dto);

  expect(response).toEqual(transactionSuccess());
  expect(writes).toEqual(writesMap(updatedBag));
});

// Test for updating an item in a bag
it("should allow updating an item in a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const originalItem = new ItemDto("item1", "Item 1", 10, 1, "Sample Item");
  const updatedItem = new ItemDto("item1", "Updated Item 1", 20, 2, "Updated description");

  const bagId = "uniqueBag6";

  // Define initial and updated states of the bag
  const initialBag = new Bag(user.identityKey, bagId, 100);
  initialBag.addItem(originalItem);

  const updatedBag = new Bag(user.identityKey, bagId, 100);
  updatedBag.addItem(originalItem);
  updatedBag.updateItem(updatedItem);

  const { contract, ctx, writes } = fixture(BagContract).callingUser(user).savedState(initialBag);
  const dto = new UpdateItemDto(bagId, updatedItem);

  // Update the item and verify the state
  const response = await contract.UpdateItem(ctx, dto);

  expect(response).toEqual(transactionSuccess());
  expect(writes).toEqual(writesMap(updatedBag));
});
