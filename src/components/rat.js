import React from 'react';

export default (props) => {

  var style = {
    /*preset array values for rat, left (horizonatal) and top (vertical) 
    determine placing*/
    left: `${props.ratDots[0]}%`,
    top: `${props.ratDots[1]}%`
  }


  return (
    /*the entire code above is substituted into style, and now it takes
    interpolation for rat in app.js*/
    <div className="rat" style={style}></div>
  )
}