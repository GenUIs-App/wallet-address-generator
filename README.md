# Blockchain Wallet Creation Tool

[Tiếng Việt](README.vi.md) | English

A simple Node.js tool to create Ethereum wallets on mainnet and store them securely.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

To create a new wallet, you can use either of these commands:

```bash
# Create a random wallet
npm start

# Create a wallet with a specific string in its address
npm start "12345"  # Will create a wallet with "12345" in its address

# Or using the create-wallet script
npm run create-wallet "12345"

# Or directly with node
node src/index.js "12345"
```

The tool will:
1. Generate a new Ethereum wallet
   - If a string is provided, it will keep generating wallets until it finds one containing that string
   - The search is case-insensitive
   - All attempts are logged to files in the `logs` directory
2. Display the address and private key
3. Save the wallet information to a JSON file in the `wallets` directory
   - File format: `wallet_[address_prefix]_[timestamp].json`
   - Contains: address, private key, creation timestamp, and number of attempts (if string matching was used)

## Logging

The tool creates two types of logs for each generation session:

### 1. Detailed Log (`wallet_generation_[timestamp].log`)
Contains complete information for every attempt:
- Attempt number
- Generated address
- Private key
- Timestamp
- Whether the address contains the desired string (if specified)

### 2. Address-Only Log (`wallet_addresses_[timestamp].txt`)
A simple text file with one address per line for easy tracking:
```
0x1234...
0x5678...
0x9abc...
```

- Console output shows progress every 100 attempts
- Both logs are stored in the `logs` directory
- Each generation session creates new log files with a timestamp

⚠️ **IMPORTANT**: 
- The wallet files are stored in the `wallets` directory
- Keep the wallet files secure and never share them with anyone
- Consider encrypting the wallet files for additional security
- Store backup copies of wallet files in a secure location
- Consider using a hardware wallet for large amounts
- Searching for specific strings in addresses may take longer depending on the string
- Log files contain private keys - keep them secure!

## Security Notes

- This tool generates wallets locally on your machine
- Private keys are stored in JSON files in the `wallets` directory
- Wallet files are never transmitted over the network
- Always verify you're on a secure connection when using the generated wallet
- Consider using a hardware wallet for additional security
- Log files contain sensitive information - handle with care!

## Development

To run tests:
```bash
npm test
``` 
