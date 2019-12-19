import React from 'react';

export default (props) => {

  var style = {
    /*preset array values for snake, left (horizonatal) and top (vertical) 
    determine placing*/
    left: `${props.snakeDots[0]}%`,
    top: `${props.snakeDots[1]}%`

  }
  


  return (
    /*the entire code above is substituted into style, and now it takes
    interpolation for snake in app.js*/
    <div className="snake" style={style}></div>
    
  )
}