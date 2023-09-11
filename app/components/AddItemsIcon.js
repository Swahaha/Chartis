import { useState, useEffect } from 'react'
import React from 'react'
 
export default function AddItemsIcon(props) {

    return (
        <div className='add-items-container-placer'>
            <div className='add-items-icon' onClick={props.handleAddPopupShow} >+</div>
            {props.showAddPopup && 
            <div className='add-items-popup-placer'>
                <div className='add-items-popup'>
                    <div className='add-items-popup-text'>
                        Click on the map to suggest a location
                    </div>
                    <div className='add-items-popup-close' onClick={props.handleAddPopupClose}>x</div>
                </div>
                <svg className='add-items-popup-triangle' xmlns="http://www.w3.org/2000/svg" width="26" height="41" viewBox="0 0 36 41" fill="none">
  <path d="M36 20.5L0.750002 40.8516L0.750004 0.148402L36 20.5Z" fill="#5BB7DE" fill-opacity="0.9"/>
</svg>
            </div>
            }
        </div>
      
    )
    }