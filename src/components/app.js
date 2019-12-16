import React, { Component } from 'react';
import Axios from 'axios';
import Snake from './snake'
import Food from './food'

var initialState = {
  speed: 100,
  score: 0,
}

export default class App extends Component {
  
  state = initialState

  componentDidMount() {
    var intervalId = setInterval(this.moveSnake, this.state.speed);
    this.setState( {intervalId: intervalId})
    document.onkeydown = this.onKeyDown;
  }  

  startGame() {

  }
  
    render() {
      return (
        <div className='title'>
          ULTRA SNAKE
          <div className='game-screen'>
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
