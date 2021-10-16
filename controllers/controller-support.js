// Controller to perform CRUD and other support functions
const Contact = require('../models/contact');
const Event = require('../models/event');

// Update a data identified by the data's Id =====================================
function updateData(controller, req, res) {
  // Get the id
  const id = req.params.id;

  // Case of updated sucessfully
  controller
    .findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedData) => {
      res.status(200).send(updatedData);
    })
    // Case of error
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error when updating Data!',
      });
    });
}

// Delete a data with the specified data's Id ====================================
function deleteData(controller, req, res) {
  const id = req.params.id;
  controller
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        // If no id found -> return error message
        return res
          .status(404)
          .send({ message: 'No data found to be deleted!' });
      }
      // Else, the data should be deleted successfully
      res.status(200).send({ message: 'Data is deleted successfully!' });
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error accessing the database!' });
    });
}

// Retrieve and return all data from the database =================================
function findAllData(controller, req, res) {
  // Return all data using find()
  controller
    .find()
    .then((data) => {
      res.send(data);
    })
    // Catching error when accessing the database
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
}

// Get name of saved contact that belongs to a specific user ======================
async function getNamesFromContactIds(belongsTo, contactList) {
  // Array that stores transformed contactId
  const names = [];
  // Loop the list
  await Contact.find({ _id: { $in: contactList }, belongsTo: belongsTo })
    .then((found) => {
      if (found) {
        found.forEach((element) => {
          //const name = found.firstName + " " + found.lastName;
          names.push(element.firstName + ' ' + element.lastName);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      // do nothing --> checks for length of participant list will give error for us
    });
  //console.log(names);
  return names;
}

// Function to structure event for returning ==================================
// Main job: turns participants into names instead of leaving it as contactIds
async function displayEvent(event) {
  return {
    _id: event._id,
    belongsTo: event.belongsTo,
    name: event.name,
    startedDateTime: event.startedDateTime,
    endedDateTime: event.endedDateTime,
    completed: event.completed,
    participants: await getNamesFromContactIds(
      event.belongsTo,
      event.participants
    ),
    description: event.description || '',
  };
}

// Function to structure relationship for returning ============================
// Main job: turns people into names instead of leaving it as contactIds
async function displayRela(rela) {
  return {
    _id: rela._id,
    belongsTo: rela.belongsTo,
    people: await getNamesFromContactIds(rela.belongsTo, rela.people),
    startedDatetime: rela.startedDatetime,
    tag: rela.tag,
    description: rela.description,
  };
}

// Delete data that is associated with user, called when a user is deleted
// Including: contact, event and relationship
// Convo??
async function deleteDataOfUser(controller, userId) {
  await controller
    .deleteMany({ belongsTo: userId })
    .then(() => {
      //console.log('data deleted!');
    })
    .catch((err) => {
      console.log(err);
    });
}

// Function that search contacts that user has not been in touch recently
/* Show receive req.body as:
{
  from: date
  to: date
}*/
async function getNotInTouchRecently(req, res) {

  const from = req.body.from;
  const to = req.body.to;
  const belongsTo = req.user._id;

  // List contains recently contacted contacts
  const recentlyContact = new Set();
  var allContacts = [];

  //
  await Contact.find({ belongsTo: belongsTo }).then((data) => {
    // If data is found, return empty
    if (data) {
      data.forEach((cont) => {
        allContacts.push(cont._id);
      });
    }
  });
  //console.log("Line 155: {all contactIds}");
  //console.log(allContacts);
  // Get list of events that are in this date range
  // Retrieve contacts that participate in these events
  Event.find({
    belongsTo: belongsTo,
    $or: [{
      startedDateTime: {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      }
    },
    {
      endedDateTime: {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      }
    }]
  }).then(async (events) => {
    //allContacts = await getAllContactIdList(belongsTo);
    // If no event found, should return all the contacts
    if (!events) {
      const names = await getNamesFromContactIds(belongsTo, allContacts);

      return res.status(200).send({
        contactIds: allContacts,
        names: names,
      });
    }
    //console.log("Line 184: {found events}");
    //console.log(events.length);
    // Else retrieve contactId from each of found events
    events.forEach((ev) => {
      ev.participants.forEach((part) => {
        recentlyContact.add(part);
      });
    });

    //recentlyContact.forEach(elem=>{c = mongoose.Types.ObjectId(elem)})

    //console.log("Line 193: {recentlyContact}");
    // console.log(recentlyContact);
    // filter those that are not in this recentlyContact list to return
    const toReturnIds = allContacts.filter(elem =>
      !Array.from(recentlyContact).some(contact => elem.equals(contact))
    );

    const toReturnNames = await getNamesFromContactIds(belongsTo, toReturnIds);
    // return the data
    //console.log("Line 207: {toReturnIds}");
    //console.log(toReturnIds);
    return res.status(200).send({
      contactIds: toReturnIds,
      names: toReturnNames,
    });

  }).catch((err) => {
    console.log(err);
    return res.status(500).send({ message: 'Error when accessing the database!' });
  });
}

module.exports = {
  updateData,
  deleteData,
  findAllData,
  getNamesFromContactIds,
  deleteDataOfUser,
  displayEvent, displayRela,
  getNotInTouchRecently,
};
