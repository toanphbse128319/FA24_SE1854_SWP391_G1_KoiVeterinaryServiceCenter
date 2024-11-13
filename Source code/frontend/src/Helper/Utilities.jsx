function getAPIURL( endpoint ){
    let url = import.meta.env.VITE_BACKEND_URL + endpoint; 
    return url;
}

export async function FetchAPI({ endpoint, method = 'GET', body = '' }) {
    let url = getAPIURL(endpoint);
    // Use the fetch API to make the request
    console.log( url );
    let result = "";
    if (method === 'GET') {
        result = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            },
        }).catch((error) => console.error(error));
    } else {
        result = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify(body),
        }).catch((error) => console.error(error));
    }

    if( result.status == 401 ){
        if( await result.text() == "Invalid username or password!" )
            return result;
        alert("Session expired");
        window.location.href = window.location.origin;
    }

    return result;
}

export function LogOut() {
    console.log("Logged out");
    window.sessionStorage.clear();
}

export function CheckLogin(){
    if( window.sessionStorage.length == 0 )
        return "Guest";
    return window.sessionStorage.getItem("role");

}
export default getAPIURL;
