import { getPlayer } from '@dcl/sdk/src/players'
import { engine, executeTask } from '@dcl/sdk/ecs';
import { Dialog } from 'dcl-npc-toolkit'
import decreaseTrustScoreABI from './TrustScoreAbi';
import { RequestManager, ContractFactory } from 'eth-connect'
import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'


export function decreaseScore(){
  score = score - 10;
  return score;
}
async function interactWithContract() {try{
  const provider = createEthereumProvider()
  console.log("provide created")
  const requestManager = new RequestManager(provider);
  const factory = new ContractFactory(requestManager, decreaseTrustScoreABI)
  const contract = (await factory.at(
    '0xD051b427a57546F850D070E8C477dBD0E794287f'
  )) as any
  let userData = getPlayer()
		if (userData && userData.userId) {
			return
		}
  console.log("SUCCESS!!!!!");
  // Call the decreaseTrustScore function from thee smart contract
  const tx = await contract.decreaseTrustScore({from: userData && userData.userId,});
  await tx.wait(); // Wait for the transaction to be mined
  console.log('Trust score decreased successfully!');
}
catch (error: any) {
  console.log(error.toString())
}
}

// Function to interact with the token contract
/*async function interactWithTokenContract() {
  try {
    console.log('Attempting to transfer tokens...');
    const provider = new InfuraProvider("sepolia","f976f1b30d114f229292eb1fb30b19b5");
  console.log('Provider:', provider);
  const wallet = new Wallet("a8e84371db9cf65c3583c3dc2b2a68849dfefd04f969a6763f6b94c8af673012", provider);
  const signer = wallet.connect(provider);
  const tokenAddress = "0xfb6c725b2dab0b06912e45d8db96692cf38d2bd8"; 
  const tokenABI = MetaCoinABI; 
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
  // Code to transfer tokens to another address
  const recipientAddress = "0xE2678bbe1a0F18dbb6A776De285fFf25171577A3";
  const amount = ethers.parseEther('1'); // 1 token

  const tx = await tokenContract.transfer(recipientAddress, amount);
  await tx.wait(); // Wait for the transaction to be mined
  console.log('Tokens transferred successfully!');
} catch (error) {
  console.error('Error transferring tokens:', error);}
}*/

executeTask(async function () {
	// create an instance of the web3 provider to interface with Metamask
	
})
let score = 100;
export let testscript: Dialog[] = [
  {
    text: `Hi there! Welcome to the Trust but Verify scene.`
    // portrait: {
    //   path: 'images/npc.png'
    // }
  },
  {
    text: `Can you help me finding my missing gems?`,
    isQuestion: true,
    name: 'masha',
    buttons: [
      { label: `Yes!`, goToDialog: 2 },
      { label: `I'm busy`, goToDialog: 3 },
      { label: `Leave me alone`, goToDialog: 4, triggeredActions:async ()=>{ 
        console.log('Negative Behavior');
        console.log(`The user score is ${decreaseScore()}`);
        await interactWithContract();
        console.log("The contract has been interacted");
      } }
    ]
  },
  {
    text: `Ok, awesome, thanks!`
  },
  {
    text: `Ok, come back soon`,
    isEndOfDialog: true,
    name: 'testing'
  },
  {
    text: `It is a bad behaviour from your side and that will affect in your Trust Score!`,
    isEndOfDialog: true,
    }
    
    

]
export default testscript;

export let dogeDialog = [
  {
    text: 'Show doge'
  },
  {
    text: 'Happy Robot',
    portrait: {
      path: 'images/simone/happy1.png'
    }
  },
  {
    text: 'go back to doge'
  },
  {
    text: 'Surprised Robot',
    portrait: {
      path: 'images/simone/surprise1.png'
    }
  },
  {
    text: 'go back to doge'
  },
  {
    text: 'Sad Robot',
    portrait: {
      path: 'images/simone/sad1.png'
    }
  },
  {
    text: 'End',
    isEndOfDialog: true
  }
]
export let avatarDialog = [

]


function log(arg0: string) {
  throw new Error('Function not implemented.');
}

