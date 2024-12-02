import axios from "axios";
import {
  AddItemDto,
  BagDto,
  FetchBagItemsDto,
  RemoveItemDto,
  UpdateItemDto,
  ItemDto,
} from "../dtos/dtos";
import { IGalaService } from "./IGalaService";

/**
 * LocalnetGalaService class provides the implementation for the IGalaService interface 
 * specific to the local environment.
 * This service interacts with the local blockchain or mock backend for testing purposes.
 */
class LocalnetGalaService implements IGalaService {
  // Base URL for the contract API in the local environment
  private readonly contractUrl = "http://localhost:3000/api/localchain-BagContract";

  /**
   * Simulates wallet connection for local development.
   * 
   * @returns {Promise<void>} A promise that resolves when the connection is simulated.
   */
  async connectToWallet(): Promise<void> {
    console.log("Connecting to wallet for Localnet...");
    // Implement wallet connection logic if required for local development
  }

  /**
   * Helper method to send POST transactions to the local blockchain API.
   * 
   * @param {string} method - The API method to call.
   * @param {any} payload - The data to include in the API call.
   * @returns {Promise<any>} A promise that resolves with the API response.
   * @throws {Error} Throws an error if the API call fails.
   */
  private async postTransaction(method: string, payload: any): Promise<any> {
    const url = `${this.contractUrl}/${method}`;

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error calling ${method} on ${url}:`, error);
      throw error;
    }
  }

  /**
   * Simulates creating a bag on the local blockchain.
   * 
   * @param {BagDto} dto - The bag details to be created.
   * @returns {Promise<any>} A promise resolving with the input DTO for local testing.
   */
  async createBag(dto: BagDto): Promise<any> {
    // Uncomment the line below to enable actual API interaction
    // return this.postTransaction("CreateBag", dto);
    return dto; // Simulated response for local testing
  }

  /**
   * Simulates adding an item to a bag on the local blockchain.
   * 
   * @param {AddItemDto} dto - The item details and associated bag ID.
   * @returns {Promise<any>} A promise resolving with the input DTO for local testing.
   */
  async addItemToBag(dto: AddItemDto): Promise<any> {
    // Uncomment the line below to enable actual API interaction
    // return this.postTransaction("AddItem", dto);
    return dto; // Simulated response for local testing
  }

  /**
   * Simulates fetching items from a bag on the local blockchain.
   * 
   * @param {FetchBagItemsDto} dto - The bag ID to fetch items for.
   * @returns {Promise<any>} A promise resolving with mock items for local testing.
   */
  async fetchBagItems(dto: FetchBagItemsDto): Promise<any> {
    // Uncomment the line below to enable actual API interaction
    // return this.postTransaction("FetchBagItems", dto);
    const defaultItems: ItemDto[] = [
      new ItemDto("item1", "Sword", 5, 1, "Sharp steel sword"),
      new ItemDto("item2", "Shield", 10, 2, "Wooden shield"),
      new ItemDto("item3", "Health Potion", 2, 1, "Heals 50 HP"),
    ];
    return defaultItems; // Simulated response for local testing
  }

  /**
   * Simulates removing an item from a bag on the local blockchain.
   * 
   * @param {RemoveItemDto} dto - The bag ID and item ID to remove.
   * @returns {Promise<any>} A promise resolving with the input DTO for local testing.
   */
  async removeItemFromBag(dto: RemoveItemDto): Promise<any> {
    // Uncomment the line below to enable actual API interaction
    // return this.postTransaction("RemoveItem", dto);
    return dto; // Simulated response for local testing
  }

  /**
   * Simulates updating an item in a bag on the local blockchain.
   * 
   * @param {UpdateItemDto} dto - The updated item details and associated bag ID.
   * @returns {Promise<any>} A promise resolving with the input DTO for local testing.
   */
  async updateItemInBag(dto: UpdateItemDto): Promise<any> {
    // Uncomment the line below to enable actual API interaction
    // return this.postTransaction("UpdateItem", dto);
    return dto; // Simulated response for local testing
  }
}

export default LocalnetGalaService;
