/*
 * Integration Tests for BagContract
 * This test suite validates the core functionality of the BagContract smart contract,
 * including creating bags, adding items, fetching items, removing items, and updating items.
 */
import { GalaChainResponse, GalaChainResponseType } from "@gala-chain/api";
import { ChainClient, ChainUser, CommonContractAPI, commonContractAPI } from "@gala-chain/client";
import { AdminChainClients, TestClients, transactionErrorKey, transactionSuccess } from "@gala-chain/test";

import { AddItemDto, Bag, BagDto, FetchBagItemsDto, ItemDto, RemoveItemDto, UpdateItemDto } from "../src/bag";

describe("BagContract Integration Tests", () => {
  // Bag contract configuration
  const bagContractConfig = {
    bag: {
      channel: "product-channel",
      chaincode: "basic-product",
      contract: "BagContract",
      api: bagContractAPI
    }
  };

  let client: AdminChainClients<typeof bagContractConfig>;
  let user: ChainUser;

  // Setup test environment before running tests
  beforeAll(async () => {
    // Initialize the client and register a test user
    client = await TestClients.createForAdmin(bagContractConfig);
    user = await client.createRegisteredUser();
  });

  // Cleanup after tests are completed
  afterAll(async () => {
    await client.disconnect();
  });

  test("Create a new bag", async () => {
    // Given
    const dto = new BagDto(user.identityKey, "bag1", 100).signed(user.privateKey);

    // When
    const response = await client.bag.CreateBag(dto);
    console.log("Create a new bag sandbox-api-response",response);
    // Then
    expect(response).toEqual(transactionSuccess());
  });

  test("Add an item to the bag", async () => {
    // Given: Prepare a new item to add to the bag
    const item = new ItemDto("item1", "Item 1", 10, 1, "Sample item");
    const dto = new AddItemDto("bag1", item).signed(user.privateKey);

    // When: Attempt to add the item
    const response = await client.bag.AddItem(dto);
    console.log("Add an item to the bag sandbox-api-response",response);
    // Then: Verify the operation was successful
    expect(response).toEqual(transactionSuccess());
  });

  test("Fetch item from the bag", async () => {
    // Given: Prepare a request to fetch items from a specific bag
    const initialItem = new ItemDto("item1", "Item 1", 10, 1, "Sample item");
    const dto = new FetchBagItemsDto("bag1").signed(user.privateKey);

    // When: Fetch items from the bag
    const response = await client.bag.FetchBagItems(dto);
    console.log("Fetch item from the bag sandbox-api-response",response);
    // Then: Verify the bag contains the expected item(s)
    expect(response.Data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: initialItem.id,
          name: initialItem.name,
          description: initialItem.description,
          weight: initialItem.weight,
          quantity: initialItem.quantity
        })
      ])
    );
  });

  test("Remove an item from the bag", async () => {
    // Given: Prepare a request to remove a specific item from the bag
    const dto = new RemoveItemDto("bag1", "item1").signed(user.privateKey);

    // When: Attempt to remove the item
    const response = await client.bag.RemoveItem(dto);
    console.log("Remove an item from the bag sandbox-api-response",response);
    // Then: Verify the operation was successful
    expect(response).toEqual(transactionSuccess());
  });

  test("Update an item in the bag", async () => {
    // Given: Prepare an updated item to replace an existing item in the bag
    const updatedItem = new ItemDto("item1", "Updated Item 3", 15, 2, "Updated description");
    const dto = new UpdateItemDto("bag1", updatedItem).signed(user.privateKey);

    const item = new ItemDto("item1", "Item 1", 10, 1, "Sample item");
    const AddItem = new AddItemDto("bag1", item).signed(user.privateKey);

    // When: Attempt to add the item
    await client.bag.AddItem(AddItem);
    // When: Attempt to update the item
    const response = await client.bag.UpdateItem(dto);
    console.log("Update an item in the bag  sandbox-api-response",response);
    // Then: Verify the operation was successful
    expect(response).toEqual(transactionSuccess());
  });
});

/*
 * BagContract API Interface
 * Defines the methods available for interacting with the BagContract smart contract.
 */
interface BagContractAPI {
  CreateBag(dto: BagDto): Promise<GalaChainResponse<void>>;
  AddItem(dto: AddItemDto): Promise<GalaChainResponse<void>>;
  FetchBagItems(dto: FetchBagItemsDto): Promise<GalaChainResponse<ItemDto[]>>;
  RemoveItem(dto: RemoveItemDto): Promise<GalaChainResponse<void>>;
  UpdateItem(dto: UpdateItemDto): Promise<GalaChainResponse<void>>;
}

/*
 * BagContract API Implementation
 * Provides typed methods for interacting with the BagContract, enabling type-safe operations.
 */
function bagContractAPI(client: ChainClient): BagContractAPI & CommonContractAPI {
  return {
    ...commonContractAPI(client),

    // Method to create a new bag
    CreateBag(dto: BagDto) {
      return client.submitTransaction("CreateBag", dto) as Promise<GalaChainResponse<void>>;
    },

    // Method to add an item to a bag
    AddItem(dto: AddItemDto) {
      return client.submitTransaction("AddItem", dto) as Promise<GalaChainResponse<void>>;
    },

    // Method to fetch all items from a bag
    FetchBagItems(dto: FetchBagItemsDto) {
      return client.evaluateTransaction("FetchBagItems", dto) as Promise<GalaChainResponse<ItemDto[]>>;
    },

    // Method to remove an item from a bag
    RemoveItem(dto: RemoveItemDto) {
      return client.submitTransaction("RemoveItem", dto) as Promise<GalaChainResponse<void>>;
    },

    // Method to update an item in a bag
    UpdateItem(dto: UpdateItemDto) {
      return client.submitTransaction("UpdateItem", dto) as Promise<GalaChainResponse<void>>;
    }
  };
}
