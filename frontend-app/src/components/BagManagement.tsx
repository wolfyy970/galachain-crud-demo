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
  // Extract the bagId from the URL parameters
  const { bagId } = useParams<{ bagId: string }>();

  // State variables to manage the list of items, loading state, and editing details
  const [items, setItems] = useState<ItemDto[]>([]); // Stores the items in the bag
  const [loading, setLoading] = useState(false); // Tracks whether data is loading
  const [editItemId, setEditItemId] = useState<string | null>(null); // Tracks the item being edited
  const [editQuantity, setEditQuantity] = useState<number>(0); // Stores the quantity of the item being edited

  // Dynamically fetch the appropriate Gala service based on environment
  const galaService = GalaServiceFactory.getGalaService();

  // Fetches items from the blockchain for the specified bag
  const fetchItems = async () => {
    try {
      setLoading(true); // Set loading state to true
      if (!bagId) throw new Error("Bag ID is required");

      // Create a DTO for fetching bag items
      const dto = new FetchBagItemsDto(bagId);

      // Fetch items from the service and map them into ItemDto instances
      const fetchedItems = await galaService.fetchBagItems(dto);
      setItems(
        fetchedItems.map(
          (item: any) =>
            new ItemDto(item.id, item.name, item.weight, item.quantity, item.description)
        )
      );
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Failed to fetch items.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handles setting up the state for editing an item's quantity
  const handleEditItem = (itemId: string, currentQuantity: number) => {
    setEditItemId(itemId);
    setEditQuantity(currentQuantity);
  };

  // Handles updating an item's quantity on the blockchain and updating the UI
  const handleUpdateItem = async () => {
    try {
      if (!editItemId || !bagId) return;

      // Find the item to update from the current state
      const itemToUpdate = items.find((item) => item.id === editItemId);
      if (!itemToUpdate) return;

      // Create an updated ItemDto instance
      const updatedItem = new ItemDto(
        itemToUpdate.id,
        itemToUpdate.name,
        itemToUpdate.weight,
        editQuantity, // Updated quantity
        itemToUpdate.description
      );

      // Create a DTO for updating the item and send the request
      const dto = new UpdateItemDto(bagId, updatedItem);
      await galaService.updateItemInBag(dto);

      // Update the local state to reflect the changes
      setItems((prev) =>
        prev.map((item) =>
          item.id === editItemId
            ? new ItemDto(item.id, item.name, item.weight, editQuantity, item.description)
            : item
        )
      );

      alert("Item updated successfully!");
      await fetchItems();
      setEditItemId(null); // Clear the editing state
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  // Handles deleting an item from the bag on the blockchain and removing it from the UI
  const handleDeleteItem = async (itemId: string) => {
    try {
      if (!bagId) return;

      // Create a DTO for removing the item
      const dto = new RemoveItemDto(bagId, itemId);
      await galaService.removeItemFromBag(dto);

      // Update the local state to remove the item
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      alert("Item deleted successfully!");
      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  // Fetch items when the component mounts or the bagId changes
  useEffect(() => {
    fetchItems();
  }, [bagId]);

  return (
    <div className="bag-management-container">
      {/* Title Section */}
      <h2>Insert Item to a Bag</h2>
      <h2>Manage Bag: {bagId}</h2>

      {loading ? (
        // Show loading state
        <p className="loading-text">Loading items...</p>
      ) : (
        // Display list of items
        <ul className="items-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              {/* Item Details */}
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Weight:</strong> {item.weight}
                </p>
                <p>
                  <strong>Quantity:</strong>{" "}
                  {editItemId === item.id ? editQuantity : item.quantity}
                </p>
              </div>

              {/* Actions for Edit/Delete */}
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
