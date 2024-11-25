import { Evaluate, GalaChainContext, GalaContract, Submit } from "@gala-chain/chaincode";

import { addItemToBag, createBag, fetchBagItems, removeItemFromBag, updateItemInBag } from "./BagFeatures";
import { AddItemDto, BagDto, FetchBagItemsDto, RemoveItemDto, UpdateItemDto } from "./dtos";

/**
 * BagContract
 * A contract to manage operations on bags, including creation, item management, and fetching items.
 * Each method maps to a specific action that interacts with the GalaChain.
 */
export class BagContract extends GalaContract {
  constructor() {
    // Define the contract name and version
    super("BagContract", "1.0.0");
  }

  /**
   * Create a new bag.
   * @param ctx - GalaChainContext provides contextual information for the chaincode transaction.
   * @param dto - BagDto contains the bag holder, bag ID, and maximum weight.
   */
  @Submit({
    in: BagDto
  })
  public async CreateBag(ctx: GalaChainContext, dto: BagDto): Promise<void> {
    // Delegate the task of creating a bag to the `createBag` function.
    await createBag(ctx, dto);
  }

  /**
   * Add an item to an existing bag.
   * @param ctx - GalaChainContext provides contextual information for the chaincode transaction.
   * @param dto - AddItemDto contains details about the bag and the item to be added.
   */
  @Submit({
    in: AddItemDto
  })
  public async AddItem(ctx: GalaChainContext, dto: AddItemDto): Promise<void> {
    // Delegate the task of adding an item to the `addItemToBag` function.
    await addItemToBag(ctx, dto);
  }

  /**
   * Remove an item from a bag.
   * @param ctx - GalaChainContext provides contextual information for the chaincode transaction.
   * @param dto - RemoveItemDto contains the bag ID and the item ID to be removed.
   */
  @Submit({
    in: RemoveItemDto
  })
  public async RemoveItem(ctx: GalaChainContext, dto: RemoveItemDto): Promise<void> {
    // Delegate the task of removing an item to the `removeItemFromBag` function.
    await removeItemFromBag(ctx, dto);
  }

  /**
   * Update an existing item in a bag.
   * @param ctx - GalaChainContext provides contextual information for the chaincode transaction.
   * @param dto - UpdateItemDto contains the updated item details and the bag ID.
   */
  @Submit({
    in: UpdateItemDto
  })
  public async UpdateItem(ctx: GalaChainContext, dto: UpdateItemDto): Promise<void> {
    // Delegate the task of updating an item to the `updateItemInBag` function.
    await updateItemInBag(ctx, dto);
  }

  /**
   * Fetch all items from a specific bag.
   * @param ctx - GalaChainContext provides contextual information for the chaincode evaluation.
   * @param dto - FetchBagItemsDto contains the bag ID to fetch items for.
   * @returns A list of objects representing the items in the bag.
   */
  @Evaluate({
    in: FetchBagItemsDto,
    out: Array
  })
  public async FetchBagItems(ctx: GalaChainContext, dto: FetchBagItemsDto): Promise<object[]> {
    // Delegate the task of fetching items to the `fetchBagItems` function.
    return await fetchBagItems(ctx, dto);
  }
}
