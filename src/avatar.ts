/*import { Entity, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { create, followPath, talk } from 'dcl-npc-toolkit'
import { FollowPathData, NPCType } from 'dcl-npc-toolkit/dist/types'
import { avatarDialog } from './dialogs'

let avatar: Entity

export function createAvatar() {
  const offsetpath = 5
  let avatarPathPoints = [
    Vector3.create(offsetpath, 0.6, 16 - offsetpath),
    Vector3.create(16 - offsetpath, 0.6, 16 - offsetpath),
    Vector3.create(offsetpath, 0.6, offsetpath),
    Vector3.create(16 - offsetpath, 0.6, offsetpath)
  ]
  let avatarPath: FollowPathData = {
    path: avatarPathPoints,
    totalDuration: avatarPathPoints.length * 9,
    loop: true,
    // curve: true,
  }

  avatar = create(
    {
      position: Vector3.clone(avatarPathPoints[0]),
      scale: Vector3.create(2, 2, 2)
    },
    {
      type: NPCType.CUSTOM,
      model: 'models/arissa.glb',
      onActivate: () => {
        console.log('Avatar activated!')
        talk(avatar, avatarDialog)
      },
      onWalkAway: () => {
        console.log('NPC', 'Avatar', 'on walked away')
        followPath(avatar, avatarPath)
      },
      idleAnim: 'Idle',
      walkingAnim: 'Walk',
      faceUser: true, //continue to face user???
      portrait: {
        path: 'images/avatar.png',
        height: 200,
        width: 300,
        offsetX: -10,
        offsetY: 0,
        section: { sourceHeight: 256, sourceWidth: 256 }
      },
      darkUI: true,
      coolDownDuration: 3,
      hoverText: 'Talk',
      onlyETrigger: true,
      onlyClickTrigger: false,
      onlyExternalTrigger: false,
      reactDistance: 5,
      continueOnWalkAway: false
      //dialogCustomTheme: RESOURCES.textures.dialogAtlas,
    }
  )
  followPath(avatar, avatarPath)
}
*/