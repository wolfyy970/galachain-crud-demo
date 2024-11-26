import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GalaServiceFactory } from "../Services/GalaServiceFactory";
import {
  ItemDto,
  FetchBagItemsDto,
  RemoveItemDto,
  UpdateItemDto,
} from "../dtos/dtos";
import "./css/BagManagement.css";

const BagManagement: React.FC = () => {
  const { bagId } = useParams<{ bagId: string }>();
  const [items, setItems] = useState<ItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  const galaService = GalaServiceFactory.getGalaService();

  const fetchItems = async () => {
    try {
      setLoading(true);
      if (!bagId) throw new Error("Bag ID is required");
      const dto = new FetchBagItemsDto(bagId);
      const fetchedItems = await galaService.fetchBagItems(dto);
      setItems(fetchedItems.map((item: any) => new ItemDto(item.id, item.name, item.weight, item.quantity, item.description))); // Ensure ItemDto instances
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (itemId: string, currentQuantity: number) => {
    setEditItemId(itemId);
    setEditQuantity(currentQuantity);
  };

  const handleUpdateItem = async () => {
    try {
      if (!editItemId || !bagId) return;

      const itemToUpdate = items.find((item) => item.id === editItemId);
      if (!itemToUpdate) return;

      const updatedItem = new ItemDto(
        itemToUpdate.id,
        itemToUpdate.name,
        itemToUpdate.weight,
        editQuantity,
        itemToUpdate.description
      );

      const dto = new UpdateItemDto(bagId, updatedItem);
      await galaService.updateItemInBag(dto);

      setItems((prev) =>
        prev.map((item) =>
          item.id === editItemId
            ? new ItemDto(item.id, item.name, item.weight, editQuantity, item.description)
            : item
        )
      );

      alert("Item updated successfully!");
      setEditItemId(null);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      if (!bagId) return;

      const dto = new RemoveItemDto(bagId, itemId);
      await galaService.removeItemFromBag(dto);

      setItems((prev) => prev.filter((item) => item.id !== itemId));

      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [bagId]);

  return (
    <div className="bag-management-container">
      <h2>Manage Bag: {bagId}</h2>
      {loading ? (
        <p className="loading-text">Loading items...</p>
      ) : (
        <ul className="items-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Weight:</strong> {item.weight}
                </p>
                <p>
                  <strong>Quantity:</strong> {editItemId === item.id ? editQuantity : item.quantity}
                </p>
              </div>
              <div className="actions">
                {editItemId === item.id ? (
                  <div className="edit-quantity">
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                      className="edit-input"
                    />
                    <div className="btn-container">
                    <button onClick={handleUpdateItem} className="save-button">
                      Save
                    </button>
                    <button
                      onClick={() => setEditItemId(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleEditItem(item.id, item.quantity)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BagManagement;
