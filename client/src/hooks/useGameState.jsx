import { useReducer, useEffect } from "react"

const useGameState = () => {
  const initialState = {
    player: {
      x: 80,
      y: 200,
      velocityY: 0,
      lives: 1,
      isInvincible: false,
      isHit: false
    },
    score: 0,
    gameSpeed: 2,
    fires: [],
    coins: []
  }

  function gameReducer(state, action) {
    switch (action.type) {
      case 'ADD_SCORE':
        return {
          ...state,
          score: state.score + action.payload
        }
      case 'UPDATE_PLAYER_POSITION':
        const updatedPosition = state.player.y + action.payload.deltaY
        const clampedY = Math.max(0, Math.min(400, updatedPosition))

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
        const randomY = Math.random() * 390
        return {
          ...state,
          fires: [
            ...state.fires,
            {
              id: Date.now() + Math.random(),
              x: 700 + Math.random() * 100,
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
          }

          return coinOverlapsFire
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

          attempts++
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
                size: coinSize
              }
            ]
          }
        }

        return state

      case 'UPDATE_FIRES':
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
        function playerOverlapsFire(player, fire) {
          const FIRE_SIZE = 40
          const playerLeft = player.x
          const playerRight = player.x + 20
          const playerTop = player.y
          const playerBottom = player.y + 20

          const fireLeft = fire.x
          const fireRight = fire.x + FIRE_SIZE
          const fireTop = fire.y
          const fireBottom = fire.y + FIRE_SIZE

          return (
            playerLeft < fireRight &&
            playerRight > fireLeft &&
            playerTop < fireBottom &&
            playerBottom > fireTop
          )
        }

        if (state.player.isInvincible || state.player.isHit) {
          return state
        }

        for (const fire of state.fires) {
          if (playerOverlapsFire(state.player, fire)) {
            return {
              ...state,
              player: {
                ...state.player,
                isHit: true
              }
            }
          }
        }

        return state

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
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
      dispatch({ type: 'CHECK_PLAYER_FIRE_COLLISIONS' })

    }, 16)

    return () => {
      clearInterval(intervalId)
    }
  }, [state.player.velocityY])

  useEffect(() => {
    if (state.player.isHit) {
      const respawnTimer = setTimeout(() => {
        dispatch({ type: 'RESPAWN_PLAYER' })
      }, 500)

      return () => clearTimeout(respawnTimer)
    }
  }, [state.player.isHit])

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      dispatch({ type: 'SPAWN_FIRE' })
    }, 5000)

    return () => clearInterval(spawnInterval)
  }, [])

  useEffect(() => {
    const spawnCoinInterval = setInterval(() => {
      dispatch({ type: 'SPAWN_COIN' })
    }, 2000)

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
    const handleKeyDown = (event) => {
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
          payload: { velocityY: -2 }
        })
      }

      if (event.key === 'ArrowDown') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 2 }
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
  }, [])

  return { state, dispatch }
}

export default useGameState