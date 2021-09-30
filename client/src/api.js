const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-myapp')
    }
})

export function getEvents() {
  return instance.get('/event').then((response) => response.data);
}

export async function login(username, password) {
  await axios
    .post(BASE_URL + '/login', {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('token-myapp', response.data);
      instance.headers = { 'Authorization': `bearer ${response.data}`}
      window.location.href = '/home';
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

export function getContacts() {
    let endpoint = BASE_URL + '/contact';

    return axios.get(endpoint).then(res => res.data);
}

export function getContact(id) {
    let endpoint = BASE_URL + '/contact/' + id;

    return axios.get(endpoint).then(res => res.data);
}

export function addContact(contact) {
    let endpoint = BASE_URL + '/contact';

    contact.dateOfBirth = new Date(contact.dateOfBirth)

    return axios.post(endpoint, contact).then(res => res.data).catch(e => console.log(e.response))
}

export function save(contact) {
    let endpoint = BASE_URL + '/contact/' + contact._id;

    return axios.put(endpoint, contact).then(res => res.data).catch(e => console.log(e.response))
}

export function me() {
    let endpoint = '/profile'

    return instance.get(endpoint).then(res => res.data);
}

export function getEventById(id) {
    let endpoint = '/event/' + id

    return instance.get(endpoint).then(res => res.data);
}