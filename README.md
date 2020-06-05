# budget-tracker

Depoyed Link: https://fast-thicket-52753.herokuapp.com/

AS A human who uses currency
I WANT TO keep track of my budget
SO THAT I can save money

This app allows you to input transactions which will update the graph on the page, showing what your current balance is. The cool part about this app is that it can be used both online and offline through the use of a service worker.

Usage:
Input a transaction using the forms at the top of the page, then click whether you are adding or subtracting funds. Once clicked, the graph will automatically update, showing the difference between the previous balance.

You can also use it offline, where you can input transactions, and they will update the database with those offline transactions the next time it goes online. (To try it out, open the developer tools, switch to the Application tab, go to Service Workers, and check the offline box).

Installation:
For a local repo:
    Clone repo,
    Install node modules "npm install"
    ensure mongod is running
    Run "npm start" or "node server" from the directory
