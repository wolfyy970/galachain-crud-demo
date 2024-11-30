/*
 * Bag Features
 * This file contains functions required for managing bags and their items.
 */
import { ConflictError } from "@gala-chain/api";
import { GalaChainContext, getObjectByKey, putChainObject } from "@gala-chain/chaincode";

import { Bag } from "./Bag";
import { AddItemDto, BagDto, FetchBagItemsDto, RemoveItemDto, UpdateItemDto } from "./dtos";

/**
 * Creates a new bag with the specified ID and maximum weight.
 *
 * @param ctx - The GalaChain context object, providing blockchain access.
 * @param dto - Data Transfer Object containing details for the new bag (bagHolder, ID, maxWeight).
 * @throws ConflictError - If a bag with the given ID already exists.
 */
export async function createBag(ctx: GalaChainContext, dto: BagDto): Promise<void> {
  const bag = new Bag(dto.bagHolder, dto.id, dto.maxWeight); // Initialize a new bag
  const key = ctx.stub.createCompositeKey(Bag.INDEX_KEY, [dto.id]); // Generate a unique key for the bag

  // Check if the bag already exists
  const existingBag = await getObjectByKey(ctx, Bag, key).catch(() => undefined);

  if (existingBag !== undefined) {
    throw new ConflictError("Bag already exists", existingBag.toPlainObject());
  }

  // Save the new bag to the blockchain
  await putChainObject(ctx, bag);
}

/**
 * Adds an item to the specified bag if weight constraints allow.
 *
 * @param ctx - The GalaChain context object, providing blockchain access.
 * @param dto - Data Transfer Object containing the bag ID and the item to be added.
 * @returns The updated Bag object.
 * @throws ConflictError - If the item with the same ID already exists in the bag.
 */
export async function addItemToBag(ctx: GalaChainContext, dto: AddItemDto): Promise<Bag> {
  const key = ctx.stub.createCompositeKey(Bag.INDEX_KEY, [dto.bagId]); // Generate the key for the bag
  const bag = await getObjectByKey(ctx, Bag, key); // Fetch the bag from the blockchain

  // Check if an item with the same ID already exists in the bag
  const existingItem = bag.items.find((item) => item.id === dto.item.id);

  if (existingItem !== undefined) {
    throw new ConflictError(`Item with ID ${dto.item.id} already exists in the Bag`, existingItem);
  }

  // Add the new item to the bag
  bag.addItem(dto.item);

  // Save the updated bag object to the blockchain
  await putChainObject(ctx, bag);

  return bag;
}

/**
 * Fetches all items from the specified bag.
 *
 * @param ctx - The GalaChain context object, providing blockchain access.
 * @param dto - Data Transfer Object containing the bag ID.
 * @returns An array of items currently in the bag.
 */
export async function fetchBagItems(ctx: GalaChainContext, dto: FetchBagItemsDto): Promise<object[]> {
  const key = ctx.stub.createCompositeKey(Bag.INDEX_KEY, [dto.bagId]); // Generate the key for the bag
  const bag = await getObjectByKey(ctx, Bag, key); // Fetch the bag from the blockchain

  // Return the list of items in the bag
  return bag.fetchItems();
}

/**
 * Removes an item from the specified bag by its ID.
 *
 * @param ctx - The GalaChain context object, providing blockchain access.
 * @param dto - Data Transfer Object containing the bag ID and the item ID to be removed.
 * @throws NotFoundError - If the item does not exist in the bag.
 */
export async function removeItemFromBag(ctx: GalaChainContext, dto: RemoveItemDto): Promise<void> {
  const key = ctx.stub.createCompositeKey(Bag.INDEX_KEY, [dto.bagId]); // Generate the key for the bag
  const bag = await getObjectByKey(ctx, Bag, key); // Fetch the bag from the blockchain

  // Remove the specified item from the bag
  bag.removeItem(dto.itemId);

  // Save the updated bag object to the blockchain
  await putChainObject(ctx, bag);
}

/**
 * Updates an existing item in the specified bag.
 *
 * @param ctx - The GalaChain context object, providing blockchain access.
 * @param dto - Data Transfer Object containing the bag ID and the updated item details.
 * @throws NotFoundError - If the item to be updated does not exist in the bag.
 * @throws ConflictError - If the updated item's weight exceeds the bag's maximum weight.
 */
export async function updateItemInBag(ctx: GalaChainContext, dto: UpdateItemDto): Promise<void> {
  const key = ctx.stub.createCompositeKey(Bag.INDEX_KEY, [dto.bagId]); // Generate the key for the bag
  const bag = await getObjectByKey(ctx, Bag, key); // Fetch the bag from the blockchain

  // Update the specified item in the bag
  bag.updateItem(dto.updatedItem);

  // Save the updated bag object to the blockchain
  await putChainObject(ctx, bag);
}
