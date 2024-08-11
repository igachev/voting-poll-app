# voting-poll-app


## Purpose of this application:
<p><strong>check voting polls results</strong></p>
<p><strong>creating voting polls</strong></p>
<p><strong>deleting voting polls</strong></p>
<p><strong>register(only with gmail) / login / logout</strong></p>


## What I learned and practiced in this project:
- `next.js`
- `next.js client-side and server-side rendering`
- `next.js routing`
- `next.js serverless API to create API endpoints`
- `React Lifting state up`
- `Component Composition`
- `React hooks`
- `to use clerk library for authentication`
- `route guards using clerk middleware`
- `shadcn/UI library components`
- `tailwind CSS`
- `MySQL to store the data`
- `practice SQL queries`
- `CSS flexbox`
- `practice TypeScript`
- `used Recharts library to display results in a diagram`


## Requirements:
  - "@clerk/nextjs": "^5.2.1",
  - "@radix-ui/react-label": "^2.1.0",
  - "@radix-ui/react-navigation-menu": "^1.2.0",
  - "@radix-ui/react-slot": "^1.1.0",
  - "class-variance-authority": "^0.7.0",
  - "clsx": "^2.1.1",
  - "dotenv": "^16.4.5",
  - "embla-carousel-react": "^8.1.7",
  - "lucide-react": "^0.400.0",
  - "mysql2": "^3.10.2",
  - "next": "14.2.4",
  - "react": "^18",
  - "react-dom": "^18",
  - "recharts": "^2.12.7",
  - "tailwind-merge": "^2.3.0",
  - "tailwindcss-animate": "^1.0.7"


## Installation:
To run the application execute the following steps:
1. clone this repository: `git clone https://github.com/igachev/voting-poll-app.git`
2. Go to clerk,register,go to dashboard,get these variables <br> <strong>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</strong> <br> <strong>CLERK_SECRET_KEY</strong> <br> and place them in `/client/env.local`
3. Adjust environment variables in file `/client/.env` according to your preferences.I am using MySQL WorkBench <br>
MYSQL_HOST='127.0.0.1' <br>
MYSQL_USER='root' <br>
MYSQL_PASSWORD='password' <br>
MYSQL_DATABASE='votedb' <br>
4. ### Execute following queries in MYSQL WorkBench in order to create the tables: <br>
       CREATE TABLE users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        user_password VARCHAR(50),
        user_email VARCHAR(100)
        );

        CREATE TABLE polls (
        poll_id INT PRIMARY KEY AUTO_INCREMENT,
        poll_title VARCHAR(150),
        poll_description VARCHAR(555),
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
        );

        CREATE TABLE poll_options (
        option_id INT PRIMARY KEY AUTO_INCREMENT,
        poll_id INT,
        poll_option VARCHAR(100),
        FOREIGN KEY(poll_id) REFERENCES polls(poll_id)
        );


        CREATE TABLE poll_votes (
        vote_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        poll_id INT,
        selected_option VARCHAR(100),
        vote_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (poll_id) REFERENCES polls(poll_id),
        UNIQUE KEY (user_id, poll_id)
        );

6. Go to folder client: `cd client`
7. Install dependencies: `npm install`
8. Start the app: `npm run dev`


## Endpoints:
- `POST /api/register` : <span>creates new user</span>
- `POST /api/login` : <span>sign in existing user</span>
- `POST /api/add-poll` : <span>creates new poll</span>
- `POST /api/add-poll/add-options` : <span>adds voting options to particular poll</span>
- `GET /api/polls` : <span>returns all polls</span>
- `GET /api/polls/:pollId` : <span>returns particular poll</span>
- `POST /api/polls/:pollId/:userId` : <span>the user votes with his selected option</span>
- `DELETE /api/polls/:pollId/:userId` : <span>the user and owner of the poll deletes it</span>
- `GET /api/polls/:pollId/votes` : <span>returns the votes for particular poll</span>


## Routes:
- `/` : <span>Home Page</span>
- `/sign-up` : <span>Register Page</span>
- `/sign-in` : <span>Login Page</span>
- `/create-poll` : <span>Create Poll Page.The user creates a poll and adds as many options to it as he wants.</span>
- `/polls`: <span>Polls Page.Displays the list of polls</span>
- `/polls/:pollId` : <span>Poll Details Page.Shows particular poll.</span>


## Images and How It Works:
<div align="center">
  <p>Home Page.It contains carousel.Use the arrows buttons to move carousel items right and left.</p>

![01 home](https://github.com/user-attachments/assets/c63a2579-894d-4582-8b54-a476797039aa)

</div>

<div align="center">
  <p>List Of Polls</p>

  ![02 Polls](https://github.com/user-attachments/assets/257aed7d-688d-4837-80e1-1471429397a0)

</div>

<div align="center">
  <p>Create Poll.Only logged in users can create polls.After you add the poll title and description another form will appear to add the options.</p>

  ![03 create-1](https://github.com/user-attachments/assets/c2ab678b-e08f-433c-8997-2448daf6c0f3)

</div>

<div align="center">
  <p>Creating Poll Options</p>

  ![04 create-2](https://github.com/user-attachments/assets/1dae9692-40bc-4120-9272-5e17acae42e4)

</div>

<div align="center">
  <p>Poll Details.Voting results are shown as a chart.</p>

  ![05 poll-details](https://github.com/user-attachments/assets/40aa4f81-5e64-430b-9fe6-5f3cc77b4aa6)

</div>

<div align="center">
  <p>Displays an error message if the user tries to vote more than once.</p>

  ![06 already-voted](https://github.com/user-attachments/assets/e0ea090a-39ce-409b-b2bc-6cb71345d5d0)

</div>

<div align="center">
  <p>The application is web responsive</p>

  ![07 responsive](https://github.com/user-attachments/assets/e1f781b1-e860-4286-965d-6be7a85b7ce3)

</div>

<div align="center">
  <p>Login Page</p>

  ![08 login](https://github.com/user-attachments/assets/5b22838f-179d-4226-9e22-da9882b18451)

</div>

<div align="center">
  <p>Displays error message if the user enters invalid credentials.</p>

  ![09 login-validation](https://github.com/user-attachments/assets/63264e04-f3de-4b5d-8a12-455b7af2347c)

</div>
