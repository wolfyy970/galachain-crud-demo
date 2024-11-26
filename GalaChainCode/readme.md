# GalaChain Project

A comprehensive implementation of smart contracts for the GalaChain blockchain platform, focusing on robust development, testing, and deployment workflows.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Chaincode Keys](#chaincode-keys)
- [Testing](#testing)
- [Development Workflow](#development-workflow)
- [License](#license)

## Overview

This project provides a robust framework for developing, testing, and deploying smart contracts on the GalaChain blockchain. Leveraging TypeScript, we ensure high code quality and comprehensive testing strategies.

## Prerequisites

Ensure you have the following tools installed:

- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher
- **Docker**: Required for running the GalaChain network
- **GalaChain CLI**: Installed and configured in your system PATH

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/wolfyy970/GalaChainCRUD
cd GalaChainCRUD
```

### 2. Install Dependencies

```bash
npm install
```
### 3. **Start Network**
   ```bash
   npm run network:start
   ```
   To run the network locally, make sure you have docker containers installed and running

## Project Structure

```
├── src/                # Smart contract implementations
├── e2e/                # End-to-end tests
├── keys/               # Public keys for chaincode deployment
├── lib/                # Compiled JavaScript files
├── test-network/       # GalaChain network configurations
└── README.md           # Project documentation
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Starts the GalaChain network |
| `npm run clean` | Removes build artifacts |
| `npm run build` | Compiles TypeScript code |
| `npm run build:watch` | Watches and compiles TypeScript code |
| `npm run lint` | Checks code quality with ESLint |
| `npm run fix` | Automatically fixes linting issues |
| `npm run format` | Formats code using Prettier |
| `npm run test` | Runs unit tests |
| `npm run test:e2e` | Executes end-to-end tests |
| `npm run network:start` | Deploys contracts to GalaChain network |

## Chaincode Keys

### Key Management

Chaincode keys are crucial for deploying and managing smart contracts.

#### Key Locations
- Admin Key: `keys/gc-admin-key.pub`
- Developer Key: `keys/gc-dev-key.pub`

### Generating Keys

If keys are not available, generate them using the GalaChain CLI:

```bash
# Generate admin key
galachain keygen gc-admin-key

# Generate developer key
galachain keygen gc-dev-key
```

**Note**: Share the developer key (`gc-dev-key.pub`) with team members involved in chaincode deployment.

## Testing

### Test Types
- **Unit Tests**: Verify individual contract components
- **End-to-End Tests**: Validate contract integration and blockchain interactions

### Running Tests

#### Unit Tests
```bash
npm run test
```

#### End-to-End Tests
```bash
npm run test:e2e
```

## Development Workflow

1. **Contract Development**
   - Implement contract logic in the `src/` directory
   - Follow TypeScript best practices
   - Write comprehensive unit tests

2. **Testing**
   - Create test cases in the `e2e/` directory
   - Verify contract functionality and network interactions
   - Ensure high test coverage

3. **Start Network**
   ```bash
   npm run network:start
   ```

4. **Debugging**
   - Utilize logs and test results
   - Leverage GalaChain CLI for network inspection

## Troubleshooting

- Ensure all prerequisites are correctly installed
- Verify network configurations
- Check key permissions and paths
- Review Docker and GalaChain CLI setup



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for detailed information.
.