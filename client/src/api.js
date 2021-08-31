const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

export function getEvents() {
    let endpoint = BASE_URL + '/event';

    return axios.get(endpoint).then(response => response.data)
}