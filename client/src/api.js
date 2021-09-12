const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

export function getEvents() {
  let endpoint = BASE_URL + '/event';
  return axios.get(endpoint).then((response) => response.data);
}

export async function login(username, password) {
  let endpoint = BASE_URL + '/login';

  await axios
    .post('http://localhost:5000/login', {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('token-myapp', response.data);
      window.location.href = '/';
    })
    .catch(function (error) {
      console.log(error.response.status);

      switch (error.response.status) {
        case 401:
        case 400:
            return Promise.reject('Unauthorized');
        default:
            return Promise.reject('Authentication failed');
      }
    });
}
