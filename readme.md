Ashok Nayar
cs290, Winter 2015
Final Project

This project was done as a final project for both CS290 and CS340. It makes heavy use of database queries, php, and ajax. The idea is similar to Meetup.com, where users create meetings for shared interests. This project is specific to those who have an interest in cycling. After creating an account, a user can create meeting locations, routes to ride on, assign and create roles, and use all of the aforemention entities to create a ride. 

Known Issues
This was a complex project and lack of time lead to some minor issues. None of them should affect the functionality or usability of the project, however. 

- A few of the lists of the routes and location pages do not update after a click as most others due. A page refresh will refresh the list, however
- While most entties check for duplicate attributes, it's possible for a user to create an item and then update it after creating to match a previous entry
- Some of the deletes do not always work as they are likely foreign keys to another table. This is normal behavior but I did not have the time to create a custom warning or message for it.