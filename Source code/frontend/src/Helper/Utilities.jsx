function getAPIURL( endpoint ){
    let url = import.meta.env.VITE_BACKEND_URL + endpoint; 
    return url;
}

export async function FetchAPI({ endpoint, method = 'GET', body = '' }) {
    let url = getAPIURL(endpoint);
    // Use the fetch API to make the request
    console.log(url);
    if (method === 'GET') {
        return await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
            },
        }).catch((error) => console.error(error));
    }

    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(body),
    }).catch((error) => console.error(error));
}

export function LogOut() {
    window.sessionStorage.clear();
}

export default getAPIURL;
