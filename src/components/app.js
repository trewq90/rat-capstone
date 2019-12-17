import React, { Component } from 'react';
import Axios from 'axios';
import Food from './Food';
import Snake from './Snake';

var spawnFood = () => {
  /*determines random values from 1-98 on variables x and y, which are substituted
  by top and left in food.js. used to be 100 but the food dot would 
  move out the game screen at 99*/
  let x = Math.floor((Math.random() * 98));
  let y = Math.floor((Math.random() * 98));
  /*food[0] and food[1]*/
  return [x,y]
}

var spawnSnake = () => {
  return [50,50]
}

let initialState = {
  /*substitutes in for setInterval*/
  speed: 100,
  score: 0,
  direction: 'RIGHT',
  /*determines where food spawns on load*/
  food: spawnFood(),
  snakeStart: spawnSnake(),
}

export default class App extends Component {
  
  state = initialState

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

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

  startGame() {

  }

  gameOver() {

  }

  /* snake does things in thisdepending on what state direction.state is in */
  moveSnake() {

  }

  
  eatFood() {

  }
  
    render() {
      return (
        <div className='title'>
          ULTRA SNAKE
          <div className='game-screen'>
            {/*sets up starter coordinates of snake, as well as the block 
            representing it*/}
            <Snake snakeDots={this.state.snakeStart}/>
            {/* this allows randomFood to show up as a block. without this, it just
            spawns a random number physically on the game board */}
            <Food foodDot={this.state.food} />
              <div className='score-board'>
                <div className='score'>
                  Score: {this.state.score}
                </div>
                <div className='speed'>
                  Speed: {this.state.speed}
                </div>
              </div>
          </div>
        </div>
      );
    }
  }
