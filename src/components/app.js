import React, { Component } from 'react';
import Axios from 'axios';
import Food from './Food';
import Snake from './Snake';

var spawnFood = () => {
  /*determines random values from 1-98 on variables x and y, which are substituted
  by top and left in food.js. 
  
  the algorithm is so easy even i could do it, the board goes from 0 - 100
  i want an even number because odd values in X,Y make the snake+food 
  look off in-game, so i take a range from 0 to 49 and then it multiply by 2*/
  let x = Math.floor(Math.random() * 49)
  let y = Math.floor(Math.random() * 49)
  /*food[0] and food[1]*/
  return [x*2,y*2]
}

let initialState = {
  /*substitutes in for setInterval*/
  speed: 1,
  actualSpeed: 100,
  score: 0,
  direction: 'RIGHT',
  /*determines where food spawns on load*/
  food: spawnFood(),
  /*snake starts here at these top/left cordinates*/
  snake: [50,50],
}

export default class App extends Component {
  
  state = initialState

  componentDidMount() {
    setInterval(this.moveSnake, this.state.actualSpeed);
    document.onkeydown = this.onKeyDown;
  }

  onKeyDown = (e) => {
    /*window.event lets the window record the direction state change*/
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
  constantly update the function*/
  moveSnake = () => {
    if (this.state.direction === 'RIGHT') {
      let newSnake = [...this.state.snake];
      let movedSnake = []
      let movedSnakeX = newSnake[0]
      let movedSnakeY = newSnake[1]
      movedSnakeX += 2
      movedSnake = [movedSnakeX, movedSnakeY]
      console.log(movedSnake)
      this.setState({
        snake: movedSnake
      })
    } 
    else if (this.state.direction === 'LEFT') 
    {
      let newSnake = [...this.state.snake];
      let movedSnake = []
      let movedSnakeX = newSnake[0]
      let movedSnakeY = newSnake[1]
      movedSnakeX -= 2
      movedSnake = [movedSnakeX, movedSnakeY]
      console.log(movedSnake)
      this.setState({
        snake: movedSnake
      })
    } 
    else if (this.state.direction === 'UP') 
    {
      let newSnake = [...this.state.snake];
      let movedSnake = []
      let movedSnakeX = newSnake[0]
      let movedSnakeY = newSnake[1]
      movedSnakeY -= 2
      movedSnake = [movedSnakeX, movedSnakeY]
      console.log(movedSnake)
      this.setState({
        snake: movedSnake
      })
    } 
    else if (this.state.direction === 'DOWN') 
    {
      let newSnake = [...this.state.snake];
      let movedSnake = []
      let movedSnakeX = newSnake[0]
      let movedSnakeY = newSnake[1]
      movedSnakeY += 2
      movedSnake = [movedSnakeX, movedSnakeY]
      console.log(movedSnake)
      this.setState({
        snake: movedSnake
      })
    }
  }

  gameOver() {

  }
  
    render() {
      return (
        <div className='title'>
          ULTRA SNAKE
          <div className='game-screen'>
            {/*sets up starter coordinates of snake, as well as the block 
            representing it*/}
            <Snake snakeDots={this.state.snake}/>
            {/*start of snake tail. just makes it look nicer*/}
            {/* this allows randomFood to show up as a block. without this, it just
            spawns a random number physically on the game board */}
            <Food foodDot={this.state.food} />
              <div className='score-board'>
                <div className='score'>
                  Score: {this.state.score}
                </div>
                <div className='speed'>
                  Speed: {this.state.speed}sph
                </div>
              </div>
          </div>
        </div>
      );
    }
  }
