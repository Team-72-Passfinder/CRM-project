I have some explanation regarding the *maybe* update for Contact model in DB. This also revolving around the Chat feature (which we considered non-essential), so if we not implement it then this message can be safely ignored.
Ha and me planned to add a new attribute `optionalUserId` for Contact model.

Explaination:
User is who will register an account while Contact *can* be created by User *or* import from existing User. Imagine there are 2 button "Create a new contact" and "Add contact from existing User". A Contact created manually by User (the former option) won't have `optionalUserId` attribute. When we do the later, Contact will also come with the `optionalUserId`. 

A Contact with `optionalUserId != null` can be think of as both User and Contact as the same time.

Code-wise, in our program, User will NEVER interact with another user, for the sake of abstraction. User only interact with other 5 models only.

**Q**: So what happened with the Chat feature? How can User chat with Contact?\
**A**: That's why we have the `optionalUserId` attribute. We only display Contact that has that attribute in the Chat List.

From the POV of the user, they are chatting with another User. From our coder's POV, they are chatting with Contact if `contact.optionalUserId != null`

**Q**: Why this is so messy and hard to understand?\
**A**: Due to the client's request of the Chat feature, we have to do this (trying to cast User into Contact) so we use the data easier. **There's maybe a better way though**.

**Q**: What if we don't do like this?\
**A**: Imagine a case where a user know 5 people, 3 people that don't know what Citrus-Contact is and 2 people already has an account. The user want to add all 5 of them easily. 
- If they are added as normal Contact, then the user later has to somehow add the 2 people with account into the Chat List, and that will duplicate data and confusing.
- If they are added as User, then the user must ask 3 people to register for this weird app Citrus-Contact, which obviously not a good idea.
