import React from 'react'

export default function Blueprint(props) {

  return (
    <>
    {props.showBlueprint && <div className='blueprint-popup-placer'>
        <div className='blueprint-popup-container'>
            <div className='blueprint-img'>IMG</div>
            <div className='blueprint-popup-close-btn' onClick={props.handleBlueprintClose}>x</div>
        </div>
    </div>
    }
    </>
  )
}
