import React, { Component } from 'react';
import Axios from 'axios';
import Food from './Food';
import Rat from './rat';

/*determines random values from 1-98 on variables x and y, which are substituted
  by top and left in food.js. it wouldn't work if i put it anywhere else, so its at the top*/
var spawnFood = () => {
  /*an algorithm so easy even i could do it, the the rat + food divs go from 0% - 100% on the board 
  for top/left. i want an even number because odd values in X,Y make the rat+food 
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
  /*determines how rat moves when game starts*/
  direction: 'RIGHT',
  /*rat starts here at these top/left cordinates which are found in rat.js*/
  rat: 
  [[50,50],[48,50]],
  /*top/left coordinates that determine where food spawns*/
  food: spawnFood(),
  specialFood: spawnFood()
  
}

export default class App extends Component {
  
  state = initialState

  componentDidMount() {
    this.interval = setInterval(this.moverat, this.state.actualSpeed)
    fetch(`http://127.0.0.1:5000/item/get`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
      let specialFood = data[1];
      this.setState({
        specialFood: specialFood[2],
      })
    })
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(prevState) {
    this.eatFood();
    this.hitBorder();
    if (prevState.actualSpeed !== this.state.actualSpeed) {
      clearInterval(this.interval);
      this.interval = setInterval(this.moverat, this.state.actualSpeed);
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

  /* takes rat, makes new array, takes elements of rat
  and adds them depending on direction. it functions as a rat by having it
  constantly update the function. because its a nested array, i had to play with the indexes a lot.
  
  basically, i am just taking the div that contains the little block that
  i call the rat and moving it.*/
  moverat = () => {
    if (this.state.direction === 'RIGHT') 
    {
      let newrat = this.state.rat  
      /* new rat = [[50,50]] */
      let cutrat = newrat[0]
      let movedratX = cutrat[0] 
      let movedratY = cutrat[1]  
      movedratX += 2
      let finalrat = [movedratX,movedratY]
      newrat[0] = finalrat
      this.setState({
        rat: newrat
      })
    } 
    
    else if (this.state.direction === 'LEFT') 
    {
      let newrat = this.state.rat
      /* new rat = [[50,50]] */
      let cutrat = newrat[0]
      let movedratX = cutrat[0] 
      let movedratY = cutrat[1]  
      movedratX -= 2
      let finalrat = [movedratX,movedratY]
      newrat[0] = finalrat
      this.setState({
        rat: newrat
      })
    } 
    else if (this.state.direction === 'UP') 
    {
      let newrat = this.state.rat
      /* new rat = [[50,50]] */
      let cutrat = newrat[0]
      let movedratX = cutrat[0] 
      let movedratY = cutrat[1]  
      movedratY -= 2
      let finalrat = [movedratX,movedratY]
      newrat[0] = finalrat
      this.setState({
        rat: newrat
      })
    } 
    else if (this.state.direction === 'DOWN') 
    {
      let newrat = this.state.rat
      /* new rat = [[50,50]] */
      let cutrat = newrat[0]
      let movedratX = cutrat[0] 
      let movedratY = cutrat[1]  
      movedratY += 2
      let finalrat = [movedratX,movedratY]
      newrat[0] = finalrat
      this.setState({
        rat: newrat
      })
    } 
  }

  /* simple code, if the rat head which is set at rat[0] 
  and the food have the same left & top values, it spawns anothe
  food div. then the rat expand function plays*/
  eatFood() {
    let head = this.state.rat[0];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: spawnFood(),
      })
      this.handleDelayChange()
      this.addScore()
    }
  }

  addScore() {
    this.state.score = this.state.score + this.state.speed * 100
  }
  /* If rat divs go outside 100, it has hit the border, triggering a game over */
  hitBorder() {
    let head = this.state.rat[0]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    this.gameOver()
    }
  }

  gameOver() {
    alert(`You lost! Your score is ${this.state.score}.`)
    this.setState({
      rat: [[50,50],[48,50]],
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
          RAT
          <div className='game-screen'>
            {/*sets up starter coordinates of rat, as well as the block 
            representing it*/}
            <Rat ratDots={this.state.rat[0]}/>
            {/* this allows randomFood to show up as a block. without this, it just
            spawns a random number physically on the game board */}
            <Food foodDot={this.state.food} />
              <div className='score-board'>
                <div className='score'>
                  Score: {this.state.score}
                </div>
                <div className='speed'>
                  Speed: {this.state.speed} rats p/h!!
                </div>
              </div>
          </div>
        </div>
      );
    }
  }
