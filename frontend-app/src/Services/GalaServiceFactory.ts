import TestNetGalaService from "./TestNetGalaService";
import LocalnetGalaService from "./LocalnetGalaService";
import { IGalaService } from "./IGalaService";

export class GalaServiceFactory {
  static getGalaService(): IGalaService {
    try {
      const env = process.env.REACT_APP_ENV; // Set up environment variable (local/testnet)

      if (env === "testnet") {
        return new TestNetGalaService();
      }

      return new LocalnetGalaService();
    } catch (error) {
      console.error("Error initializing GalaService:", error);
      throw new Error("Failed to initialize GalaService. Please check your environment configuration.");
    }
  }
}
