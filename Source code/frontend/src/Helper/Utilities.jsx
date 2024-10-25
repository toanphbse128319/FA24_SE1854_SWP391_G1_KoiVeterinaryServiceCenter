function getAPIURL( endpoint ){
    let url = import.meta.env.VITE_BACKEND_URL + endpoint; 
    return url;
}

export function LogOut(){
    window.sessionStorage.clear();
}
export default getAPIURL;
