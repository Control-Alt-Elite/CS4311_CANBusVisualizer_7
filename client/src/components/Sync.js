import React from 'react'
import Transitions from './Transitions'
import './Sync.css'

export default function Sync() {
    return (
        <>
            <Transitions>
                <div className='config'>   
                    <div className ='header'>
                        <h3 className='text'>
                        Sync
                        </h3>              
                    </div>
                    <form>
                        <div className='Sync'>
                            <button id = "sync" value = "Create" type = "submit" > Exit Sync </button> 
                        </div>
                    </form>
                </div>     
            </Transitions>
        </>
    )
}