# GalaChain Project

A implementation of smart contracts with basic crud functionality in the GalaChain blockchain platform, focusing on robust development, testing, and deployment workflows of gala contracts.

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
cd GalaChainCode
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
| `npm run network:start` | Start The Network Locally |

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

**Note**: Current Project Keys Public keys (`gc-dev-key.pub`),(`gc-admin-key.pub`) are in keys folder and private keys are in env But they can also be founds under in root(~/.gc-keys) of your local machine when you init galachain app or used keygen commands .

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
**Note**: Ensure To Run Tests Only When Network is Running.


## Development Workflow

1. **Contract Development**
   - Implement contract logic in the `src/` directory
   - Follow TypeScript best practices
   - Write comprehensive unit tests

2. **Start Network**
   ```bash
   npm run network:start
   ```
   
3. **Testing**
   - Create test cases in the `e2e/` directory
   - Verify contract functionality and network interactions
   - Ensure high test coverage
   

4. **Debugging**
   - Utilize logs and test results
   - Leverage GalaChain CLI for network inspection


# GalaChain Chaincode Deployment Guide

### 1. Build and Publish Docker Image

#### Using ttl.sh (Temporary Image Hosting)
```bash
docker build --push -t ttl.sh/your-unique-image-name:1d .
```

**Key Points:**
- Replace `your-unique-image-name` with a descriptive name
- `:1d` creates a 24-hour temporary image
- The image name in this example is `ttl.sh/crud_v1`

### 2. Deploy Chaincode to Testnet or Sandbox

```bash
galachain deploy /gc-dev-key \
  --docker-image-tag ttl.sh/your-unique-image-name:1d
```

**Important Notes:**
- Use the full docker image tag
- Ensure you have the correct developer key path
- Specify the exact docker image and version

### 3. Fetch Chaincode Information

```bash
galachain info /gc-dev-key
```
**This Will Show Response Object:**

  -   "org": "Testnet03Org",
  -   "channel": "testnet03",
  -   "chaincode": "gc-934ed10e3aa04e39744dbaf3e6da7c804acb8010",
  -   "imageName": "ttl.sh/crud_v1",
  -   "status": "CC_DEPLOYED",
  -   "lastOperationId": "1732109568",
  -   "adminPublicKey": "0427c2f7e66bec7fc1f7c962357079e4e8d08cf4e0ab9f6cc89ba491edd2247b47d6e6a76b2f8f1e624e571f5ded158692dddc6524ce31feb804b0bb8043988df6",
  -   "lastUpdated": "2024-11-20T14:22:10.210Z"

## Best Practices

- Use unique, descriptive image names
- Version your images consistently
- Keep track of deployment tags
- Verify image availability before deployment


## Example Workflow

```bash
# Build and push image
docker build --push -t ttl.sh/my-galachain-contract:1d .

# Deploy to testnet
galachain deploy /gc-dev-key \
  --docker-image-tag ttl.sh/my-galachain-contract:1d

# Fetch deployment info
galachain info /gc-dev-key
```

## Additional Resources
- [GalaChain CLI Documentation](https://docs.gala.com/cli)
- [Docker Documentation](https://docs.docker.com)

## Troubleshooting

- Ensure all prerequisites are correctly installed
- Verify network configurations
- Check key permissions and paths
- Review Docker and GalaChain CLI setup
- Confirm Docker image builds successfully
- Check network connectivity
- Verify developer key permissions
- Review GalaChain CLI logs for detailed error messages


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for detailed information.
.