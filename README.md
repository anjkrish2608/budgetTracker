# Budget Tracker

[Click here to view the application on heroku.](https://budget-tracker-anjkrish2608.herokuapp.com/)

[Click here to view repository.](https://github.com/anjkrish2608/budgetTracker)

## Table of Contents

* [Description of Application](#des)
* [Technologies Used](#tech)
* [Challenges Faced](#chall)
* [Features to be Implemented](#dev)
* [Installation Steps](#insta)
* [Tests](#tests)
* [How to Use](#use)
* [Licence](#lic)
* [Credits](#cred)

<a id="des"></a>

## Description of Application
The Budget Tracker is an application which tracks the users spending, it allows the user to keep track of the overall total and individual entries. Furthermore the user is able to utilise these features offline and the data is still held on the database.

<a id="tech"></a>

## Technologies Used
While creating this application I have used many different technologies listed below:

* JavaScript ES6 : to write all of the code inside index.js
* Node JS : to run the server.js file
* Indexed DB : to maintain the data when the server is offline

<a id="chall"></a>

## Challenges Faced
I actually thoroughly enjoyed this homework. I liked the challenge of nit picking the code to see which variables scope was insufficient and the small syntax errors I made in the beginning in creating the indexed db which drove me crazy. A particular feature I found very interesting was the code used to determine whether the server was online or not I used the code from [Study Tonight](https://www.studytonight.com/post/check-if-user-is-offline-online-in-javascript#:~:text=To%20check%20if%20the%20user%20is%20online%20or%20offline%20when,onLine)%20%7B%20console.), written by iamabhishek shown below.

```
window.addEventListener('online', function(e) {
    console.log('And we\'re back :).');
}, false);
            
window.addEventListener('offline', function(e) {
    console.log('Connection is down.');
}, false);
```
This code does create one error which I will one day fix... the offline variable used to determine whether to complete the post request is undefined unless the server goes offline... I havent yet understood why it doesnt tell you the server is online when the application is initially opened but anyway this creates an error if the user goes offline before posting online.


<a id="dev"></a>

## Features to be Implemented
In the future I would like to correct the error mentioned in the previous section and refactor the code to be more efficient.

<a id="insta"></a>

## Installation Steps
1. Download the repository folder.
3. Run the terminal in that folder and write the following commands:
```
npm init
npm install
npm start
```
4. Enjoy!

<a id="tests"></a>

## Tests
There are currently no tests for this application.

<a id="use"></a>

## How to Use
After following the Installation steps open [https://localhost:3000](https://localhost:3000) or click [here](https://budget-tracker-anjkrish2608.herokuapp.com/) to access the application on heroku.

<a id="lic"></a>

## Licence
MIT License

Copyright (c) 2020 Anjini Krishnan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<a id="cred"></a>

## Credits
As mentioned in [Technologies Used](#tech) the following assets were used:
* [JavaScript ES6](https://www.javascript.com/)
* [Node JS](https://nodejs.org/en/)
* [Indexed DB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
* [iamabhishek](https://www.studytonight.com/profile?id=1)
Furthermore the requirements and the inital code for this application were supplied by Trilogy Education Services.

© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.