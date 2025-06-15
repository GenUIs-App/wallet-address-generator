const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Creates a new Ethereum wallet on mainnet and stores it in a file
 * @param {string} [desiredString] - Optional string that should be present in the wallet address
 * @returns {Object} Wallet object containing address and private key
 */
async function createWallet(desiredString = '') {
    try {
        let wallet;
        let attempts = 0;
        const maxAttempts = 10000000; // Safety limit to prevent infinite loops

        // Create a log file for this session
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        const timestamp = Date.now();
        const detailedLogFile = path.join(logDir, `wallet_generation_${timestamp}.log`);
        const addressLogFile = path.join(logDir, `wallet_addresses_${timestamp}.txt`);
        
        console.log('\n=== Starting Wallet Generation ===');
        console.log(`Desired string: "${desiredString}"`);
        console.log(`Detailed log file: ${detailedLogFile}`);
        console.log(`Address log file: ${addressLogFile}\n`);

        do {
            // Create a new random wallet
            wallet = ethers.Wallet.createRandom();
            attempts++;

            // Log each attempt with full wallet information
            const attemptLog = {
                attempt: attempts,
                address: wallet.address,
                privateKey: wallet.privateKey,
                timestamp: new Date().toISOString(),
            };
            
            // Append to detailed log file
            fs.appendFileSync(detailedLogFile, JSON.stringify(attemptLog, null, 2) + '\n');
            
            // Append address to address-only log file
            fs.appendFileSync(addressLogFile, wallet.address + '\n');
            
            // Log to console every 100 attempts
            if (attempts % 100 === 0) {
                console.log(`Attempt ${attempts}: ${wallet.address}`);
            }

            // If no desired string is provided, break after first attempt
            if (!desiredString) break;

            // If we've tried too many times, throw an error
            if (attempts >= maxAttempts) {
                throw new Error(`Could not find a wallet containing "${desiredString}" after ${maxAttempts} attempts`);
            }
        } while (!wallet.address.toLowerCase().includes(desiredString.toLowerCase()));

        // Get the wallet details
        const address = wallet.address;
        const privateKey = wallet.privateKey;
        
        // Create wallet data object
        const walletData = {
            address,
            privateKey,
            createdAt: new Date().toISOString(),
            attempts: attempts
        };

        // Create wallets directory if it doesn't exist
        const walletsDir = path.join(__dirname, '..', 'wallets');
        if (!fs.existsSync(walletsDir)) {
            fs.mkdirSync(walletsDir, { recursive: true });
        }

        // Save wallet data to file
        const fileName = `wallet_${address.slice(0, 8)}_${Date.now()}.json`;
        const filePath = path.join(walletsDir, fileName);
        
        fs.writeFileSync(filePath, JSON.stringify(walletData, null, 2));
        
        console.log('\n=== New Wallet Created ===');
        console.log('Address:', address);
        console.log('Private Key:', privateKey);
        if (desiredString) {
            console.log(`Found wallet containing "${desiredString}" after ${attempts} attempts`);
        }
        console.log('\nWallet information has been saved to:', filePath);
        console.log('Detailed log has been saved to:', detailedLogFile);
        console.log('Address log has been saved to:', addressLogFile);
        console.log('\nIMPORTANT: Keep the wallet file secure and never share it with anyone!');
        
        return walletData;
    } catch (error) {
        console.error('Error creating wallet:', error.message);
        throw error;
    }
}

// Execute if run directly
if (require.main === module) {
    // Get desired string from command line argument if provided
    const desiredString = process.argv[2] || '';
    createWallet(desiredString)
        .catch(console.error);
}

module.exports = { createWallet }; 
