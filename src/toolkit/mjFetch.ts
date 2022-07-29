function newOptioins(method:string='POST') {
    return {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
}
export async function mjGet(url:string='',options:any={}) {
    const requestInit:any = newOptioins('GET');
    if (options.contentType) {
        requestInit.headers['Content-Type'] = options.contentType;
    }
    const response = await fetch(url, requestInit);
    return response.json();
}

export async function mjPost(url = '', data = {}, options:any={}) {
    const requestInit: any = newOptioins('POST');
    if (options.contentType) {
        requestInit.headers['Content-Type'] = options.contentType;
    }
    requestInit.body = JSON.stringify(data); // body data type must match "Content-Type" header
    const response = await fetch(url, requestInit);
    return response.json(); // parses JSON response into native JavaScript objects
}
