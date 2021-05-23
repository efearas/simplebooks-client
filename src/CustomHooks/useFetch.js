import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import {whereAmI} from '../Util/LocationHref';

export default function useFetch(props) {
    const globalContext = useContext(GlobalContext);

    const  myFetch = (url, data, method, doNotDisplayLoadingImage, ignoreToken) => {
        //console.log(doNotDisplayLoadingImage);
        if(!doNotDisplayLoadingImage){
            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '...', showButton: false } });
        }
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('token');
            if (!token && !ignoreToken) {
                window.location = "/login";
            }

            url = url.replace('https://3r3fjjde27.execute-api.us-east-1.amazonaws.com','');
            let origin = "https://3kyfhrnmg6.execute-api.us-east-1.amazonaws.com";

            if( whereAmI()=="local" ) {
                origin = "http://localhost:3033";
            }

            if( whereAmI()=="test" ) {
                origin = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com";
            }
        
            url = origin + url;
            console.log(url);
            
            try {
                fetch(url,
                    {
                        method: method,
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                        body: method != 'GET' ? JSON.stringify(data) : undefined,
                    }).then(
                        response =>{
                            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', showButton: false } });
                            resolve(response);
                        }
                    ).catch((err)=>{
                        console.log(err);
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Please check your internet connection.', showButton: true } });
                    }

                    )
            }
            catch (error) {
                console.log("check your internet connection");
                globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', showButton: false } });
            }
        }

        )
    }
    
    return myFetch;
}
