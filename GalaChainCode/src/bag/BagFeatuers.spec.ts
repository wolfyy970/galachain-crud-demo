import { GalaContract } from "@gala-chain/chaincode";
import { ChainUser } from "@gala-chain/client";
import { fixture, writesMap } from "@gala-chain/test";

import { Bag } from "./Bag";
import { addItemToBag, createBag, fetchBagItems, removeItemFromBag, updateItemInBag } from "./BagFeatures";
import { AddItemDto, BagDto, FetchBagItemsDto, ItemDto, RemoveItemDto, UpdateItemDto } from "./dtos";

/**
 * TestContract
 * A mock contract for testing Bag functionalities, such as creating a bag,
 * adding, fetching, removing, and updating items.
 */
class TestContract extends GalaContract {
  constructor() {
    super("TestContract", "0.0.1");
  }
}

// Test: Creating a new bag
it("should allow creating a new bag", async () => {
  const user = ChainUser.withRandomKeys(); // Create a mock user
  const { ctx, writes } = fixture(TestContract).callingUser(user); // Initialize the test contract fixture
  const dto = new BagDto(user.identityKey, "bagF1", 100); // Define the new bag

  const expectedBag = new Bag(user.identityKey, dto.id, dto.maxWeight); // Define the expected state of the bag

  await createBag(ctx, dto); // Execute the CreateBag function
  await ctx.stub.flushWrites(); // Flush writes to simulate persistence

  // Verify that the writes match the expected bag state
  expect(writes).toEqual(writesMap(expectedBag));
});

// Test: Failing to create a bag if it already exists
it("should fail to create a bag if it already exists", async () => {
  const user = ChainUser.withRandomKeys();
  const { ctx } = fixture(TestContract)
    .callingUser(user)
    .savedState(new Bag(user.identityKey, "bagF2", 100)); // Simulate an existing bag

  const dto = new BagDto(user.identityKey, "bagF2", 100); // Attempt to create the same bag

  const response = createBag(ctx, dto); // Execute CreateBag

  // Expect the function to throw an error
  await expect(response).rejects.toThrow("Bag already exists");
});

// Test: Adding an item to a bag
it("should allow adding an item to a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const item = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Define the item to be added

  const initialBag = new Bag(user.identityKey, "bagF3", 100); // Define the initial bag state
  const updatedBag = new Bag(user.identityKey, "bagF3", 100);
  updatedBag.addItem(item); // Define the expected bag state after adding the item

  const { ctx, writes } = fixture(TestContract).callingUser(user).savedState(initialBag);
  const dto = new AddItemDto("bagF3", item); // Define the AddItemDto

  await addItemToBag(ctx, dto); // Execute AddItem
  await ctx.stub.flushWrites();

  // Verify the updated bag state matches expectations
  expect(writes).toEqual(writesMap(updatedBag));
});

// Test: Fetching all items from a bag
it("should fetch all items from a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const item1 = new ItemDto("item1", "Item 1", 10, 1, "First item");
  const item2 = new ItemDto("item2", "Item 2", 15, 2, "Second item");

  const initialBag = new Bag(user.identityKey, "bag1", 100); // Initialize a bag with items
  initialBag.addItem(item1);
  initialBag.addItem(item2);

  const { ctx } = fixture(TestContract).callingUser(user).savedState(initialBag);
  const dto = new FetchBagItemsDto("bag1"); // Define FetchBagItemsDto

  const response = await fetchBagItems(ctx, dto); // Execute FetchBagItems

  // Verify that the fetched items match the expected items
  expect(response).toEqual([item1, item2]);
});

// Test: Removing an item from a bag
it("should allow removing an item from a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const item = new ItemDto("item1", "Item 1", 10, 1, "Sample item");

  const initialBag = new Bag(user.identityKey, "bag1", 100); // Initialize a bag with the item
  initialBag.addItem(item);

  const updatedBag = new Bag(user.identityKey, "bag1", 100); // Define the expected state after removal

  const { ctx, writes } = fixture(TestContract).callingUser(user).savedState(initialBag);
  const dto = new RemoveItemDto("bag1", "item1"); // Define RemoveItemDto

  await removeItemFromBag(ctx, dto); // Execute RemoveItem
  await ctx.stub.flushWrites();

  // Verify the updated bag state matches expectations
  expect(writes).toEqual(writesMap(updatedBag));
});

// Test: Updating an item in a bag
it("should allow updating an item in a bag", async () => {
  const user = ChainUser.withRandomKeys();
  const originalItem = new ItemDto("item1", "Item 1", 10, 1, "Sample item");
  const updatedItem = new ItemDto("item1", "Updated Item", 15, 2, "Updated description");

  const initialBag = new Bag(user.identityKey, "bag1", 100); // Initialize a bag with the original item
  initialBag.addItem(originalItem);

  const updatedBag = new Bag(user.identityKey, "bag1", 100);
  updatedBag.addItem(updatedItem); // Define the expected state after the update

  const { ctx, writes } = fixture(TestContract).callingUser(user).savedState(initialBag);
  const dto = new UpdateItemDto("bag1", updatedItem); // Define UpdateItemDto

  await updateItemInBag(ctx, dto); // Execute UpdateItem
  await ctx.stub.flushWrites();

  // Verify the updated bag state matches expectations
  expect(writes).toEqual(writesMap(updatedBag));
});
