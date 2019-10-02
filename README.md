# HackTheNorth-2019
### FridgeFriend
An automated ingredient tracker and recipe curator.  (Won Hack the North 2019-Finalist) [Devpost](https://devpost.com/software/fridgefriend)

![FridgeFriendLogo](/pictures/fridgeFriendLogo.png)

## About
FridgeFriend keeps tracks of the ingredients and food items in a fridge automatically and displays them on a web application. 
This web application also allows the user to search for recipes based on the ingredients they currently have and to generate shopping lists for the ingredients they're missing.

## Technologies
We use a webcam at the back of the fridge (connected to a laptop) to take a snapshot of its contents whenever the fridge is closed after it is opened. To detect whether the fridge is open or closed, we use an ultrasonic sensor connected to an Arduino. We get the list of ingredients from the snapshot of the fridge's contents using Google's Vision API, then store this list in Firebase. 
Our web application was built using React and is hosted on Firebase.  To generate the list of recipes given certain ingredients, we used edamam's API.

