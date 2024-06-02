import { AvatarShape, Transform, engine, executeTask } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi, create } from 'dcl-npc-toolkit'
import { FollowPathData, NPCBodyType } from 'dcl-npc-toolkit/dist/types'
import { InfuraProvider, Wallet, ethers } from 'ethers'
import { openExternalUrl } from '~system/RestrictedActions'
import { getUserData } from '~system/UserIdentity'
import AvatarControlABI from './AvatarcontrolAbi'
import { decreaseScore } from './dialogs'
import { RequestManager, ContractFactory } from 'eth-connect'
import { getPlayer } from '@dcl/sdk/src/players'
import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'


const description = "Trust but Verify"
const Max_Chars = 45


// Connect to the Ethereum provider and smart contract
const SceneOwnedUi = () => [
	NpcUtilsUi(),
	descriptionUI()
]

async function isAvatarCreationAllowed() {try{
	const provider = createEthereumProvider()
	console.log("provide created")
	const requestManager = new RequestManager(provider);
	const factory = new ContractFactory(requestManager, AvatarControlABI)
	const contract = (await factory.at(
	  '0x377645315092cEe56Ca6d640eabB35F3a74B1893'
	)) as any
	console.log("SUCCESS Interaction with Avatar control smart control");
	// Call the decreaseTrustScore function from thee smart contract
	const allowed = await contract.isAvatarCreationAllowed();
	return allowed;	
  }
  catch (error: any) {
	console.log(error.toString())
  }
  }

export function setupUi() {
	ReactEcsRenderer.setUiRenderer(SceneOwnedUi)
}

function descriptionUI() {

	const multiLineDescription = breakLines(description, Max_Chars)

	return <UiEntity
		uiTransform={{
			width: "auto",
			height: "auto",
			display: "flex",
			alignSelf: 'stretch',
			positionType: "absolute",
			flexShrink: 1,
			maxWidth: 800,
			maxHeight: 300,
			minWidth: 200,
			padding: 4,
			position: { right: "3%", bottom: '2%' }
		}}
		uiBackground={{ color: Color4.fromHexString("#4d544e") }}
	>
		<UiEntity
			uiTransform={{
				width: "auto",
				height: "auto",
				alignSelf: "center",
				padding: 4,
				justifyContent: 'flex-start',
				alignContent: 'flex-start',
			}}
			uiBackground={{ color: Color4.fromHexString("#92b096") }}
		>
			<Label
				value={multiLineDescription}
				fontSize={18}
				textAlign="middle-center"
				uiTransform={{
					width: "100",
					height: "100",
					alignSelf: "center",
					margin: '16px 16px 8px 16px',

				}}
			/>
			<Label
        onMouseDown={() => console.log('# Avatar Clicked!')}
        value={`# Avatars: ${[...engine.getEntitiesWith(AvatarShape)].length +3}`}
        fontSize={18}
        uiTransform={{ width: 100, height: 50 }}
      />
      <Button
        uiTransform={{ width: 100, height: 40, margin: 8 }}
        value='Copy Avatar'
        variant='primary'
        fontSize={14}
        onMouseDown={() => {
          executeTask(async () => {
            let userData = await getUserData({});
            console.log(userData.data);

            if (!userData.data || !userData.data.avatar || !userData.data.avatar.wearables) return;
			const allowed = await isAvatarCreationAllowed();
			if (decreaseScore() >= 50){
            const myAvatar = engine.addEntity();
            AvatarShape.create(myAvatar, {
              name: 'Clicked',
              id: 'Clicked',
              emotes: [],
              wearables: userData.data?.avatar?.wearables,
			  expressionTriggerId: 'wave',
            });
            Transform.create(myAvatar, {
              position: Vector3.create(Math.random() * 5, Math.random(), Math.random() * 5),
            })
			console.log("Avatar created avec success!!");
			console.log(decreaseScore())
		}
		else{
			console.log("Your score doesn't allow you to create Avatars!");
			console.log(decreaseScore)
		}
	});
        }}
      />
		</UiEntity>
	</UiEntity >
}


function breakLines(text: string, linelength: number) {
	const lineBreak = '\n'
	var counter = 0
	var line = ''
	var returnText = ''
	var bMatchFound = false
	const lineLen = linelength ? linelength : 50


	if (!text) return ''
	if (text.length < lineLen + 1) { return text }

	while (counter < text.length) {
		line = text.substring(counter, counter + lineLen);
		bMatchFound = false
		if (line.length == lineLen) {
			for (var i = line.length; i > -1; i--) {
				if (line.substring(i, i + 1) == ' ') {
					counter += line.substring(0, i).length
					line = line.substring(0, i) + lineBreak
					returnText += line
					bMatchFound = true
					break
				}
			}

			if (!bMatchFound) {
				counter += line.length
				line = line + lineBreak
				returnText += line
			}
		}
		else {
			returnText += line
			break // We're breaking out of the the while(), not the for()
		}
	}

	return returnText
}

export var myAvatarF = engine.addEntity();
AvatarShape.create(myAvatarF, {
  name: 'Fixed',
  id: 'Fixed',
  emotes: [],
  wearables: [],
  expressionTriggerId: 'kiss',
  talking: false,
});
Transform.create(myAvatarF, {
	position: Vector3.create(Math.random() * 5, Math.random(), Math.random() * 5),
	scale: Vector3.create(1, 1, 1)
});
function getPlayerPosition() {
	const playerPosition = Transform.getOrNull(engine.PlayerEntity)
	if (!playerPosition) return ' no data yet'
	const { x, y, z } = playerPosition.position
	return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
  }


