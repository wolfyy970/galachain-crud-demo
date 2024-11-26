import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GalaServiceFactory } from "../Services/GalaServiceFactory";
import { AddItemDto, ItemDto } from "../dtos/dtos";
import "./css/SelectItem.css";

// Initialize defaultItems with proper ItemDto instances
const defaultItems: ItemDto[] = [
  new ItemDto("item1", "Sword", 5, 1, "Sharp steel sword"),
  new ItemDto("item2", "Shield", 10, 2, "Wooden shield"),
  new ItemDto("item3", "Health Potion", 2, 1, "Heals 50 HP"),
];

const SelectItems: React.FC = () => {
  const { bagId } = useParams<{ bagId: string }>();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null);

  const galaService = GalaServiceFactory.getGalaService();

  const handleSelectItem = (item: ItemDto) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item); // Toggle selection
  };

  const handleAddItemToBag = async () => {
    if (!bagId) {
      alert("Bag ID is missing!");
      return;
    }

    try {
      if (selectedItem) {
        const addItemDto = new AddItemDto(bagId, selectedItem);
        await galaService.addItemToBag(addItemDto);
        alert("Item added successfully!");
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
      <h2>Select Item for Bag: {bagId}</h2>
      <ul className="items-list">
        {defaultItems.map((item) => (
          <li
            key={item.id}
            className={`item ${selectedItem?.id === item.id ? "selected" : ""}`}
            onClick={() => handleSelectItem(item)}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Weight: {item.weight}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddItemToBag}
        disabled={!selectedItem}
        className="add-items-button"
      >
        Add Selected Item
      </button>
    </div>
  );
};

export default SelectItems;
