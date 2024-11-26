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

class TestNetGalaService implements IGalaService {
  private readonly baseUrl =
    "https://gateway-testnet.galachain.com/api/testnet03";
  private client!: BrowserConnectClient;

  constructor() {
    this.initializeWalletConnection();
  }

  private async initializeWalletConnection() {
    try {
      console.log("Initializing wallet connection...");
      this.client = new BrowserConnectClient();
      await this.client.connect();
      console.log("Wallet connected:");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw new Error("Failed to connect to wallet.");
    }
  }

  private buildUrl(method: string): string {
    return `${this.baseUrl}/gc-934ed10e3aa04e39744dbaf3e6da7c804acb8010-BagContract/${method}`;
  }

  private async postTransaction(method: string, payload: any): Promise<any> {
    const url = this.buildUrl(method);

    const sign = await this.client.sign(
      method,
      payload,
      SigningType.SIGN_TYPED_DATA
    );
    const publicKey = await this.client.getPublicKey();
    const commonParams = {
      prefix: "BagPrefix",
      signature: sign.signature,
      signerAddress: this.client.ethereumAddress,
      signerPublicKey: publicKey.publicKey,
      signing: "ETH",
      uniqueKey: uuidv4(),
    };
    const extendedPayload = { ...payload, ...commonParams };

    try {
      const response = await axios.post(url, extendedPayload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error calling ${method} on ${url}:`, error);
      throw error;
    }
  }

  async connectToWallet(): Promise<void> {
    if (!this.client) {
      await this.initializeWalletConnection();
    }
  }

  async createBag(dto: BagDto): Promise<any> {
    return this.postTransaction("CreateBag", dto);
  }

  async addItemToBag(dto: AddItemDto): Promise<any> {
    return this.postTransaction("AddItem", dto);
  }

  async fetchBagItems(dto: FetchBagItemsDto): Promise<any> {
    return this.postTransaction("FetchBagItems", dto);
  }

  async removeItemFromBag(dto: RemoveItemDto): Promise<any> {
    return this.postTransaction("RemoveItem", dto);
  }

  async updateItemInBag(dto: UpdateItemDto): Promise<any> {
    return this.postTransaction("UpdateItem", dto);
  }
}

export default TestNetGalaService;
