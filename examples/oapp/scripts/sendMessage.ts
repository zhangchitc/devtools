import { ethers } from 'ethers'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import MyOApp from '../deployments/sepolia-testnet/MyOApp.json'

import 'dotenv/config'

const YOUR_OAPP_ADDRESS = '0x2E7FA45E771172Cb01f65a627Ae50ba2161b5c19'
const YOUR_RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/-Z5IK5ZknQgG4obvaW3fCSA92G8-5CPE'
const DESTINATION_ENDPOINT_ID = 40232

async function sendMessage(message: string) {
    // Setup provider and signer
    const provider = new ethers.providers.JsonRpcProvider(YOUR_RPC_URL)
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC || '').connect(provider)

    // Create contract instance
    const oappContract = new ethers.Contract(YOUR_OAPP_ADDRESS, MyOApp.abi, wallet)
    // Get quote for the message
    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()

    console.log('options', options)

    const [nativeFee, lzTokenFee] = await oappContract.quote(DESTINATION_ENDPOINT_ID, message, options, false)
    console.log(
        `Quote received - Native fee: ${ethers.utils.formatEther(nativeFee)} ETH, LZ token fee: ${ethers.utils.formatEther(lzTokenFee)} ETH`
    )

    // // Prepare options for the transaction (adjust gas as needed)
    // const options = ethers.utils.defaultAbiCoder.encode(["uint256"], [200000]); // Example option

    // Send the transaction
    const tx = await oappContract.send(DESTINATION_ENDPOINT_ID, message, options, {
        value: nativeFee,
        gasLimit: 300000,
    })

    console.log(`Transaction initiated. See: https://testnet.layerzeroscan.com/tx/${tx.hash}`)
}

// Call the function to send a message
sendMessage('Hello Chi').catch(console.error)
