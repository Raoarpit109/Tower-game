import { Engine, Instance } from 'cooljs'
import { touchEventHandler } from './utils'
import { background } from './background'
import { lineAction, linePainter } from './line'
import { hookAction, hookPainter } from './hook'
import * as constant from './constant'
import { startAnimate, endAnimate } from './animateFuncs'

window.TowerGame = (option = {}) => {
  const {
    width,
    height,
    canvasId,
  } = option
  const game = new Engine({
    canvasId,
    highResolution: true,
    width,
    height,
  })
  const pathGenerator = (path) => `./assets/${path}`
  game.addImg('background', pathGenerator('background.png'))
  game.addImg('hook', pathGenerator('hook.png'))
  game.addImg('blockRope', pathGenerator('block-rope.png'))
  game.addImg('block', pathGenerator('block.png'))
  game.addImg('block-perfect', pathGenerator('block-perfect.png'))
  for (let i = 1; i <= 8; i += 1) {
    game.addImg(`c${i}`, pathGenerator(`c${i}.png`))
  }
  game.addLayer(constant.flightLayer)
  for (let i = 1; i <= 7; i += 1) {
    game.addImg(`f${i}`, pathGenerator(`f${i}.png`))
  }
  game.swapLayer(0, 1)
  game.addImg('heart', pathGenerator('heart.png'))
  game.addImg('score', pathGenerator('score.png'))
  game.setVariable(constant.blockWidth, game.width * 0.25)
  game.setVariable(constant.blockHeight, game.getVariable(constant.blockWidth) * 0.71)
  game.setVariable(constant.cloudSize, game.width * 0.3)
  game.setVariable(constant.ropeHeight, game.height * 0.4)
  game.setVariable(constant.blockCount, 0)
  game.setVariable(constant.successCount, 0)
  game.setVariable(constant.failedCount, 0)
  game.setVariable(constant.gameScore, 0)
  game.setVariable(constant.hardMode, false)
  game.setVariable(constant.gameUserOption, option)
  
  const line = new Instance({
    name: 'line',
    action: lineAction,
    painter: linePainter
  })
  game.addInstance(line)
  const hook = new Instance({
    name: 'hook',
    action: hookAction,
    painter: hookPainter
  })
  game.addInstance(hook)

  game.startAnimate = startAnimate
  game.endAnimate = endAnimate
  game.paintUnderInstance = background
  game.addKeyDownListener('enter', () => {
    if (game.debug) game.togglePaused()
  })
  game.touchStartListener = () => {
    touchEventHandler(game)
  }

   
    
    game.setTimeMovement(constant.bgInitMovement, 500)
    game.setTimeMovement(constant.tutorialMovement, 500)
    game.setVariable(constant.gameStartNow, true)
  }

  return game
}
