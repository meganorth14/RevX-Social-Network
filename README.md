# RevX-Social-Network

 ## Table Of Contents

- [Description](#Description)

- [Features-implemented](#Features-implemented)

- [Technologies used](#Technologies-used)

- [Commands to get started](#Commands-to-get-started)

- [Usage of the project](#Project-usage)

- [Contributors](#Contributors)

- [License](#License)

## Description
 
RevX (Social Network App) is built to connect employees of a company to other employees, whether they are associates, a trainer, or contracted employees. Each person has their own account, that comes with a unique username and employee id. Within this network, employees can interact with other users and find collections of information about major software topics. It also assists empoloyees with changes in position or location by allowing them to connect with people in the same location or position level.
 
 ## Features implemented
 
 Users can:
- Create an account, login, and logout
- View and edit their own account
- Search for other users by name or location and view their accounts
- View and like all posts
- Create a post
- Report a user or post
- View articles sorted by topic 

Admin users can additionally:
- View site statistics
- View  and remove all users sorted by id, name, or role
- View and remove all posts
- View and address user reports
- Create new category articles

 ## Upcoming Features
- Updated search capabilities
- Admin user edit rights
- Option to embed images in posts
- Filter post feed to network of users you follow


 ## Technologies used 
 
 - NodeJS - Version 17.0.23
 - ReactJS - Version 18.0.1
 - ExpressJS - Version 4.16.1
 - PostgreSQL - Version 8.7.3
 - CSS / React-Bootstrap - Version 2.2.3
 - Axios - Version 0.26.1

 
 ## Commands to get started
 
- In your command line, navigate to the folder where you want to store the project and enter `git clone https://github.com/meganorth14/RevX-Social-Network.git`
 
Backend
- This project requires a PostgreSQL database with the schema listed in the db/schema.sql file.
- You may use the db/seeds.sql file to populate your database, if you wish.
- You will also need a file dbconnect.js located in the src folder with your unique PostgreSQL Pool informtaion.
- Then, navigate to backend folder
- Enter `npm install` in your command line
- Enter `node server.js` to launch the backend server

Frontend
- Navigate to frontend/projectapp
- Enter `npm install` in your command line
- Enter `npm start`. You will be directed to your browser
 
 ## Project-usage
 - For individual use within a company
 - Company will set admin users to monitor overall activity and release access company wide for employees to connect and interact
 
 ## Contributors
 - Stefan Riley
 - Megan Orth
 - Samuel Sholib

 ## License
mit
