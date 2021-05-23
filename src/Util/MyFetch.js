import {whereAmI} from '../Util/LocationHref';

export function myFetch(url, data, method) {

   

    return new Promise( (resolve, reject) => {
        let token = localStorage.getItem('token');
        if(!token) {
            window.location="/login";
        }
        try{
        fetch(url,
            {
                method: method,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: method!= 'GET' ? JSON.stringify(data): undefined,
            }).then(
                response =>
                    resolve(response)
            )
        }
        catch (error) {
            console.log("check your internet connection");
        }
    }

    )
}