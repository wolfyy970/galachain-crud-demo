/*
 * Tests for DTOs (Data Transfer Objects) for Bag and Items
 * This test suite validates the DTOs used for transferring data within the Bag system.
 */
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { AddItemDto, BagDto, FetchBagItemsDto, ItemDto, RemoveItemDto, UpdateItemDto } from "./dtos";

/**
 * Tests the validation of a valid BagDto.
 */
it("should validate a valid BagDto", async () => {
  // Given: A valid BagDto instance with all required fields
  const validDto = new BagDto("user1", "bag1", 100);

  // When: The BagDto is validated
  const errors = await validate(validDto);

  // Then: The BagDto should have no validation errors
  expect(errors.length).toBe(0);
});

/**
 * Tests the validation of a BagDto with missing fields.
 */
it("should fail BagDto validation with missing fields", async () => {
  // Given: An invalid BagDto with missing fields
  const invalidDto = plainToInstance(BagDto, {});

  // When: The BagDto is validated
  const errors = await validate(invalidDto);

  // Then: Validation errors should occur, indicating the missing fields
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.map((e) => e.property)).toEqual(expect.arrayContaining(["bagHolder", "id", "maxWeight"]));
});

/**
 * Tests the validation of a valid ItemDto.
 */
it("should validate a valid ItemDto", async () => {
  // Given: A valid ItemDto instance with all required fields
  const validDto = new ItemDto("item1", "Item 1", 10, 2, "Sample item");

  // When: The ItemDto is validated
  const errors = await validate(validDto);

  // Then: The ItemDto should have no validation errors
  expect(errors.length).toBe(0);
});

/**
 * Tests the validation of a valid AddItemDto.
 */
it("should validate a valid AddItemDto", async () => {
  // Given: A valid AddItemDto instance with a valid item
  const item = new ItemDto("item1", "Item 1", 10, 2, "Sample item");
  const validDto = new AddItemDto("bag1", item);

  // When: The AddItemDto is validated
  const errors = await validate(validDto);

  // Then: The AddItemDto should have no validation errors
  expect(errors.length).toBe(0);
});

/**
 * Tests the validation of a valid RemoveItemDto.
 */
it("should validate a valid RemoveItemDto", async () => {
  // Given: A valid RemoveItemDto instance with all required fields
  const validDto = new RemoveItemDto("bag1", "item1");

  // When: The RemoveItemDto is validated
  const errors = await validate(validDto);

  // Then: The RemoveItemDto should have no validation errors
  expect(errors.length).toBe(0);
});

/**
 * Tests the validation of a RemoveItemDto with missing fields.
 */
it("should fail RemoveItemDto validation with missing fields", async () => {
  // Given: An invalid RemoveItemDto with missing fields
  const invalidDto = plainToInstance(RemoveItemDto, {});

  // When: The RemoveItemDto is validated
  const errors = await validate(invalidDto);

  // Then: Validation errors should occur, indicating the missing fields
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.map((e) => e.property)).toEqual(expect.arrayContaining(["bagId", "itemId"]));
});

/**
 * Tests the validation of a valid UpdateItemDto.
 */
it("should validate a valid UpdateItemDto", async () => {
  // Given: A valid UpdateItemDto instance with a valid updated item
  const item = new ItemDto("item1", "Updated Item", 20, 3, "Updated description");
  const validDto = new UpdateItemDto("bag1", item);

  // When: The UpdateItemDto is validated
  const errors = await validate(validDto);

  // Then: The UpdateItemDto should have no validation errors
  expect(errors.length).toBe(0);
});

/**
 * Tests the validation of a valid FetchBagItemsDto.
 */
it("should validate a valid FetchBagItemsDto", async () => {
  // Given: A valid FetchBagItemsDto instance with the required bag ID
  const validDto = new FetchBagItemsDto("bag1");

  // When: The FetchBagItemsDto is validated
  const errors = await validate(validDto);

  // Then: The FetchBagItemsDto should have no validation errors
  expect(errors.length).toBe(0);
});

/**
 * Tests the validation of a FetchBagItemsDto with missing fields.
 */
it("should fail FetchBagItemsDto validation with missing fields", async () => {
  // Given: An invalid FetchBagItemsDto with missing fields
  const invalidDto = plainToInstance(FetchBagItemsDto, {});

  // When: The FetchBagItemsDto is validated
  const errors = await validate(invalidDto);

  // Then: Validation errors should occur, indicating the missing fields
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.map((e) => e.property)).toEqual(expect.arrayContaining(["bagId"]));
});
