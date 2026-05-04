import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const BOARD_SIZE = 9

const KEYBOARD_ARROW_DIRECTION = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown'
}

class Node {
  constructor() {
    this.value = ''
    this.next = null
  }
}

const getBoard = () => {
  const board = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = []
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push([i, j])
    }
    board.push(row)
  }
  return board
}

const getRandomNumber = (max) => {
  return Math.random() * max
}

const getValidCell = (max) => {
  return Math.floor(getRandomNumber(max)) % BOARD_SIZE
}

const startFoodAtRandomCell = (snake) => {
  const row = getValidCell(1000)
  const col = getValidCell(1000)
  const currentFood = [row, col]
  if (snake.toString() === currentFood.toString()) {
    return startFoodAtRandomCell(snake)
  }
  return currentFood
}

const startSnakeAtRandomCell = () => {
  const row = getValidCell(1000)
  const col = getValidCell(1000)
  return [row, col]
}

const getUpdatedDirection = (direction, row, col) => {
  if (direction === KEYBOARD_ARROW_DIRECTION.DOWN) {
    return [row + 1, col]
  } else if (direction === KEYBOARD_ARROW_DIRECTION.UP) {
    return [row - 1, col]
  } else if (direction === KEYBOARD_ARROW_DIRECTION.LEFT) {
    return [row, col - 1]
  }
  else if (direction === KEYBOARD_ARROW_DIRECTION.RIGHT) {
    return [row, col + 1]
  }
  return [null, null]
}

const inValidCell = (row, col) => {
  const isInValidRow = row < 0 || row > BOARD_SIZE - 1
  const isInValidCol = col < 0 || col > BOARD_SIZE - 1
  return isInValidRow || isInValidCol
}

const isSnakeAndFoodSameCell = (snake, food) => {
  console.log(snake, food)
  return snake.toString() === food.toString()
}

function App() {
  const [board, setBoard] = useState(getBoard())
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState(startSnakeAtRandomCell())
  const [food, setFood] = useState(startFoodAtRandomCell(snake))


  useEffect(() => {
    const [currentSnakeRow, currentSnakeCol] = snake
    const onPressArrow = (event) => {
      const updatedSnakePosition = getUpdatedDirection(event.key, currentSnakeRow, currentSnakeCol)
      const [updatedRow, updatedCol] = updatedSnakePosition
      if (isSnakeAndFoodSameCell(snake, food) || inValidCell(updatedRow, updatedCol)) {
        return alert('Sorry! Game Over')
      }
      setSnake(updatedSnakePosition)
    }
    document.addEventListener('keydown', onPressArrow);
    return () => {
      document.removeEventListener('keydown', onPressArrow)
    }
  }, [snake, food])



  if (!board.length) {
    return <p>Loading</p>
  }




  const getBoardCell = (col) => {
    if (snake.toString() === col.toString()) {
      return 'board-snake-filled'
    }
    if (food.toString() === col.toString()) {
      return 'board-food-filled'
    }
    return 'board-cell'
  }

  return (
    <div className="App">
      <main>
        <div> <p>Score : {`${score}`}</p></div>
        <div className='board-container'>
          {board.map((row, i) => <div key={i} className='board-row'>{row.map((col, j) => <div key={j} className={getBoardCell(col)}>{col}</div>)}</div>)}
        </div>
      </main >
    </div >
  );
}

export default App;
