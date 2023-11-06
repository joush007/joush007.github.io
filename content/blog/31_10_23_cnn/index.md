---
title: "Convolutional Neural Network"
date: 2023-10-31
tags: ["Data Science","Machine Learning","Python"]
---

# Overview
Last week I realised that an artificial neural network was probably not the best model to use for a hand gesture recognition machine learning model. I had tried to see how well it would interpret a large number of inputs with a neural network and how efficient it would be to then use that with an image for recognition. I figured out that it wouldn't be very efficient and would be quite difficult to use well, and so I found out about a Convolutional Neural Network. A CNN is similar to an ANN but it has two more initial layers. It is primarily used for solving computer vision related problems whilst ANNs are primarily used for solving complex problems. Each have their own strengths but for this project it is better that I use a CNN.

# Convolutional Neural Network - Basically
In this post I will highlight the theory behind a CNN and how this will work for my project. The network has 3 minimum layers, a convolution layer, a pooling layer, and a fully connected layer (which is similar to the ANNs).

The Convolution layer is used to pick up on all of the defining features of the input that has been given. This means that if you have an image of a number that you want it to pick up on, it will highlight the defining lines of the number.

Next comes the pooling layer, which goes across sections of the image in order to reduce it's size and grab the maximum values of each section of the image (This is known as max pooling).

# Convolutional Neural Network - Application
I will be applying this CNN to my own project to be able to get a more accurate model to recognise hand gestures. It will optimise the speed and efficiency of the machine learning and be able to produce a lot more accurate results. Although I spent a lot of time on the ANNs I will hopefully be able to get a better result by using a CNN over an ANN. The rest of the project (1 week) will be dedicated to building the model and training it so that I can have a hand gesture recognition model for the assignment.
