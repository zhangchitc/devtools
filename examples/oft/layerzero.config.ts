import { EndpointId } from '@layerzerolabs/lz-definitions'
const optimism_testnetContract = {
    eid: EndpointId.OPTSEP_V2_TESTNET,
    contractName: 'MyOFT',
}
const sepolia_testnetContract = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyOFT',
}
export default {
    contracts: [{ contract: optimism_testnetContract }, { contract: sepolia_testnetContract }],
    connections: [
        {
            from: optimism_testnetContract,
            to: sepolia_testnetContract,
            config: {
                sendLibrary: '0xB31D2cb502E25B30C651842C7C3293c51Fe6d16f',
                receiveLibraryConfig: { receiveLibrary: '0x9284fd59B95b9143AF0b9795CAC16eb3C723C9Ca', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xDc0D68899405673b932F0DB7f8A49191491A5bcB' },
                    ulnConfig: {
                        confirmations: 1,
                        requiredDVNs: ['0xd680ec569f269aa7015F7979b4f1239b5aa4582C'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 2,
                        requiredDVNs: ['0xd680ec569f269aa7015F7979b4f1239b5aa4582C'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: sepolia_testnetContract,
            to: optimism_testnetContract,
            config: {
                sendLibrary: '0xcc1ae8Cf5D3904Cef3360A9532B477529b177cCE',
                receiveLibraryConfig: { receiveLibrary: '0xdAf00F5eE2158dD58E0d3857851c432E34A3A851', gracePeriod: 0 },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x718B92b5CB0a5552039B593faF724D182A881eDA' },
                    ulnConfig: {
                        confirmations: 2,
                        requiredDVNs: ['0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: 1,
                        requiredDVNs: ['0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}
