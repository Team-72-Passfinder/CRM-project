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

const eventTester = {
  missingName: {
    dateTime: '1/1/1234',
    completed: false,
  },

  validEvent: {
    name: 'Coffee with Katie',
    dateTime: '1/1/1234',
    completed: false,
  },

  newEventForGetRoute: {
    name: 'Yearly company meeting',
    dateTime: '1/2/1234',
    participants: ['me', 'boss', 'secretary', 'junior'],
    description: 'Fun time',
    completed: true,
  },

  newEventForPutRoute: {
    name: 'Visit big boss Kanyes birthday',
    dateTime: '4/2/1245',
    participants: ['me', 'bigboss', 'underling'],
    description: 'Wholesome bro time',
    completed: false,
  },

  updateEvent: {
    name: 'Visit big boss Kanyes daughter birthday',
    description: 'children',
  },

  newEventForDelRoute: {
    name: 'Restaurant with myself',
    dateTime: '5/4/1234',
    participants: ['me'],
    description: 'Nothing wrong with dining alone',
    completed: false,
  }
}

module.exports = { userTester, eventTester };