import React from 'react';

export default (props) => {

  var style = {
    /*preset array values for food, left (horizonatal) and top (vertical) 
    determine placing*/
    left: `${props.foodDot[0]}%`,
    top: `${props.foodDot[1]}%`
  }

  return (
    /*the entire code above is substituted into style, and now it takes
    interpolation for food in app.js*/
    <div className="rat-food" style={style}></div>
  )
}