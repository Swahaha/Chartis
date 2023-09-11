import React, {useState} from 'react'

export default function UserSuggestPopup({clickedPosition,closeSelf}) {

    const [dropdownVal, setDropdownVal] = useState('elevator')

    function saveDataToServer(data){
      closeSelf()
        fetch("/mammamia/gorilla/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({'lat': clickedPosition.lat, 'lng': clickedPosition.lng, 'type': dropdownVal}) // body data type must match "Content-Type" header
        })
            .then((res) => res.json())
            .then((data) =>
             {
                console.log(data)
            })
            
      }

      function handleChange(e){
        setDropdownVal(e.target.value)
      }
  return (
    <div className='user-suggest-popup-placer'>
        <div className='user-suggest-popup'>
            <label htmlFor="cars">Choose a type</label>
            <select name="cars" id="cars" className='select-dropdown' onChange={(e) => handleChange(e)} value={dropdownVal} >
            <option value="elevator">Elevator</option>
            <option value="stairs">Staircase</option>
            <option value="bathroom">Accessible Bathroom</option>
            <option value="door">Accessible Door</option>
            <option value="building">Building</option>
            </select>
            <button onClick={saveDataToServer}>Submit</button>
        </div>
    </div>
  )
}
