/*
 * Data Transfer Objects (DTOs) for Bag and Items
 * These DTOs facilitate the transfer of data between the client and the chaincode.
 * Each DTO includes validation rules to ensure data integrity during processing.
 */
import { ChainCallDTO } from "@gala-chain/api";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

/*
 * BagDto
 * Used for creating or fetching a bag.
 * Contains:
 * - `bagHolder`: The identifier of the bag owner (e.g., user ID).
 * - `id`: The unique identifier for the bag.
 * - `maxWeight`: The maximum weight the bag can hold.
 */
export class BagDto extends ChainCallDTO {
  @IsString()
  public readonly bagHolder: string;

  @IsString()
  public readonly id: string;

  @IsNumber()
  public readonly maxWeight: number;

  constructor(bagHolder: string, id: string, maxWeight: number) {
    super();
    this.bagHolder = bagHolder;
    this.id = id;
    this.maxWeight = maxWeight;
  }
}

/*
 * ItemDto
 * Represents an item to be added to a bag.
 * Contains:
 * - `id`: The unique identifier for the item.
 * - `name`: The name of the item.
 * - `weight`: The weight of a single unit of the item.
 * - `quantity`: The quantity of the item.
 * - `description`: A brief description of the item.
 */
export class ItemDto extends ChainCallDTO {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly name: string;

  @IsNumber()
  public readonly weight: number;

  @IsNumber()
  public readonly quantity: number;

  @IsString()
  public readonly description: string;

  constructor(id: string, name: string, weight: number, quantity: number, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.quantity = quantity;
    this.description = description;
  }
}

/*
 * AddItemDto
 * Used for adding a new item to a bag.
 * Contains:
 * - `bagId`: The identifier of the bag to which the item will be added.
 * - `item`: The details of the item to be added, represented as an `ItemDto`.
 */
export class AddItemDto extends ChainCallDTO {
  @IsString()
  public readonly bagId: string;

  @Type(() => ItemDto) // Converts the plain object to an `ItemDto` instance
  public readonly item: ItemDto;

  constructor(bagId: string, item: ItemDto) {
    super();
    this.bagId = bagId;
    this.item = item;
  }
}

/*
 * RemoveItemDto
 * Used for removing an item from a bag.
 * Contains:
 * - `bagId`: The identifier of the bag from which the item will be removed.
 * - `itemId`: The unique identifier of the item to be removed.
 */
export class RemoveItemDto extends ChainCallDTO {
  @IsString()
  public readonly bagId: string;

  @IsString()
  public readonly itemId: string;

  constructor(bagId: string, itemId: string) {
    super();
    this.bagId = bagId;
    this.itemId = itemId;
  }
}

/*
 * UpdateItemDto
 * Used for updating the details of an existing item in a bag.
 * Contains:
 * - `bagId`: The identifier of the bag where the item is stored.
 * - `updatedItem`: The updated details of the item, represented as an `ItemDto`.
 */
export class UpdateItemDto extends ChainCallDTO {
  @IsString()
  public readonly bagId: string;

  @ValidateNested() // Ensures the `updatedItem` is validated as an `ItemDto`
  @Type(() => ItemDto)
  public readonly updatedItem: ItemDto;

  constructor(bagId: string, updatedItem: ItemDto) {
    super();
    this.bagId = bagId;
    this.updatedItem = updatedItem;
  }
}

/*
 * FetchBagItemsDto
 * Used for fetching all items from a specific bag.
 * Contains:
 * - `bagId`: The identifier of the bag whose items are to be fetched.
 */
export class FetchBagItemsDto extends ChainCallDTO {
  @IsString()
  public readonly bagId: string;

  constructor(bagId: string) {
    super();
    this.bagId = bagId;
  }
}
