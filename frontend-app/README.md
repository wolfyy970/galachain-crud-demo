# Bag Management App

## Overview

This Bag Management App is a React-based application designed for performing CRUD (Create, Read, Update, Delete) operations on bags and their items. The project provides a comprehensive solution for managing bag inventories with flexible environment configuration.

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
  - The page will reload if you make edits
  - You will also see any lint errors in the console

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
- Update item details (quantity, etc.)
- Remove items from bags
- Fetch and display bag items

## Environment Configuration

The app supports two primary environments:
- `local`: For local development and testing
- `testnet`: For testing with remote test network

The environment is dynamically configured using the `REACT_APP_ENV` variable.

## Advanced Configuration

### Ejecting

**Note: This is a one-way operation. Once you eject, you can't go back!**

```bash
npm run eject
```

- Removes the single build dependency from your project
- Copies all configuration files and dependencies into your project
- Gives you full control over build tools and configuration

## Troubleshooting

- Ensure all environment variables are correctly set
- Check network connectivity for TestNet environments
- Verify Node.js and npm versions


## License

Distributed under the [Your License]. See `LICENSE` for more information.

