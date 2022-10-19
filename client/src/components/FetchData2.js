import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchData2 (props) {

    //Declare new state variables
    const [get_ProjectName, setGetProjectName] = useState(null);

    const getData = async () => {
        try{
            const res = await axios.get('http://localhost:3001/project/new', {
                params: {
                  projectName: props,
                },
              });  
        setGetProjectName(res);
        } catch (error){
            console.error(error)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {get_ProjectName};

}