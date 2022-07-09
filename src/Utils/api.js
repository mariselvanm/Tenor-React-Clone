const base = 'https://g.tenor.com/v1';
const key =  'LIVDSRZULELA';

export async function api( endPoint,method, params = {}, data) {
    let url = `${base}/${endPoint}?key=${key}&limit=8&locale=en`;
    // append params if there is any
    Object.keys(params).forEach(key => url+=`&${key}=${params[key]}`);

	let resultPromise = await fetch(url, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});

	return await resultPromise.json();
}