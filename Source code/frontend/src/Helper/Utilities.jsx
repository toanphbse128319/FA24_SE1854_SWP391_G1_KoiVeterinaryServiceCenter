function getAPIURL( endpoint ){
    let url = import.meta.env.VITE_BACKEND_URL + endpoint; 
    return url;
}

export async function FetchJSON({ endpoint, Setter }) {
    let url = getAPIURL(endpoint);
    let response = await fetch(url).catch( (error) => console.error( error ) );
    let json = await response.json();
    Setter(json);
}

export function LogOut(){
    window.sessionStorage.clear();
}
export default getAPIURL;
