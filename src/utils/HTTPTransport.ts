const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
    let result = '?';

    const isFirstParam = () => {
        return result.split('').reverse()[0] === '?';
    };


    for (key in data) {
        if (Array.isArray(data[key])) {
            if (isFirstParam()) {
                result += `${key}=${data[key]}`
            } else {
                result += `&${key}=${data[key]}` 
            }
        } else if (typeof data[key] === 'object') {
            if (isFirstParam()) {
                result += `${key}=[object Object]`
            } else {
                result += `&${key}=${data[key]}` 
            }
        } else {
            if (isFirstParam()) {
                result += `${key}=${data[key]}`
            } else {
                result += `&${key}=${data[key]}`
            }
        }
    }

    return result;
}

class HTTPTransport {
    get = (url, options = {}) => {
    console.clear();
            return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }
    post = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }
    delete = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }
    request = (url, options = { method: 'GET' }, timeout = 5000) => {
        const { method, data } = options;
        const xhr = new XMLHttpRequest();
        const queryParams = queryStringify(data);
    
        return new Promise((resolve, reject) => {
            xhr.open(method, url + queryParams);
            xhr.setRequestHeader('Content-Type', 'text/plain');

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

// new HTTPTransport().get('https://chats', { data: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]} });
// new HTTPTransport().put('https://chats', { data: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]} });