import { Instance } from 'cooljs'
import { blockAction, blockPainter } from './block'
import {
  checkMoveDown,
  getMoveDownValue,
  drawYellowString,
  getAngleBase
} from './utils'
import { addFlight } from './flight'
import * as constant from './constant'

export const endAnimate = (engine) => {
  const gameStartNow = engine.getVariable(constant.gameStartNow)
  if (!gameStartNow) return
  const failedCount = engine.getVariable(constant.failedCount)
  const gameScore = engine.getVariable(constant.gameScore, 0)
  const score = engine.getImg('score')
  const scoreWidth = score.width
  const scoreHeight = score.height
  const zoomedWidth = engine.width * 0.35
  const zoomedHeight = (scoreHeight * zoomedWidth) / scoreWidth
  engine.ctx.drawImage(
    score,
    engine.width * 0.61,
    engine.width * 0.038,
    zoomedWidth,
    zoomedHeight
  )
  drawYellowString(engine, {
    string: gameScore,
    size: engine.width * 0.06,
    x: engine.width * 0.9,
    y: engine.width * 0.11,
    textAlign: 'right'
  })
  const { ctx } = engine
  const heart = engine.getImg('heart')
  const heartWidth = heart.width
  const heartHeight = heart.height
  const zoomedHeartWidth = engine.width * 0.08
  const zoomedHeartHeight = (heartHeight * zoomedHeartWidth) / heartWidth
  for (let i = 1; i <= 3; i += 1) {
    ctx.save()
    if (i <= failedCount) {
      ctx.globalAlpha = 0.2
    }
    ctx.drawImage(
      heart,
      (engine.width * 0.66) + ((i - 1) * zoomedHeartWidth),
      engine.width * 0.16,
      zoomedHeartWidth,
      zoomedHeartHeight
    )
    ctx.restore()
  }
}

export const startAnimate = (engine) => {
  const gameStartNow = engine.getVariable(constant.gameStartNow)
  if (!gameStartNow) return
  if (!lastBlock || [constant.land, constant.out].indexOf(lastBlock.status) > -1) {
    if (checkMoveDown(engine) && getMoveDownValue(engine)) return
    if (engine.checkTimeMovement(constant.hookUpMovement)) return
    const angleBase = getAngleBase(engine)
    const initialAngle = (Math.PI
        * engine.utils.random(angleBase, angleBase + 5)
        * engine.utils.randomPositiveNegative()
    ) / 180
    engine.setVariable(constant.initialAngle, initialAngle)
    engine.setTimeMovement(constant.hookDownMovement, 500)
    
     
    case 2:
      addFlight(engine, 1, 'leftToRight')
      break
    case 6:
      addFlight(engine, 2, 'rightToLeft')
      break
    case 8:
      addFlight(engine, 3, 'leftToRight')
      break
    case 14:
      addFlight(engine, 4, 'bottomToTop')
      break
    case 18:
      addFlight(engine, 5, 'bottomToTop')
      break
    case 22:
      addFlight(engine, 6, 'bottomToTop')
      break
    case 25:
      addFlight(engine, 7, 'rightTopToLeft')
      break
    default:
      break
  }
}

