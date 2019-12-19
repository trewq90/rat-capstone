import React, { Component } from 'react';
import Axios from 'axios';
import Food from './Food';
import Snake from './Snake';

/*determines random values from 1-98 on variables x and y, which are substituted
  by top and left in food.js. it wouldn't work if i put it anywhere else, so its at the top*/
var spawnFood = () => {
  /*an algorithm so easy even i could do it, the the snake + food divs go from 0% - 100% on the board 
  for top/left. i want an even number because odd values in X,Y make the snake+food 
  look off in-game, so i take a range from 0 to 49 and then it multiply by 2*/
  let x = Math.floor(Math.random() * 49)
  let y = Math.floor(Math.random() * 49)
  /*food[0] and food[1]*/
  return [x*2,y*2]
}

let i = 1

let initialState = {
  /*shows up on the game screen*/
  speed: 1,
  /*does not show up on the game screen. substitutes for setInterval*/
  actualSpeed: 200,
  score: 0,
  /*determines how snake moves when game starts*/
  direction: 'RIGHT',
  /*snake starts here at these top/left cordinates which are found in snake.js*/
  snake: 
  [[50,50],[48,50]],
  /*top/left coordinates that determine where food spawns*/
  food: spawnFood(),
  
}

export default class App extends Component {
  
  state = initialState

  componentDidMount() {
    this.interval = setInterval(this.moveSnake, this.state.actualSpeed)
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(prevState) {
    this.eatFood();
    this.hitBorder();
    if (prevState.actualSpeed !== this.state.actualSpeed) {
      clearInterval(this.interval);
      this.interval = setInterval(this.moveSnake, this.state.actualSpeed);
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDelayChange = (e) => {
    if (this.state.actualSpeed > 30) {
      this.setState({ 
        actualSpeed: Number(this.state.actualSpeed - 20),
        speed: this.state.speed + 1
       })
    }  
  }

  /*window.event lets the window record the direction state change. key codes
    correspond to arrows on the keyboard. really easy to change it to say, WASD
    if you wanted to*/
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  /* takes snake, makes new array, takes elements of snake
  and adds them depending on direction. it functions as a snake by having it
  constantly update the function. because its a nested array, i had to play with the indexes a lot.
  
  basically, i am just taking the div that contains the little block that
  i call the snake and moving it.*/
  moveSnake = () => {
    if (this.state.direction === 'RIGHT') 
    {
      let newSnake = this.state.snake  
      /* new snake = [[50,50]] */
      let cutSnake = newSnake[0]
      let movedSnakeX = cutSnake[0] 
      let movedSnakeY = cutSnake[1]  
      movedSnakeX += 2
      let finalSnake = [movedSnakeX,movedSnakeY]
      newSnake[0] = finalSnake
      this.setState({
        snake: newSnake
      })
    } 
    
    else if (this.state.direction === 'LEFT') 
    {
      let newSnake = this.state.snake
      /* new snake = [[50,50]] */
      let cutSnake = newSnake[0]
      let movedSnakeX = cutSnake[0] 
      let movedSnakeY = cutSnake[1]  
      movedSnakeX -= 2
      let finalSnake = [movedSnakeX,movedSnakeY]
      newSnake[0] = finalSnake
      this.setState({
        snake: newSnake
      })
    } 
    else if (this.state.direction === 'UP') 
    {
      let newSnake = this.state.snake
      /* new snake = [[50,50]] */
      let cutSnake = newSnake[0]
      let movedSnakeX = cutSnake[0] 
      let movedSnakeY = cutSnake[1]  
      movedSnakeY -= 2
      let finalSnake = [movedSnakeX,movedSnakeY]
      newSnake[0] = finalSnake
      this.setState({
        snake: newSnake
      })
    } 
    else if (this.state.direction === 'DOWN') 
    {
      let newSnake = this.state.snake
      /* new snake = [[50,50]] */
      let cutSnake = newSnake[0]
      let movedSnakeX = cutSnake[0] 
      let movedSnakeY = cutSnake[1]  
      movedSnakeY += 2
      let finalSnake = [movedSnakeX,movedSnakeY]
      newSnake[0] = finalSnake
      this.setState({
        snake: newSnake
      })
    } 
  }

  /* simple code, if the snake head which is set at snake[0] 
  and the food have the same left & top values, it spawns anothe
  food div. then the snake expand function plays*/
  eatFood() {
    let head = this.state.snake[0];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: spawnFood(),
      })
      this.handleDelayChange()
      this.addScore()
    }
  }

  expandSnake() {
    let newSnake = [...this.state.snake];
    newSnake.unshift([])
    this.setState({
      snake: newSnake
    })
  }

  addScore() {
    this.state.score = this.state.score + this.state.speed * 100
  }
  /* If snake divs go outside 100, it has hit the border, triggering a game over */
  hitBorder() {
    let head = this.state.snake[0]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    this.gameOver()
    }
  }

  gameOver() {
    alert(`You lost! Your score is ${this.state.score}.`)
    this.setState({
      snake: [[50,50],[48,50]],
      score: 0,
      food: spawnFood(),
      direction: 'RIGHT',
      actualSpeed: 200,
      speed: 1
    })
  }
  
    render() {
      return (
        <div className='title'>
          QUICK SNAKE
          <div className='game-screen'>
            {/*sets up starter coordinates of snake, as well as the block 
            representing it*/}
            <Snake snakeDots={this.state.snake[0]}/>
            {/* this allows randomFood to show up as a block. without this, it just
            spawns a random number physically on the game board */}
            <Food foodDot={this.state.food} />
              <div className='score-board'>
                <div className='score'>
                  Score: {this.state.score}
                </div>
                <div className='speed'>
                  Speed: {this.state.speed} snakes p/h!!
                </div>
              </div>
          </div>
        </div>
      );
    }
  }
