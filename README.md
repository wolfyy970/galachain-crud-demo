# Frontend GalaChain App for Contract CRUD

## Overview

This Frontend App is a React-based application designed for performing CRUD (Create, Read, Update, Delete) operations on a bag Contract. 

## Prerequisites

- Node.js (recommended version 16.x or later)
- npm (Node Package Manager)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/wolfyy970/GalaChainCRUD
cd frontend-app
```

### 2. Environment Setup

#### Environment Variables

1. Copy the environment template:

```bash
cp env.dev .env
```

2. Configure the environment:

Edit the `.env` file and set the environment:

```env
# Choose either 'local' or 'testnet'
REACT_APP_ENV=local
```

### 3. Install Dependencies

```bash
npm install
```

## Available Scripts

### Development

- `npm start`
  - Runs the app in development mode
  - Open [http://localhost:3000](http://localhost:3000) to view in browser
  

### Testing

- `npm test`
  - Launches the test runner in interactive watch mode
  - See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information

### Production Build

- `npm run build`
  - Builds the app for production in the `build` folder
  - Correctly bundles React in production mode
  - Optimizes the build for best performance
  - The build is minified with hashed filenames
  - App is ready for deployment

## Features

### Bag Management
- Create bags with unique ID, holder, and maximum weight
- View and manage bag contents

### Item Management
- Add items to bags
- Update item details (quantity)
- Remove items from bags
- Fetch and display bag items

## Environment Configuration

The app supports two primary environments:
- `local`: For testing with Gala Local network.

- `testnet`: For testing with Gala test network.

**Note: The Testnet environment needs an active mainnet Ethereum wallet and by default the app connects the installed wallet on your browser**

**Note: The Local environment needs an running gala network on local machine**

The environment is dynamically configured using the `REACT_APP_ENV` variable.

 


## Troubleshooting

- Ensure all environment variables are correctly set
- Check network connectivity for TestNet environments
- Verify Node.js and npm versions


## License

Distributed under the [Your License]. See `LICENSE` for more information.

