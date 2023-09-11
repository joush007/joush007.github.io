---
title: "Winston Wk 10 | ML Hand Gesture Recognition"
date: 2023-09-04
topics: ["Data Science", "WINSTON"]
series: ["WINSTON"]
series_order: 18
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Overview
This will be a bit of a short post as I'm outlining a change in the project idea and will get to working on it next week. The change is to the approach into the ML side of things, as I am changing the scope of the Machine Learning Model. Instead of recognising objects with Winston, he will have the ability to recognise hand gestures which will allow different pieces of information to be conveyed to the dog without a controller.

# Hand Gesture Recognition
To create the hand gesture recognition model, I will be taking advantage of neural networks. I will have it learn from data of hand gestures that I will create myself with many variations of the same gesture in order to give it a lot of different scenarios with the same data. This will encourage it to learn the gesture itself rather than anything else it may be picking up on. The data will be in the form of images and will be fed into the model over a period of time in the training phase. Then I will use webcam data to see if it has learnt anything and can identify the hand gestures. I haven't yet used any Neural networks, and so this will be a new experience for me. I will see the different options for training the model and see which one works best for my use case initially, but then I will attempt to branch out and see if I am able to create a model myself from scratch. As usual, this will be completed in Python.

# Plan
The initial plan for this will start with me figuring out how to make an ANN and grabbing some test training data. This will be done in an attempt to get a brief overview on how ANNs work and give me an idea of what I need to do to implement it myself. Next I will start creating my own model and creating the dataset to train it on. This will take a while as many different photos must be taken and used to train the model. Once I have the data, I will start to feed it into the model to train it, with approximately 5%-20% being used to initially test it. Once I have a larger dataset it will become more accurate with many different situations, but initially it won't be massively accurate. I will then start to test it with the webcam and see if it can recognise my own hand gestures, and if it can I can start looking into rewriting a machine learning algorithm myself for ANNs to really get a good understanding of how they work and how I can use them in the future as well as push my own boundaries and programming skills.
