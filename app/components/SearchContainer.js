import { useState, useEffect } from 'react'
import React from 'react'

let destinationsArr = [
    "Nearest Bathroom",
    "Keohane 4E",
    "Craven C Study Room",
    "Bella Union"
];

export default function SearchContainer() {

    let [searchContainerClasses, setSearchContainerClasses] = useState('search-container down');
    let [outputContainerStatus, setOutputContainerStatus] = useState('inactive');
    
    function handleFocus(){
        setSearchContainerClasses('search-container up');
        setOutputContainerStatus('active');
        console.log('up');
    }

    function handleBlur(){
        setSearchContainerClasses('search-container down');
        setOutputContainerStatus('inactive');
        console.log('down');
    }

    const dests = destinationsArr.map(item => {
        return (
            <div key={item}>
                {item}
            </div>
        )
    })

    return (
        <div className='search-container-placer'>
            <div className={searchContainerClasses}>
                <div className='search-icon'>
                </div>
                <div className={'search-output-container '+outputContainerStatus}>
                    <div className='destinations-title'>
                        Destinations
                    </div>
                    <div className='destinations-container'>
                        {dests}
                    </div>
                </div>
                <input onFocus={handleFocus} onBlur={handleBlur} type="text" placeholder='Search' className='search-box'/>
                {/*<div className='search-box'>Search</div>*/}
            </div>
        </div>
      
    )
    }