function getAPIURL(endpoint) {
    // Make sure to include the protocol and hostname
    const baseURL = "http://localhost:5145"; // Adjust if needed for production
    return `${baseURL}${endpoint}`;
}

export async function FetchAPI({ endpoint, method = 'GET', body = '' }) {
    let url = getAPIURL(endpoint);
    
    // Use the fetch API to make the request
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
