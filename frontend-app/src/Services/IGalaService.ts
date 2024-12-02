import {
  AddItemDto,
  BagDto,
  FetchBagItemsDto,
  RemoveItemDto,
  UpdateItemDto,
} from "../dtos/dtos";

/**
 * Interface defining the contract for a Gala service.
 * This interface outlines the required methods for interacting with GalaChain,
 * including wallet connection and CRUD operations on bags and items.
 */
export interface IGalaService {
  /**
   * Connects to the user's wallet for authentication and signing transactions.
   * 
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   * @throws {Error} Throws an error if the wallet connection fails.
   */
  connectToWallet(): Promise<void>;

  /**
   * Creates a new bag on the GalaChain.
   * 
   * @param {BagDto} dto - The data transfer object containing bag details (e.g., bag ID, holder, and max weight).
   * @returns {Promise<any>} A promise that resolves with the result of the create operation.
   * @throws {Error} Throws an error if the bag creation fails.
   */
  createBag(dto: BagDto): Promise<any>;

  /**
   * Adds an item to an existing bag on the GalaChain.
   * 
   * @param {AddItemDto} dto - The data transfer object containing item details and the associated bag ID.
   * @returns {Promise<any>} A promise that resolves with the result of the add operation.
   * @throws {Error} Throws an error if the operation fails.
   */
  addItemToBag(dto: AddItemDto): Promise<any>;

  /**
   * Fetches all items in a specific bag from the GalaChain.
   * 
   * @param {FetchBagItemsDto} dto - The data transfer object containing the bag ID to fetch items from.
   * @returns {Promise<any>} A promise that resolves with the list of items in the bag.
   * @throws {Error} Throws an error if the fetch operation fails.
   */
  fetchBagItems(dto: FetchBagItemsDto): Promise<any>;

  /**
   * Removes an item from a specific bag on the GalaChain.
   * 
   * @param {RemoveItemDto} dto - The data transfer object containing the bag ID and item ID to be removed.
   * @returns {Promise<any>} A promise that resolves when the item is successfully removed.
   * @throws {Error} Throws an error if the removal operation fails.
   */
  removeItemFromBag(dto: RemoveItemDto): Promise<any>;

  /**
   * Updates the details of an item in a specific bag on the GalaChain.
   * 
   * @param {UpdateItemDto} dto - The data transfer object containing the updated item details and associated bag ID.
   * @returns {Promise<any>} A promise that resolves with the result of the update operation.
   * @throws {Error} Throws an error if the update operation fails.
   */
  updateItemInBag(dto: UpdateItemDto): Promise<any>;
}
