import React, { Component } from 'react';
import Axios from 'axios';
import Food from './Food';

var randomFood = () => {
  /*determines random values from 1-98. used to be 100 but the food dot would 
  move out the game screen at 99*/
  let x = Math.floor((Math.random() * 98));
  let y = Math.floor((Math.random() * 98));
  /*food[0] and food[1]*/
  return [x,y]
}

var initialState = {
  speed: 100,
  score: 0,
  direction: 'RIGHT',
  /*determines where food spawns on load*/
  food: randomFood(),
  snakeStart: 0,
}

export default class App extends Component {
  
  state = initialState

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.keyDown = this.keyDown;
  }  

  startGame() {

  }

  gameOver() {

  }

  moveSnake() {

  }

  
  eatFood() {

  }

  
  keyDown = (key) => {
    key = key
    switch (key.keyCode) {
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
  
    render() {
      return (
        <div className='title'>
          ULTRA SNAKE
          <div className='game-screen'>
            {/* this allows randomFood to show up as a block instead of a number */}
            <Food food={this.state.food} />
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
