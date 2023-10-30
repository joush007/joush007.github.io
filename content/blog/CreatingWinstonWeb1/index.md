---
title: "Winston Wk 1 | Data Formatting Plans"
date: 2023-05-08
tags: ["Web Development", "WINSTON"]
series: ["WINSTON"]
series_order: 4
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Web Dev Plan
It's important to note, firstly, that W.I.N.S.T.O.N. is a large project, with a lot to do for each part. This is important as there was a lot of planning happening this week, in that we were looking into the ways that we were to go about implementing the first point, of setting up a connection between W.I.N.S.T.O.N. and a computer so that we can get a constant data stream that can be fed into the Data Science part of the project. In saying that, we haven't actually got a physical W.I.N.S.T.O.N. to work with at the moment, and so I should be looking into the different methods of getting a data stream without the physical robot. To do this (I shall be doing that this week, as last week I was mainly looking into the functionality of Bpy, as mentioned in the W.I.N.S.T.O.N. Data Science post) I will need to have a look at how to setup a connection over a localhost, which I've done previously, and can be easily implemented through Python if I were to use Sockets, or there might actually not be a use of the internet for transmitting data, as it would be a little bit less practical, especially if W.I.N.S.T.O.N. was being used outside of a controlled environment where there isn't internet. To do this, I could look into using Bluetooth or a similar technology, and that's what I'll have to look into this week.

The plan, by the way, that we've figured out for the data format will help a lot in getting the Data Science side of the project complete, meaning I will be able to create a program that will use a data dictionary for each point denoted by `{(x, y):z}` so that we can get a depth for each point seen by CV. This took a few different tries and ideas to understand what each of us were trying to say with the project and how we were interpretting the way that the data would be stored, but in the end it was between the data dictionary or a 2d list, where we have `[x][y] = z`, but this may change in future to a different method if I can find one that is more efficient.

Overall, this week has been mostly focused on the data science side as I kept running into issues with using the bpy library with python, and with that I ran into many issues, mostly to do with the compatible python version, that being only 3.7, how strange. This week, though I will attempt to take a step away from that (I will still continue trying to get it to work, but also do the Server Stuff) so I can get some of the other parts of the project done.

As always, I'll keep you informed!

|To Do|Done|
|-|-|
|Figure out connection method for W.I.N.S.T.O.N.||
|Setup connection to W.I.N.S.T.O.N. to allow data flow for CV||
|Setup a python flask server| |
|Create a Home Page| |
|Create Users (with Username, Password [Hashed] and Avatar)||
|Add admin page (For anything that might need to be sent to or from W.I.N.S.T.O.N. directly [UNCOMFIRMED, will have to talk with the boys about it])||
|Create Profile pages (Ideas to what to add for Users will add here)||
|Add user collections (I have to figure out what that means [from the assessment page])||
|When not logged in, go to home page||
|Create a W.I.N.S.T.O.N. page where the render will be streamed (This will be viewable by anyone but messages can be sent when logged in)||
|Display live stream||
|Any other ideas will be added to the table if this changes||