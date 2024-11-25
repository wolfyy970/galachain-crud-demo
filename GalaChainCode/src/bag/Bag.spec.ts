import { Bag } from "./Bag";
import { ItemDto } from "./dtos";

/*
 * Unit tests for the Bag class
 */

it("should create a new bag with correct properties", () => {
  // Given
  const bagHolder = "user1"; // The owner of the bag
  const bagId = "bag1"; // Unique identifier for the bag
  const maxWeight = 100; // Maximum weight the bag can hold

  // When
  const bag = new Bag(bagHolder, bagId, maxWeight);

  // Then
  // Validate that the bag properties are initialized correctly
  expect(bag.bagHolder).toBe(bagHolder);
  expect(bag.id).toBe(bagId);
  expect(bag.maxWeight.toNumber()).toBe(maxWeight);
  expect(bag.currentWeight.toNumber()).toBe(0); // Default current weight is 0
  expect(bag.items).toEqual([]); // Bag starts with no items
});

it("should add an item to the bag if weight constraints allow", () => {
  // Given
  const bag = new Bag("user1", "bag1", 100); // Create a bag with a max weight of 100
  const item = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Item with total weight 20

  // When
  bag.addItem(item);

  // Then
  // Validate that the item's weight is added to the bag's current weight
  expect(bag.currentWeight.toNumber()).toBe(20); // 10 (weight per unit) * 2 (quantity)
  expect(bag.items.length).toBe(1); // Bag contains 1 item
  expect(bag.items[0]).toEqual(item); // The added item matches the input
});

it("should throw an error when adding an item that exceeds max weight", () => {
  // Given
  const bag = new Bag("user1", "bag1", 15); // Create a bag with a max weight of 15
  const item = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Item with total weight 20

  // When / Then
  // Adding this item should throw an error since it exceeds the max weight
  expect(() => bag.addItem(item)).toThrow("Cannot add or update item. Exceeds bag's max weight");
});

it("should remove an item from the bag by ID", () => {
  // Given
  const bag = new Bag("user1", "bag1", 100); // Create a bag with a max weight of 100
  const item = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Add an item
  bag.addItem(item);

  // When
  bag.removeItem("item1"); // Remove the item by ID

  // Then
  // Validate that the item's weight is subtracted from the bag's current weight
  expect(bag.currentWeight.toNumber()).toBe(0); // Current weight is back to 0
  expect(bag.items.length).toBe(0); // Bag contains no items
});

it("should throw an error when removing a non-existent item", () => {
  // Given
  const bag = new Bag("user1", "bag1", 100); // Create a bag with a max weight of 100

  // When / Then
  // Attempting to remove an item that doesn't exist should throw an error
  expect(() => bag.removeItem("item1")).toThrow("Item with ID item1 not found in the bag");
});

it("should update an existing item in the bag", () => {
  // Given
  const bag = new Bag("user1", "bag1", 100); // Create a bag with a max weight of 100
  const originalItem = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Original item
  const updatedItem = new ItemDto("item1", "Updated Item", 15, 3, "Updated description"); // Updated item
  bag.addItem(originalItem);

  // When
  bag.updateItem(updatedItem); // Update the existing item

  // Then
  // Validate that the updated item is reflected in the bag
  expect(bag.currentWeight.toNumber()).toBe(45); // 15 (weight per unit) * 3 (quantity)
  expect(bag.items.length).toBe(1); // Bag still contains 1 item
  expect(bag.items[0]).toEqual(updatedItem); // The updated item matches the input
});

it("should throw an error when updating a non-existent item", () => {
  // Given
  const bag = new Bag("user1", "bag1", 100); // Create a bag with a max weight of 100
  const updatedItem = new ItemDto("item1", "Updated Item", 15, 3, "Updated description"); // Item to update

  // When / Then
  // Attempting to update an item that doesn't exist should throw an error
  expect(() => bag.updateItem(updatedItem)).toThrow("Item with ID item1 not found in the bag");
});

it("should throw an error when updating an item that exceeds max weight", () => {
  // Given
  const bag = new Bag("user1", "bag1", 30); // Create a bag with a max weight of 30
  const originalItem = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Original item
  const updatedItem = new ItemDto("item1", "Updated Item", 20, 2, "Updated description"); // Updated item with total weight 40
  bag.addItem(originalItem);

  // When / Then
  // Attempting to update an item that exceeds max weight should throw an error
  expect(() => bag.updateItem(updatedItem)).toThrow("Cannot add or update item. Exceeds bag's max weight");
});

it("should fetch all items in the bag", () => {
  // Given
  const bag = new Bag("user1", "bag1", 100); // Create a bag with a max weight of 100
  const item1 = new ItemDto("item1", "Item 1", 10, 2, "Sample item"); // Add first item
  const item2 = new ItemDto("item2", "Item 2", 5, 3, "Another sample item"); // Add second item
  bag.addItem(item1);
  bag.addItem(item2);

  // When
  const items = bag.fetchItems(); // Fetch all items in the bag

  // Then
  // Validate that all added items are returned
  expect(items.length).toBe(2); // Bag contains 2 items
  expect(items).toEqual([item1, item2]); // Items match the added ones
});
