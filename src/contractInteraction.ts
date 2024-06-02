// Import necessary libraries and modules
import { RequestManager, ContractFactory } from 'eth-connect'
import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'
// Import ethers.js for Ethereum interaction
import { ethers } from 'ethers';
// Import the smart contract ABI (Application Binary Interface)
import UserScoreABI from './UserScoreABI';
import { executeTask } from '@dcl/sdk/ecs';

 executeTask(async () => {
	// create an instance of the web3 provider to interface with Metamask
	const provider = createEthereumProvider()
	// Create the object that will handle the sending and receiving of RPC messages
	const requestManager = new RequestManager(provider)
	// Create a factory object based on the abi
	const factory = new ContractFactory(requestManager, UserScoreABI)
	// Use the factory object to instance a `contract` object, referencing a specific contract
	const contract = (await factory.at(
		'0x981C4ca8ECbB1FFFe0fFc0be447A98BC39966B5E'
	)) as any
})
