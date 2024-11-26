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

class LocalnetGalaService implements IGalaService {
  private readonly contractUrl = "http://localhost:3000/api/localchain-BagContract";

  async connectToWallet(): Promise<void> {
    console.log("Connecting to wallet for Localnet...");
    // Implement wallet connection logic if required
  }

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

  async createBag(dto: BagDto): Promise<any> {
    // return this.postTransaction("CreateBag", dto);
    return dto
  }

  async addItemToBag(dto: AddItemDto): Promise<any> {
    // return this.postTransaction("AddItem", dto);
    return dto
  }

  async fetchBagItems(dto: FetchBagItemsDto): Promise<any> {
    // return this.postTransaction("FetchBagItems", dto);
    const defaultItems: ItemDto[] = [
        new ItemDto("item1", "Sword", 5, 1, "Sharp steel sword"),
        new ItemDto("item2", "Shield", 10, 2, "Wooden shield"),
        new ItemDto("item3", "Health Potion", 2, 1, "Heals 50 HP"),
      ];
    return defaultItems
  }

  async removeItemFromBag(dto: RemoveItemDto): Promise<any> {
    // return this.postTransaction("RemoveItem", dto);
    return dto
  }

  async updateItemInBag(dto: UpdateItemDto): Promise<any> {
    // return this.postTransaction("UpdateItem", dto);
    return dto
  }
}

export default LocalnetGalaService;
