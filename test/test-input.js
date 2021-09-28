const userTester = {
  missingFirstName: {
    username: 'pikachu', password: '123123123',
    email: 'alo123@gmail.com', lastName: 'Chu',
    dateOfBirth: '12/3/1234'
  },

  validUser: {
    username: 'username', password: 'password',
    email: 'fakeemail@gmail.com', firstName: 'fakeFirstName',
    lastName: 'fakeLastName', dateOfBirth: "1980-11-30"
  },

  inValidUserLogin: {
    username: 'difusername', password: 'password'
  },

  validUserLogin: {
    username: 'username', password: 'password'
  },

  preSavedUsername: {
    username: 'username', password: 'fakePassword',
    email: 'mario@mushroom.com', firstName: 'Mar',
    lastName: 'Rio', dateOfBirth: "1999-11-30"
  },

  preSavedEmail: {
    username: 'marmar', password: 'fakePassword',
    email: 'fakeemail@gmail.com', firstName: 'Mar',
    lastName: 'Rio', dateOfBirth: "1999-11-30"
  },

  updateUser: { firstName: 'Mar', lastName: 'Rio' },

  newUser: {
    username: 'secondUser', password: 'fakePassword',
    email: 'secondUser@gmail.com', firstName: 'Mar',
    lastName: 'Rio', dateOfBirth: "1999-11-30"
  }
}

module.exports = { userTester };