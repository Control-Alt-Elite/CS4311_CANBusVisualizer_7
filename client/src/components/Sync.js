import React from 'react'
import Transitions from './Transitions'
import './Sync.css'
import axios from 'axios';

export default function Sync() {
    //const get_projectName = useRef(null);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      };

    async function syncData() {
            //const projectName = get_projectName.current.value;       
            try {
                const res = await axios.get('http://localhost:3001/Sync');

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data,
                  };
                  
            } catch (error) {
                console.error(error)
              }
    };

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
                            <button id = "sync" onClick={syncData} type = "submit" > Initiate Sync </button>  
                        </div>
                    </form>
                </div>     
            </Transitions>
        </>
    )
}