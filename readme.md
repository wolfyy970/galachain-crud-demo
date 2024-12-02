# GalaChain CRUD Application

## Overview

This repository contains a full-stack blockchain application built on GalaChain, featuring a smart contract for bag management and with React-based frontend for interaction.

## Project Structure

```
├── GalaChainCode/          # GalaChain Smart Contract Implementation
├── frontend-app/       # React Frontend Application
└── README.md           # Root Project Documentation
```

## Components

### 1. Chaincode (Smart Contract)
- **Location**: `GalaChainCode/`
- **Technology**: TypeScript, GalaChain
- **Features**:
  - Implements CRUD operations for bag and item management
  - Robust testing and deployment workflows
  - Comprehensive key management
  - End-to-end testing support

#### Key Capabilities
- Create, read, update, and delete bags
- Manage bag contents
- Secure blockchain interactions

### 2. Frontend Application
- **Location**: `frontend-app/`
- **Technology**: React, TypeScript
- **Features**:
  - User interface for bag and item management
  - Supports local and testnet environments
  - Wallet integration
  - Dynamic environment configuration

#### Key Capabilities
- Create and manage bags
- Add/remove items from bags
- View bag contents
- Interact with GalaChain smart contract

## Prerequisites

- Node.js (v16+)
- npm
- Docker
- GalaChain CLI
- Ethereum Wallet (for testnet)

## Getting Started

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/wolfyy970/GalaChainCRUD
   cd GalaChainCRUD
   ```

2. Setup Chaincode
   ```bash
   cd GalaChainCode
   npm install
   npm run network:start
   ```

3. Setup Frontend
   ```bash
   cd ../frontend-app
   npm install
   npm start
   ```

## Deployment

### Chaincode Deployment
- Build Docker image
- Deploy to GalaChain network using GalaChain CLI
- Manage deployment keys

### Frontend Deployment
- Build production assets
- Deploy to web hosting platform

## Documentation

- [Chaincode README](GalaChainCode/readme.md)
- [Frontend App README](frontend-app/README.md)

## License

MIT License. See individual component READMEs for details.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Support

For issues and questions, please open a GitHub issue in the repository.