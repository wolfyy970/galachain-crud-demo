import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalaServiceFactory } from "../Services/GalaServiceFactory";
import { BagDto } from "../dtos/dtos";
import "./css/AddBag.css";

const AddBag: React.FC = () => {
  const [bagId, setBagId] = useState<string>("");
  const [bagHolder, setBagHolder] = useState<string>("");
  const [maxWeight, setMaxWeight] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const galaService = GalaServiceFactory.getGalaService(); // Fetch the appropriate service dynamically
  const navigate = useNavigate();

  const handleCreateBag = async () => {
    if (!bagId || !bagHolder) {
      alert("Both Bag ID and Bag Holder are required!");
      return;
    }

    // Create a new BagDto instance
    const newBag = new BagDto(bagHolder, bagId, maxWeight);

    try {
      setLoading(true);
      await galaService.createBag(newBag); // Pass DTO to the service
      alert("Bag created successfully!");
      navigate(`/select-items/${bagId}`);
    } catch (error) {
      console.error("Error creating bag:", error);
      alert("Failed to create bag. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-bag-container">
      <h2 className="add-bag-title">Create a Bag</h2>
      <input
        type="text"
        placeholder="Bag Holder"
        value={bagHolder}
        onChange={(e) => setBagHolder(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bag ID"
        value={bagId}
        onChange={(e) => setBagId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Weight"
        value={maxWeight}
        onChange={(e) => setMaxWeight(Number(e.target.value))}
      />
      <button onClick={handleCreateBag} disabled={loading}>
        {loading ? "Creating..." : "Create Bag"}
      </button>
    </div>
  );
};

export default AddBag;
