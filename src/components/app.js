import React, { Component } from 'react';
import Axios from 'axios';
import Food from './Food';

const randomFood = () => {
  return [4,0]
}

var initialState = {
  speed: 100,
  score: 0,
  direction: 'RIGHT',
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
            <Food dot={this.state.food} />
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
