const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token-myapp'),
  },
});

// Im not sure what instace = axios.create is so I make a config object
const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token-myapp'),
  },
};

export function getEvents() {
  console.log(config);
  return axios.get('/event', config).then((response) => response.data);
}
export function getEvent(id) {
  let endpoint = '/event/' + id;

  return axios.get(endpoint).then((response) => response.data);
}
export function addEvent(event) {
  let endpoint = '/event/';

  return axios.post(endpoint, event).then((res) => res.data);
}

export function setEvent(id) {
  let endpoint = '/event/' + id;

  return axios.post(endpoint, id).then((res) => res.data);
}

export function updateEvent(event) {
  let endpoint = '/event/' + event._id;

  return axios
    .put(endpoint, event)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export async function login(username, password) {
  await axios
    .post('/login', {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('token-myapp', response.data.token);
      instance.headers = { Authorization: `bearer ${response.data.token}` };
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
  let endpoint = '/contact';

  return axios.get(endpoint).then((res) => res.data);
}

export function getContact(id) {
  let endpoint = '/contact/' + id;

  return axios.get(endpoint).then((res) => res.data);
}

export function addContact(contact) {
  let endpoint = '/contact';

  contact.dateOfBirth = new Date(contact.dateOfBirth);

  return axios
    .post(endpoint, contact)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export function updateContact(contact) {
  let endpoint = '/contact/' + contact._id;

  return axios
    .put(endpoint, contact)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export function me() {
  let endpoint = '/profile';

  return instance.get(endpoint).then((res) => res.data);
}
