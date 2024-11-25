/*
 * Bag Class
 * Represents a Bag with weight constraints and associated methods.
 */
import { BigNumberProperty, ChainKey, ChainObject, DefaultError, NotFoundError } from "@gala-chain/api";
import BigNumber from "bignumber.js";
import { Exclude } from "class-transformer";
import { IsString } from "class-validator";

import { ItemDto } from "./dtos";

export class Bag extends ChainObject {
  /*
   * Static constant for the index key used in the blockchain storage.
   */
  @Exclude()
  static INDEX_KEY = "GCAPPL";

  /*
   * The identifier for the owner of the bag.
   */
  @IsString()
  public readonly bagHolder: string;

  /*
   * Unique identifier for the bag, used as a primary key in storage.
   */
  @ChainKey({ position: 0 })
  @IsString()
  public readonly id: string;

  /*
   * The maximum weight that the bag can hold.
   */
  @BigNumberProperty()
  public maxWeight: BigNumber;

  /*
   * The current weight of the items in the bag.
   */
  @BigNumberProperty()
  public currentWeight: BigNumber;

  /*
   * A collection of items currently in the bag.
   */
  public items: ItemDto[];

  /*
   * Constructor for initializing a new Bag instance.
   * @param bagHolder - The owner of the bag.
   * @param id - The unique identifier for the bag.
   * @param maxWeight - The maximum weight the bag can hold.
   */
  constructor(bagHolder: string, id: string, maxWeight: number) {
    super();
    this.bagHolder = bagHolder;
    this.id = id;
    this.maxWeight = new BigNumber(maxWeight);
    this.currentWeight = new BigNumber(0); // Initialize the bag as empty
    this.items = [];
  }

  /*
   * Adds an item to the bag if weight constraints are satisfied.
   * @param item - The item to be added.
   * @throws NoSpaceLeftError - If the item exceeds the bag's max weight.
   */
  public addItem(item: ItemDto): void {
    const itemWeight = new BigNumber(item.weight).multipliedBy(item.quantity);
    const newWeight = this.currentWeight.plus(itemWeight);
    if (newWeight.isGreaterThan(this.maxWeight)) {
      throw new NoSpaceLeftError(newWeight);
    }
    this.items.push(item);
    this.currentWeight = newWeight;
  }

  /*
   * Removes an item from the bag by its unique identifier.
   * @param itemId - The ID of the item to remove.
   * @throws ItemNotFoundError - If the item does not exist in the bag.
   */
  public removeItem(itemId: string): void {
    const itemIndex = this.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new ItemNotFoundError(itemId);
    }
    const item = this.items[itemIndex];
    const itemWeight = new BigNumber(item.weight).multipliedBy(item.quantity);
    this.currentWeight = this.currentWeight.minus(itemWeight);
    this.items.splice(itemIndex, 1);
  }

  /*
   * Updates an existing item in the bag.
   * @param updatedItem - The updated item details.
   * @throws ItemNotFoundError - If the item does not exist in the bag.
   * @throws NoSpaceLeftError - If the updated item exceeds the bag's max weight.
   */
  public updateItem(updatedItem: ItemDto): void {
    const itemIndex = this.items.findIndex((item) => item.id === updatedItem.id);
    if (itemIndex === -1) {
      throw new ItemNotFoundError(updatedItem.id);
    }

    const currentItem = this.items[itemIndex];
    const currentItemWeight = new BigNumber(currentItem.weight).multipliedBy(currentItem.quantity);
    const updatedItemWeight = new BigNumber(updatedItem.weight).multipliedBy(updatedItem.quantity);

    const newWeight = this.currentWeight.minus(currentItemWeight).plus(updatedItemWeight);

    if (newWeight.isGreaterThan(this.maxWeight)) {
      throw new NoSpaceLeftError(newWeight);
    }

    // Update the item and adjust the weight
    this.items[itemIndex] = updatedItem;
    this.currentWeight = newWeight;
  }

  /*
   * Fetches all items currently in the bag.
   * @returns A list of items in the bag.
   */
  public fetchItems(): ItemDto[] {
    return this.items;
  }
}

/*
 * Custom Error Classes
 */

/*
 * Error thrown when an attempt is made to add or update an item that
 * exceeds the bag's maximum weight.
 */
class NoSpaceLeftError extends DefaultError {
  constructor(attemptedWeight: BigNumber) {
    super(`Cannot add or update item. Exceeds bag's max weight. Attempted: ${attemptedWeight}`);
  }
}

/*
 * Error thrown when an attempt is made to remove or update an item
 * that does not exist in the bag.
 */
class ItemNotFoundError extends NotFoundError {
  constructor(itemId: string) {
    super(`Item with ID ${itemId} not found in the bag.`);
  }
}
