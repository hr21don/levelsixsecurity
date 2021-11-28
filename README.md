# Level_Six_Security
Authentication &amp; Security! 

## Welcome to Secrets!

Our mission statement is to introduce and impress organisations with the importance of proper secret management in today's enviroment, as a leaked password could lead to data breaches with heavy consequences. 
This has become very significant over the last couple years as more & more workload is being pushed towards the cloud. 

<img width="720" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142766077-6b1b33db-bce5-4b6a-8978-b417b1d30bde.png">

Secret management plays an important role in keeping essential information secure and out of threat actors' reach.

## Input

Once, in the Register page the user will be prompted to register or authenticate themselves with Google,Facebook or GitHub using the OAuth 2.0 API.

Enter your input into the email and password field then follow up by pressing the 'Register' button to register to the site.
[REMEMBER YOUR_EMAIL + YOUR_PASSWORD]

<img width="877" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142766293-a0f5823a-1808-443f-b805-3f3e5f791295.png">


## Output 

The example output will prompt the user to submit a SECRET as follows!

<img width="748" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142766491-59228f4e-3ea6-4924-aaee-43d2b4cbc7d3.png">

Enter your new secret into the 'What's your secret?' field and press the button submit as follow... Don't worry your secret will be securely held until you next login! 

<img width="906" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142766557-1da57f40-a433-431a-a22a-b88fe15a124b.png">


## Authorisation Use Cases
If the user wishes to authenticate themselves and authorise the secrets App then they can use Google,Facebook or GitHub to login using the OAuth 2.0 API framework which is showcased in the following use cases.

## Use Case One

<img width="702" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142766730-98baf604-7dab-4d29-b352-e6d3780dce37.png">

User selects Facebook to authenticate themselves and authorise the secrets App which will prompt the user to login, where the app secrets will request the following from the user.

<img width="395" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142766814-40c7a720-22fb-46f9-89cc-f5629b269f21.png">

## Use Case Two

<img width="404" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142767109-04d09329-85a5-4940-a26a-7b0e04145b3c.png">

User selects Google to authenticate themselves and authorise the secrets App which will prompt the user to login, where the app secrets will request to view the user profile prior to rendering the secrets page. 

<img width="789" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142767277-1fc54001-16d6-406d-9d96-fe221c6a84bd.png">


## Use Case Three

<img width="326" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142767605-a27a46d8-0e51-4fbd-9c86-a1f4473a77f0.png">

User selects Github to authenticate themselves and authorise the secrets App which will prompt the user to login, where the app secrets will request to view the user profile prior to rendering the secrets page. 

<img width="733" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142767644-1e77561d-2cf2-42c0-b39d-f9066aa5f2c0.png">


## Security 

Security within the Secrets App utilises minimal overhead by using salting, hashing and password management through Auth0.

* Auth0 helps you prevent critical identity data from falling into the wrong hands.
*	Passwords are always salted and hashed using bcrypt. 

## Example grabbed using Robo3T from Database [userDB]

<img width="516" alt="mandela-featured-image2" src="https://user-images.githubusercontent.com/91548582/142767872-4af908c4-76b2-4363-8cd9-b143ecd8edf2.png">

If you check the example, there is no field for password because passport-local-mongoose plugin created a salt & hash for the provided unique username of ‘test@email.com.’

## Theory Vs Best Practise 

In theory if a password is kept private and secure, unauthorised access will be prevented. 

In practise, is this enough???

As Cybercriminals use rainbow tables of stored potential passwords allowing them to gain access when the correct password is attempted. 

Why use the pbkdf2 algorithm?

This node crypto library was selected for securing the users personal information inputed to the Secrets App as the appropriate (independent) platform, where every generated salt is saved which makes rainbow table attacks even harder.
The Password-based Key Derivation Function 2 (pbkdf2) prevents password cracking tools from making the best use of GPU's and this reduces the guess rate from hundreds of thousands of guesses per second, to less than a few tens of thousands of guesses per second. 


## How to run? || Download the zip file to your downloads directory and extract it.

* Open up a terminal/cmd and change to the directory with app.js in it
* Run app.js locally using 'nodemon app.js' to start the server on localhost:3000.

## Useful Resources 

* https://ejs.co/
* https://nodejs.org/en/download/
* https://www.npmjs.com/package/nodemon 
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
* https://robomongo.org/
