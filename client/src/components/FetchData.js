import { useEffect, useState} from 'react';
import axios from 'axios';

export default function useFetchData () {
    const get_projectName = useRef(null);

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      };

    useEffect(() => {
        async function getDataByProjectName() {
            const projectName = get_projectName.current.value;       
            try {
                const res = await axios.get('http://localhost:3001/project/new', {
                params: {
                    projectName: projectName,
                },
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data,
                  };
                  
            } catch (error) {
                console.error(error)
              }
        };
        getDataByProjectName(fortmatResponse(result));
    }, []);
    return {
        data
    };
}


