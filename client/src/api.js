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
  let endpoint = '/event/getall';
  return axios.get(endpoint, config).then((response) => response.data);
}
export function getEvent(id) {
  let endpoint = '/event/' + id;

  return axios.get(endpoint, config).then((response) => response.data);
}
export function addEvent(event) {
  let endpoint = '/event/';

  return axios.post(endpoint, event, config).then((res) => res.data);
}

export function setEvent(id) {
  let endpoint = '/event/' + id;

  return axios.post(endpoint, id, config).then((res) => res.data);
}

export function getEventsFromContactId(contactId) {
  let endpoint = '/event/search/';
  let query = {
    query: '',
    participants: [contactId],
  };

  return axios
    .post(endpoint, query, config)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export function deleteEvent(id) {
  let endpoint = '/event/' + id;

  return axios.delete(endpoint, config).then((res) => res.data);
}

export function updateEvent(event) {
  let endpoint = '/event/' + event._id;

  return axios
    .put(endpoint, event, config)
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

export async function registerUserdata(userdata) {
  await axios
    .post('/register', {
      username: userdata.username,
      password: userdata.password,
      email: userdata.email,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      dateOfBirth: userdata.dateOfBirth,
    })
    .then(function (response) {
      localStorage.setItem('token-myapp', response.data.token);
      instance.headers = { Authorization: `bearer ${response.data.token}` };
      window.location.href = '/home';
    })
    .catch(function (error) {
      console.log(error.response.status);
      return Promise.reject(error.response.data.message);
    });
}

export function getContacts() {
  let endpoint = '/contact/getall';

  return axios.get(endpoint, config).then((res) => res.data);
}

export function getContact(id) {
  let endpoint = '/contact/' + id;

  return axios.get(endpoint, config).then((res) => res.data);
}

export function addContact(contact) {
  let endpoint = '/contact';

  contact.dateOfBirth = new Date(contact.dateOfBirth);

  return axios
    .post(endpoint, contact, config)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export function addByUserId(userId) {
  let endpoint = '/contact/add/' + userId;

  return axios
    .post(endpoint, {}, config)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export function updateContact(contact) {
  let endpoint = '/contact/' + contact._id;

  return axios
    .put(endpoint, contact, config)
    .then((res) => res.data)
    .catch((e) => console.log(e.response));
}

export function delContact(id) {
  let endpoint = '/contact/' + id;

  return axios.delete(endpoint, config).then((res) => res.data);
}

export function me() {
  let endpoint = '/profile';

  return instance.get(endpoint).then((res) => res.data);
}

export function updateUser(body) {
  let endpoint = '/user/change-password';

  return instance
    .post(endpoint, body)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error.response.status);

      switch (error.response.status) {
        case 401:
        case 400:
          return Promise.reject('Wrong password');
        default:
          return Promise.reject('Authentication failed');
      }
    });
}

export function getEventById(id) {
  let endpoint = '/event/' + id;

  return instance.get(endpoint).then((res) => res.data);
}

export function sendEmailInvite(id) {
  let endpoint = '/invite/' + id;
  console.log('Send invite');
  return axios.get(endpoint, config).then((res) => res.data);
}

export function searchUser(searchQuery) {
  let endpoint = '/user/search/';
  let query = {
    query: searchQuery,
  }

  return axios
    .post(endpoint, query, config)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
