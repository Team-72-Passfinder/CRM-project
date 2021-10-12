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

const contactTester = {
  newUser: {
    username: 'contacttest', password: 'fakePassword',
    email: 'contacttest@gmail.com', firstName: 'contact',
    lastName: 'test', dateOfBirth: "1999-11-30"
  },

  testUserForPostRoute: {
    username: 'contacttest2', password: 'fakePassword',
    email: 'contacttest2@gmail.com', firstName: 'contact',
    lastName: 'test', dateOfBirth: "1999-11-30"
  },

  missingFirstName: { lastName: 'Komin' },

  // These contacts can be reused for testing event and relationship routes
  validContact1: {
    firstName: 'Nunu', lastName: 'Theboy', email: 'Nunu5i@gmail.com',
    phoneNumber: '193746xxxx', dateOfBirth: '2020-02-20', biography: ''
  },

  validContact2: {
    firstName: 'Koma', lastName: 'Komin', email: 'Komama@gmail.com',
    phoneNumber: '193746xxxx', dateOfBirth: '2020-02-20'
  },

  validContact3: {
    firstName: 'Leng', lastName: 'Ming', email: 'lmht@gmail.com',
    phoneNumber: '123746xxxx', dateOfBirth: '2020-12-20', biography: '',
  },

  updateContact: { firstName: 'Ding ding', lastName: 'Dong dong', jobTitle: ['PingPong Professor'] },

  validContact4: {
    firstName: 'Haa', lastName: 'Sugii', email: 'Hasugi@gmail.com',
    phoneNumber: '123746xxxx', dateOfBirth: '2020-12-20', biography: '',
  }
}

const eventTester = {
  missingName: {
    startedDateTime: '1/1/1234',
    endedDateTime: '1/1/1234',
    completed: false,
  },

  newEventForGetRoute: {
    name: 'Yearly company meeting',
    startedDateTime: '1/2/1234',
    endedDateTime: '1/3/1234',
    description: 'Fun time',
    completed: true,
  },

  updateEvent: {
    name: 'Visit big boss Kanyes daughter birthday',
    description: 'children',
  },
}

const relaTester = {
  newUser: {
    username: 'relatest', password: 'fakePassword',
    email: 'relatest@gmail.com', firstName: 'rela',
    lastName: 'test', dateOfBirth: "1999-11-30"
  },

  missingContact: {
    startedDatetime: '12-10-2000',
    tag: ['engineers']
  }
}

module.exports = { userTester, eventTester, contactTester, relaTester };