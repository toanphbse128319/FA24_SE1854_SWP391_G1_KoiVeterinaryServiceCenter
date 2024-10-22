function getAPIURL( endpoint ){
    let url = window.location.protocol + "//" + window.location.hostname + ":5145" + "/api" + endpoint; 
    return url;
}

export default getAPIURL;
