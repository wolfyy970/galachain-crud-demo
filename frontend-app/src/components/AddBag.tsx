import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalaServiceFactory } from "../Services/GalaServiceFactory";
import { BagDto } from "../dtos/dtos";
import "./css/AddBag.css";

const AddBag: React.FC = () => {
  // State variables to store user input for bag creation
  const [bagId, setBagId] = useState<string>(""); // Stores the Bag ID entered by the user
  const [bagHolder, setBagHolder] = useState<string>(""); // Stores the Bag Holder's name or ID
  const [maxWeight, setMaxWeight] = useState<number>(10); // Default maximum weight of the bag
  const [loading, setLoading] = useState<boolean>(false); // Tracks the loading state during the API call

  // Fetch the appropriate service instance dynamically based on the environment
  const galaService = GalaServiceFactory.getGalaService();

  // Used for navigation to other pages
  const navigate = useNavigate();

  // Function to handle bag creation when the form is submitted
  const handleCreateBag = async () => {
    // Validation: Ensure both Bag ID and Bag Holder fields are filled
    if (!bagId || !bagHolder) {
      alert("Both Bag ID and Bag Holder are required!"); // Alert the user if any field is missing
      return;
    }

    // Create a new BagDto instance with the entered details
    const newBag = new BagDto(bagHolder, bagId, maxWeight);

    try {
      setLoading(true); // Set loading state to true while the API call is in progress

      // Call the Gala service to create a bag on the blockchain
      await galaService.createBag(newBag);

      alert("Bag created successfully!"); // Notify the user of successful creation

      // Redirect the user to the "Select Items" page for the created bag
      navigate(`/select-items/${bagId}`);
    } catch (error) {
      // Log and alert the user in case of an error
      console.error("Error creating bag:", error);
      alert("Failed to create bag. Please try again.");
    } finally {
      setLoading(false); // Reset loading state once the operation completes
    }
  };

  return (
    <div className="add-bag-container">
      {/* Page title */}
      <h2 className="add-bag-title">Create a Bag </h2>

      {/* Input field for Bag Holder */}
      <input
        type="text"
        placeholder="Bag Holder"
        value={bagHolder}
        onChange={(e) => setBagHolder(e.target.value)} // Update state on input change
      />

      {/* Input field for Bag ID */}
      <input
        type="text"
        placeholder="Bag ID"
        value={bagId}
        onChange={(e) => setBagId(e.target.value)} // Update state on input change
      />

      {/* Input field for Maximum Weight */}
      <input
        type="number"
        placeholder="Max Weight"
        value={maxWeight}
        onChange={(e) => setMaxWeight(Number(e.target.value))} // Update state on input change
      />

      {/* Button to trigger bag creation */}
      <button onClick={handleCreateBag} disabled={loading}>
        {/* Show "Creating..." text when the API call is in progress */}
        {loading ? "Creating..." : "Create Bag"}
      </button>
    </div>
  );
};

export default AddBag;
