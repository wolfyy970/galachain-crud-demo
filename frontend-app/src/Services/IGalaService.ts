import {
    AddItemDto,
    BagDto,
    FetchBagItemsDto,
    RemoveItemDto,
    UpdateItemDto,
  } from "../dtos/dtos";
  
  export interface IGalaService {
    connectToWallet(): Promise<void>;
    createBag(dto: BagDto): Promise<any>;
    addItemToBag(dto: AddItemDto): Promise<any>;
    fetchBagItems(dto: FetchBagItemsDto): Promise<any>;
    removeItemFromBag(dto: RemoveItemDto): Promise<any>;
    updateItemInBag(dto: UpdateItemDto): Promise<any>;
  }
  