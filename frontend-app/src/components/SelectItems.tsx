import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GalaServiceFactory } from "../Services/GalaServiceFactory";
import { AddItemDto, ItemDto } from "../dtos/dtos";
import "./css/SelectItem.css";

// Initialize default items to display for selection
const defaultItems: ItemDto[] = [
  new ItemDto("item1", "Sword", 5, 1, "Sharp steel sword"),
  new ItemDto("item2", "Shield", 10, 2, "Wooden shield"),
  new ItemDto("item3", "Health Potion", 2, 1, "Heals 50 HP"),
];

const SelectItems: React.FC = () => {
  // Extract the `bagId` from the URL parameters
  const { bagId } = useParams<{ bagId: string }>();

  // Navigate programmatically after an item is added
  const navigate = useNavigate();

  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null);

  // Dynamically fetch the appropriate Gala service instance
  const galaService = GalaServiceFactory.getGalaService();

  // Handle selecting or deselecting an item
  const handleSelectItem = (item: ItemDto) => {
    // Toggle the selected item (deselect if clicked again)
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  // Handle adding the selected item to the bag
  const handleAddItemToBag = async () => {
    // Ensure the bag ID is available
    if (!bagId) {
      alert("Bag ID is missing!");
      return;
    }

    try {
      if (selectedItem) {
        // Prepare the DTO for adding an item to the bag
        const addItemDto = new AddItemDto(bagId, selectedItem);

        // Make the API call to add the item
        await galaService.addItemToBag(addItemDto);

        alert("Item added successfully!");
        // Navigate to the bag management page after adding the item
        navigate(`/bag-management/${bagId}`);
      } else {
        alert("Please select an item first!");
      }
    } catch (error) {
      console.error("Error adding item to bag:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="select-items-container">
      {/* Page title */}
      <h2>Select Item for Bag: {bagId}</h2>

      {/* List of items available for selection */}
      <ul className="items-list">
        {defaultItems.map((item) => (
          <li
            key={item.id}
            className={`item ${selectedItem?.id === item.id ? "selected" : ""}`} // Highlight the selected item
            onClick={() => handleSelectItem(item)}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Weight: {item.weight}</p>
          </li>
        ))}
      </ul>

      {/* Button to add the selected item to the bag */}
      <button
        onClick={handleAddItemToBag}
        disabled={!selectedItem} // Disable button if no item is selected
        className="add-items-button"
      >
        Add Selected Item
      </button>
    </div>
  );
};

export default SelectItems;
