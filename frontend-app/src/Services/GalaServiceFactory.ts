import TestNetGalaService from "./TestNetGalaService";
import LocalnetGalaService from "./LocalnetGalaService";
import { IGalaService } from "./IGalaService";

/**
 * Factory class to create an instance of the appropriate Gala service based on the environment.
 */
export class GalaServiceFactory {
  /**
   * Returns an instance of IGalaService based on the environment configuration.
   * 
   * @returns {IGalaService} An instance of the appropriate service (TestNet or LocalNet).
   * @throws Will throw an error if the environment configuration is invalid or initialization fails.
   */
  static getGalaService(): IGalaService {
    try {
      // Fetch the environment variable to determine which service to initialize
      const env = process.env.REACT_APP_ENV;

      // Check if the environment is set to "testnet"
      if (env === "testnet") {
        // Return the TestNetGalaService instance for the testnet environment
        return new TestNetGalaService();
      }

      // Default to LocalnetGalaService for local environment
      return new LocalnetGalaService();
    } catch (error) {
      // Log the error if there is an issue initializing the service
      console.error("Error initializing GalaService:", error);

      // Throw a descriptive error to help with debugging
      throw new Error(
        "Failed to initialize GalaService. Please check your environment configuration."
      );
    }
  }
}
