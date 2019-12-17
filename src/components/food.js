import React from 'react';

export default (props) => {

  var style = {
    /*preset array values for food, left (horizonatal) and top (vertical) 
    determine placing*/
    left: `${props.food[0]}%`,
    top: `${props.food[1]}%`
  }

  return (
    /*the entire code above is substituted into style, and now it takes
    interpolation*/
    <div className="snake-food" style={style}></div>
  )
}