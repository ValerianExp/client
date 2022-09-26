## Client

#### Endpoints

| PATH                  | DESCRIPTION                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| /                     | Conditional rendering, (un)logged user redirects to login , client(map) or driver(list of trips) |
| /signup               | Signup page                                                                                      |
| /login                | Login page                                                                                       |
| /user/profile/:userid | Show profile page with user details                                                              |
| /user/edit/:userid    | Edit user page                                                                                   |
| /user/trip/:tripid    | During the trip there is Conditional rendering, driver or client, showing a loading page         |

#### Components

- navbar
- map
- tripList
- signup form
- login form
- tripCard
- spinner
- modal Forms
