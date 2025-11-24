import { useReducer, useEffect } from "react"
const PLAYER_WIDTH = 20
const PLAYER_HEIGHT = 20
const FIRE_WIDTH = 40
const FIRE_HEIGHT = 60
const COIN_HEIGHT_WIDTH = 40
const COLLISION_BUFFER = 20

function hasPlayerCollidedWithObstacle(player, object, playerWidth, playerHeight, objectWidth, objectHeight) {
  const playerLeft = player.x
  const playerRight = player.x + playerWidth
  const playerTop = player.y
  const playerBottom = player.y + playerHeight

  const objectLeft = object.x
  const objectRight = object.x + objectWidth
  const objectTop = object.y
  const objectBottom = object.y + objectHeight

  return (
    playerLeft < objectRight &&
    playerRight > objectLeft &&
    playerTop < objectBottom &&
    playerBottom > objectTop
  )
}

const useGameState = () => {
  const getInitialState = () => ({
    player: {
      x: 80,
      y: 200,
      velocityY: 0,
      lives: 2,
      isInvincible: false,
      isHit: false
    },
    isStagePaused: false,
    score: 0,
    gameSpeed: 2,
    fires: [],
    coins: [],
    infoForPlayer: {
      coinCollected: {
        value: '+10',
        x: 100,
        y: 100
      }
    },
    isGameOver: false,
    gameStartTime: Date.now(),
    timePlayed: 0,
    difficultyLevel: 0
  })

  const initialState = getInitialState()

  function gameReducer(state, action) {
    switch (action.type) {
      case 'ADD_SCORE':
        return {
          ...state,
          score: state.score + action.payload
        }
      case 'UPDATE_PLAYER_POSITION':
        const updatedPosition = state.player.y + action.payload.deltaY
        // Stage height is 400px, player height is 20px, so max Y is 380
        const clampedY = Math.max(0, Math.min(380, updatedPosition))

        return {
          ...state,
          player: {
            ...state.player,
            y: clampedY
          }
        }
      case 'SET_GAME_SPEED':
        return {
          ...state,
          gameSpeed: action.payload.gameSpeed
        }
      case 'SET_PLAYER_VELOCITY_Y':
        return {
          ...state,
          player: {
            ...state.player,
            velocityY: action.payload.velocityY
          }
        }

      case 'SPAWN_FIRE':
        const randomY = Math.random() * 360
        return {
          ...state,
          fires: [
            ...state.fires,
            {
              id: Date.now() + Math.random(),
              x: 800 + Math.random() * 100,
              y: randomY
            }
          ]
        }

      case 'SPAWN_COIN':
        const hasCollisionWithFire = (coinX, coinY, coinSize, fires) => {
          const SAFETY_BUFFER = 20
          const FIRE_SIZE = 40

          for (const fire of fires) {
            const coinLeft = coinX - SAFETY_BUFFER
            const coinRight = coinX + coinSize + SAFETY_BUFFER
            const coinTop = coinY - SAFETY_BUFFER
            const coinBottom = coinY + coinSize + SAFETY_BUFFER

            const fireLeft = fire.x
            const fireRight = fire.x + FIRE_SIZE
            const fireTop = fire.y
            const fireBottom = fire.y + FIRE_SIZE

            const coinOverlapsFire = (
              coinLeft < fireRight &&
              coinRight > fireLeft &&
              coinTop < fireBottom &&
              coinBottom > fireTop
            )
            if (coinOverlapsFire) {
              return true
            }
          }

          return false
        }

        const MAX_ATTEMPTS_TO_SPAWN_COIN = 100
        let coinSpawnAttempts = 0
        let safeCoordinatesForCoinToSpawn = null
        const coinSize = 40

        while (coinSpawnAttempts < MAX_ATTEMPTS_TO_SPAWN_COIN && !safeCoordinatesForCoinToSpawn) {
          const randomX = 850 + Math.random() * 150
          const randomY = Math.random() * 320 + 40

          if (!hasCollisionWithFire(randomX, randomY, coinSize, state.fires)) {
            safeCoordinatesForCoinToSpawn = { x: randomX, y: randomY }
          }

          coinSpawnAttempts++
        }

        if (safeCoordinatesForCoinToSpawn) {
          return {
            ...state,
            coins: [
              ...state.coins,
              {
                id: Date.now() + Math.random(),
                x: safeCoordinatesForCoinToSpawn.x,
                y: safeCoordinatesForCoinToSpawn.y,
                size: coinSize,
                value: 10
              }
            ]
          }
        }

        return state

      case 'UPDATE_FIRES':
        if (state.isStagePaused) {
          return state
        }
        return {
          ...state,
          fires: state.fires
            .map(fire => ({
              ...fire,
              x: fire.x - state.gameSpeed
            }))
            .filter(fire => fire.x > -50)
        }

      case 'UPDATE_COINS':
        if (state.isStagePaused) {
          return state
        }

        return {
          ...state,
          coins: state.coins
            .map(coin => ({
              ...coin,
              x: coin.x - state.gameSpeed
            }))
            .filter(coin => coin.x > -50)
        }

      case 'CHECK_PLAYER_FIRE_COLLISIONS':
        if (state.player.isInvincible || state.player.isHit) {
          return state
        }

        for (const fire of state.fires) {
          if (hasPlayerCollidedWithObstacle(state.player, fire, PLAYER_WIDTH, PLAYER_HEIGHT, FIRE_WIDTH, FIRE_WIDTH)) {
            return {
              ...state,
              player: {
                ...state.player,
                isHit: true,
                lives: state.player.lives - 1
              },
              isStagePaused: true
            }
          }
        }

        return state

      case 'CHECK_PLAYER_COIN_COLLISIONS':
        for (const coin of state.coins) {
          if (hasPlayerCollidedWithObstacle(state.player, coin, PLAYER_WIDTH, PLAYER_HEIGHT, COIN_HEIGHT_WIDTH, COIN_HEIGHT_WIDTH
          )) {
            const newScore = state.score + coin.value
            const newDifficultyLevel = Math.floor(newScore / 30)

            if (newScore >= 100) {
              return {
                ...state,
                coins: state.coins.filter(coinItem => coinItem.id !== coin.id),
                score: newScore,
                isGameOver: true,
                timePlayed: Date.now() - state.gameStartTime,
                infoForPlayer: {
                  ...state.infoForPlayer,
                  coinCollected: {
                    value: `+${coin.value}`,
                    x: coin.x,
                    y: coin.y
                  }
                }
              }
            }

            return {
              ...state,
              coins: state.coins.filter(coinItem => coinItem.id !== coin.id),
              score: newScore,
              difficultyLevel: newDifficultyLevel,
              infoForPlayer: {
                ...state.infoForPlayer,
                coinCollected: {
                  value: `+${coin.value}`,
                  x: coin.x,
                  y: coin.y
                }
              }
            }
          }
        }

        return state

      case 'RESPAWN_PLAYER':
        if (state.player.lives <= 0) {
          console.log('0 lives')
          return {
            ...state,
            isGameOver: true,
            isStagePaused: true,
            timePlayed: Date.now() - state.gameStartTime,
            player: {
              ...state.player,
              isHit: false,
              velocityY: 0
            }
          }
        }

        return {
          ...state,
          player: {
            ...state.player,
            velocityY: 0,
            isHit: false,
            isInvincible: true
          },
          isStagePaused: false
        }

      case 'REMOVE_INVINCIBILITY':
        return {
          ...state,
          player: {
            ...state.player,
            isInvincible: false
          }
        }

      case 'RESTART_GAME':
        return getInitialState()

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (state.isGameOver) {
      return
    }

    const intervalId = setInterval(() => {
      dispatch({
        type: 'UPDATE_PLAYER_POSITION',
        payload: {
          deltaY: state.player.velocityY
        }
      })
      dispatch({
        type: 'UPDATE_FIRES'
      })
      dispatch({
        type: 'UPDATE_COINS'
      })
      dispatch({
        type: 'CHECK_PLAYER_FIRE_COLLISIONS'
      })
      dispatch({
        type: 'CHECK_PLAYER_COIN_COLLISIONS'
      })
    }, 16)

    return () => {
      clearInterval(intervalId)
    }
  }, [state.player.velocityY, state.isGameOver])

  useEffect(() => {
    if (state.player.isHit) {
      const respawnTimer = setTimeout(() => {
        dispatch({ type: 'RESPAWN_PLAYER' })
      }, 500)

      return () => clearTimeout(respawnTimer)
    }
  }, [state.player.isHit])

  useEffect(() => {
    if (state.isGameOver) {
      return
    }

    const baseInterval = 3000
    const interval = baseInterval / (1 + 0.3 * state.difficultyLevel)

    const firesPerSpawn = 1 + (2 * state.difficultyLevel)
    console.log("interval", interval, "difficulty", state.difficultyLevel, "fires per spawn", firesPerSpawn)

    const spawnInterval = setInterval(() => {
      for (let i = 0; i < firesPerSpawn; i++) {
        dispatch({ type: 'SPAWN_FIRE' })
      }
    }, interval)

    return () => clearInterval(spawnInterval)
  }, [state.difficultyLevel, state.isGameOver])

  useEffect(() => {
    if (state.isGameOver) {
      return
    }
    const spawnCoinInterval = setInterval(() => {
      dispatch({ type: 'SPAWN_COIN' })
    }, 3000)

    return () => clearInterval(spawnCoinInterval)
  }, [])

  useEffect(() => {
    if (state.player.isInvincible) {

      const invincibilityTimer = setTimeout(() => {
        dispatch({ type: 'REMOVE_INVINCIBILITY' })
      }, 3000)

      return () => clearTimeout(invincibilityTimer)
    }
  }, [state.player.isInvincible])


  useEffect(() => {
    if (state.isGameOver) {
      return
    }

    const handleKeyDown = (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault()
      }

      if (event.key === 'ArrowRight') {
        dispatch({
          type: 'SET_GAME_SPEED',
          payload: { gameSpeed: 5 }
        })
      }

      if (event.key === 'ArrowLeft') {
        dispatch({
          type: 'SET_GAME_SPEED',
          payload: { gameSpeed: 1 }
        })
      }

      if (event.key === 'ArrowUp') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: -5 }
        })
      }

      if (event.key === 'ArrowDown') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 5 }
        })
      }
    }

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowRight') {
        dispatch({
          type: 'SET_GAME_SPEED',
          payload: { gameSpeed: 3 }
        })
      }

      if (event.key === 'ArrowLeft') {
        dispatch({
          type: 'SET_GAME_SPEED',
          payload: { gameSpeed: 3 }
        })
      }

      if (event.key === 'ArrowUp') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 0 }
        })
      }

      if (event.key === 'ArrowDown') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 0 }
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [state.isGameOver])

  return { state, dispatch }
}

export default useGameState