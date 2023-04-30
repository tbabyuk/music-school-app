# Music School App (React)

See it live: [Music School App](https://master--luxury-tapioca-b5e13d.netlify.app/)

## Description
A react app for a music school business. This app is designed to help the school administrator/front-desk person keep track of various to-do tasks as well as view and manage inventory for products (primarily books) that the music school sells. This version of the app is simplified for the purposes of the portfolio. The actual version of this app also includes login/authentication functionality achieved with Firebase Auth and can be found at this link: [Actual Music School App](https://admin.dacapomusic.ca/).

## Background & Motivation
I built this project for a local music school to help with their day-to-day operations. Prior to this app, the front-desk person was using spreadsheets to keep track of their to-do tasks and inventory. With my app, I was able to make things a lot more customized to the school's needs, which has made admin work a lot easier and with everything located in one place.

## Technologies
The current version of this project was done with:
* HTML / Bootstrap + vanilla CSS
* React (with Routing, Context, and Framer Motion for menu)
* Firestore database

## State of Completion
The actual version of the app is completed and being actively used by the school administration. I continue to add new features on an ongoing bases as per the school's request.

## Learning Lessons & Challenges

### Using Firebase
I had to figure out how to interact with Firebase in order to persist information when it came to adding, removing, editing, etc. todo tasks, as well as retrieving book info and subtracting book quantity from the book inventory table. This was challenging at times but very rewarding, and made me gain a lot of appreciation for Firestore and Firebase in general. It also deepened my understanding of how a database interacts with the code base.

### Context
I enjoyed figuring out how to use Context to make my database available to the pages that needed it. This was a neat little challenge and I'm very happy with the way I dealt with it. I could have configured Firestore directly in App.js and then made the database available to all the relevant components. But in the interest of keeping App.js leaner and less cluttered, I instead opted to set up Firebase in an external file (FirebaseContext.js) and then just export it from there using Context.

### Inventory Table
Creating this table was a fun challenge. I made it part of a pop-up modal and had to make sure it was scrollable. Also, I wanted to make it dynamic so that the color of each row would change depending on the stock quantity of each book. I handled this using dynamic styling, applying a particular color to the row depending on the book quantity, which came from the database/state.

## Summary
I am very pleased with how this app turned out and more so because the people using it have given me very positive feedback. As mentioned earlier, I will continue to improve it and add features on a per-need basis. One of the things I am planning to add is a real-time chatroom where different school employees, or school owner/employee can communicate without having to be in the same physical location.




