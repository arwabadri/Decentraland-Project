import { ColliderLayer, engine, Entity, executeTask, InputAction, Material, MeshCollider, MeshRenderer, pointerEventsSystem, TextShape, Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as npc from 'dcl-npc-toolkit'
/// <reference types="@dcl/sdk-types" />
import { setupUi } from './setupUI'
import { testscript } from './dialogs'
import { createDogeNpc } from './dogeNpc'
//import { createAvatar } from './avatar'
import { getPlayer } from '@dcl/sdk/src/players'
import { ethers } from 'ethers';
import MetaCoinABI from './metaCoinAbi';
import { Provider, Wallet } from 'ethers/lib.commonjs/ethers';
import { ReactEcsRenderer} from '@dcl/sdk/react-ecs'



/*let provider: Provider;
function createEthereumProvider(): Provider {
	const provider = new InfuraProvider( "https://sepolia.infura.io/v3/f976f1b30d114f229292eb1fb30b19b5");
  return provider;
}
// Function to interact with the token contract
async function interactWithTokenContract() {
  try {
    console.log('Attempting to transfer tokens...');
  const provider = createEthereumProvider();
  console.log('Provider:', provider);
  const wallet = new Wallet('a8e84371db9cf65c3583c3dc2b2a68849dfefd04f969a6763f6b94c8af673012', provider);
  const signer = wallet.connect(provider);

  const tokenAddress = '0xdAaD045Fe2Ca57Ef254abB4F0Db6C1F29B124d3E'; 
  const tokenABI = MetaCoinABI; 

  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

  // Code to transfer tokens to another address
  const recipientAddress = '0xE2678bbe1a0F18dbb6A776De285fFf25171577A3';
  const amount = ethers.parseEther('1'); // 1 token

  const tx = await tokenContract.transfer(recipientAddress, amount);
  await tx.wait(); // Wait for the transaction to be mined
  console.log('Tokens transferred successfully!');
} catch (error) {
  console.error('Error transferring tokens:', error);}
}


interactWithTokenContract();*/



export async function main() {

  let userData = getPlayer()
	if (userData && userData.userId) {
    console.log("The player is connected with Web3")
		console.log(userData.userId)
	} else {
		log('Player is not connected with Web3')
	}

  let marsha = npc.create(
    {
      position: Vector3.create(9, 1, 8),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(1, 1, 1)
    },
    {
      type: npc.NPCType.CUSTOM,
      model: {
        src: 'models/marsha.glb'
      },
      faceUser: true,
      portrait: { path: 'images/marsha.png' },
      onActivate: () => {
        npc.talk(marsha, testscript)
      },
      onWalkAway: () => {
        console.log('test on walk away function')
        npc.closeDialogWindow(marsha)
      }
    }
  )
  const textLabel = engine.addEntity()
  const PositvList = engine.addEntity()
  MeshRenderer.setPlane(PositvList)
  MeshCollider.setPlane(PositvList)
  
  Transform.create(PositvList, {
    position: { x: 5, y: 1, z: 1 },
    
  })
  
  // give entity behavior
  pointerEventsSystem.onPointerDown(
    {
      entity: PositvList,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Positive Behavior' },
    },
    function () {
      TextShape.create(PositvList, {
        text: 'Providing guidance or support: \n+8 points',
        textColor: Color4.create(0, 1, 1, 1),
        fontSize: 3,
      })
    }
  )
  const NegativList = engine.addEntity()
  MeshRenderer.setPlane(NegativList)
  MeshCollider.setPlane(NegativList)
  
  Transform.create(NegativList, {
    position: { x: 1, y: 1, z: 1 },
  })
  
  pointerEventsSystem.onPointerDown(
    {
      entity: NegativList,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Negative Behavior' },
    },
    function () {
      TextShape.create(NegativList, {
        text: 'Harassing or bullying other players: \n-12 points',
        textColor: Color4.create(1,0,0,1),
        fontSize: 2,
      })
    }
  )
  
  const UserScore = engine.addEntity()
  MeshRenderer.setPlane(UserScore)
  MeshCollider.setPlane(UserScore)
  
  Transform.create(UserScore, {
    position: { x: 9, y: 1, z: 1 },
  })
  
  pointerEventsSystem.onPointerDown(
    {
      entity: UserScore,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Player Score' },
    },
    
    function () {
      TextShape.create(UserScore, {
        text: `The player Score is: 100`,
        textColor: Color4.create(1,0,0,1),
        fontSize: 2,
      })
    }
    
  )
  
// define type of data
type NewBoxPosition = {
  position: { x: number; y: number; z: number }
}


  //walking NPC
  createDogeNpc()
  //createAvatar()
  setupUi()
}

function log(arg0: string) {
  throw new Error('Function not implemented.')
}

