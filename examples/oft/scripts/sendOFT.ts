import { ethers } from 'ethers'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import MyOFT from '../deployments/sepolia-testnet/MyOFT.json'

import 'dotenv/config'

const YOUR_OFT_ADDRESS = '0x68dA7c8c14d397bDF462a93b956c9FF43e9b110a'
const YOUR_RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/-Z5IK5ZknQgG4obvaW3fCSA92G8-5CPE'
const DESTINATION_ENDPOINT_ID = 40232

async function sendOFT(amt: number) {
    // Setup provider and signer
    const provider = new ethers.providers.JsonRpcProvider(YOUR_RPC_URL)
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC || '').connect(provider)

    const oft = new ethers.Contract(YOUR_OFT_ADDRESS, MyOFT.abi, wallet)
    const decimals = await oft.decimals()
    const amount = ethers.utils.parseUnits(amt.toString(), decimals)
    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()

    const sendParam = [
        DESTINATION_ENDPOINT_ID,
        ethers.utils.zeroPad(wallet.address, 32),
        amount,
        amount,
        options,
        '0x',
        '0x',
    ]
    console.log(sendParam)
    const [nativeFee] = await oft.quoteSend(sendParam, false)
    console.log('quoteSend: ', nativeFee)

    const tx = await oft.send(sendParam, [nativeFee, 0], wallet.address, {
        value: nativeFee,
        gasLimit: 300000,
    })
    console.log(`Transaction initiated. See: https://testnet.layerzeroscan.com/tx/${tx.hash}`)
}

// Call the function to send a message
sendOFT(1).catch(console.error)
