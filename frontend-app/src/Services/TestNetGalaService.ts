import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  AddItemDto,
  BagDto,
  FetchBagItemsDto,
  RemoveItemDto,
  UpdateItemDto,
} from "../dtos/dtos";
import { IGalaService } from "./IGalaService";
import { BrowserConnectClient, SigningType } from "@gala-chain/connect";

/**
 * TestNetGalaService class provides an implementation of IGalaService for interacting
 * with the GalaChain TestNet environment. It handles wallet connection and performs
 * blockchain transactions for bag-related operations.
 */
class TestNetGalaService implements IGalaService {
  // Base URL for the TestNet API
  private readonly baseUrl =
    "https://gateway-testnet.galachain.com/api/testnet03";

  // Client for wallet connection and signing
  private client!: BrowserConnectClient;

  /**
   * Constructor initializes the wallet connection when the service is created.
   */
  constructor() {
    this.initializeWalletConnection();
  }

  /**
   * Initializes the wallet connection using the BrowserConnectClient.
   * Handles errors and ensures the client is connected.
   */
  private async initializeWalletConnection() {
    try {
      console.log("Initializing wallet connection...");
      this.client = new BrowserConnectClient();
      await this.client.connect(); // Connects to the wallet (e.g., MetaMask)
      console.log("Wallet connected:");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw new Error("Failed to connect to wallet.");
    }
  }

  /**
   * Constructs the full URL for a given contract method.
   * 
   * @param {string} method - The method name to be called on the contract.
   * @returns {string} The full API URL for the method.
   */
  private buildUrl(method: string): string {
    return `${this.baseUrl}/gc-934ed10e3aa04e39744dbaf3e6da7c804acb8010-BagContract/${method}`;
  }

  /**
   * Posts a transaction to the TestNet API, signing the payload and adding required parameters.
   * 
   * @param {string} method - The contract method to be called.
   * @param {any} payload - The data payload for the transaction.
   * @returns {Promise<any>} A promise that resolves with the API response.
   * @throws {Error} Throws an error if the API call fails.
   */
  private async postTransaction(method: string, payload: any): Promise<any> {
    const url = this.buildUrl(method);

    // Signing the payload using the connected wallet
    const sign = await this.client.sign(
      method,
      payload,
      SigningType.SIGN_TYPED_DATA
    );

    // Fetching the public key of the connected wallet
    const publicKey = await this.client.getPublicKey();

    // Common parameters required for the transaction
    const commonParams = {
      prefix: "BagPrefix",
      signature: sign.signature,
      signerAddress: this.client.ethereumAddress,
      signerPublicKey: publicKey.publicKey,
      signing: "ETH",
      uniqueKey: uuidv4(), // Unique identifier for the transaction
    };

    // Merging the payload with common parameters
    const extendedPayload = { ...payload, ...commonParams };

    try {
      // Making the API call
      const response = await axios.post(url, extendedPayload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.Data; // Returning the response data
    } catch (error) {
      console.error(`Error calling ${method} on ${url}:`, error);
      throw error; // Throwing error for failure
    }
  }

  /**
   * Ensures the wallet is connected. If not, it initializes the connection.
   */
  async connectToWallet(): Promise<void> {
    if (!this.client) {
      await this.initializeWalletConnection();
    }
  }

  /**
   * Creates a new bag on the blockchain.
   * 
   * @param {BagDto} dto - The details of the bag to create.
   * @returns {Promise<any>} A promise that resolves with the API response.
   */
  async createBag(dto: BagDto): Promise<any> {
    return this.postTransaction("CreateBag", dto);
  }

  /**
   * Adds an item to a bag on the blockchain.
   * 
   * @param {AddItemDto} dto - The details of the item and bag.
   * @returns {Promise<any>} A promise that resolves with the API response.
   */
  async addItemToBag(dto: AddItemDto): Promise<any> {
    return this.postTransaction("AddItem", dto);
  }

  /**
   * Fetches the items in a bag from the blockchain.
   * 
   * @param {FetchBagItemsDto} dto - The details of the bag to fetch items from.
   * @returns {Promise<any>} A promise that resolves with the fetched items.
   */
  async fetchBagItems(dto: FetchBagItemsDto): Promise<any> {
    return this.postTransaction("FetchBagItems", dto);
  }

  /**
   * Removes an item from a bag on the blockchain.
   * 
   * @param {RemoveItemDto} dto - The details of the item and bag.
   * @returns {Promise<any>} A promise that resolves with the API response.
   */
  async removeItemFromBag(dto: RemoveItemDto): Promise<any> {
    return this.postTransaction("RemoveItem", dto);
  }

  /**
   * Updates an item in a bag on the blockchain.
   * 
   * @param {UpdateItemDto} dto - The updated item details and bag information.
   * @returns {Promise<any>} A promise that resolves with the API response.
   */
  async updateItemInBag(dto: UpdateItemDto): Promise<any> {
    return this.postTransaction("UpdateItem", dto);
  }
}

export default TestNetGalaService;
