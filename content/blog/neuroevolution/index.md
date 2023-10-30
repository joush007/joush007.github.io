---
title: "Neuroevolution"
date: 2023-03-06
tags: ["Data Science", "Machine Learning", "Neuroevolution"]
---

Last week I looked into neuroevolution in machine learning and theory behind how it works and how it can be used in preperation for the exam. Although I have looked into a lot of information behind how it works, I don't have enough time or space to go through all that I have studied, so I will leave a link to the notes I have taken below. I will however go through the basics of what it is and how it works.
{{< button href="./Neuroevolution_Notes.pdf">}}
Download Notes
{{< /button >}}

## What is Neuroevolution?
To put it simply, neuroevolution is a machine learning technique used to generate increasingly better topologies, weights & hyperparameters (Parameter whose value is used to control the learning process) for a neural network (NN) by means of evolutionary algorithms (such as a genetic algorithm). One of the most simple ways of describing it, is if you had a neural network and genetic algorithm and combined the two, then you'd have neuroevolution.

As we know, neural networks deal with a set amount of nodes and connections which have weights and biases to affect each output and input into the next nodes which will then affect the output data, allowing for a decision to be made, which simulates the way a brain would make decisions with set neurons (without developing any new neurons or connections, but instead modifying the bias and weight of each neuron).

Neuroevolution takes it a step further and will add in new neurons, modify weights, add new connections and remove connections, all of which will be done with the ideas from the genetic algorithm. This allows for the neural network to be able to adapt to new situations and environments and become more and more complex in its NN as time goes on.

## How does it work?
Neuroevolution works by using a genetic algorithm to evolve the neural network. The genetic algorithm will use a population of genes mapped to a neural network, which will then be evaluated on how well in did in the specific environment and given a score based on that. The genes will then be sorted by their score and the best genes will be selected to be the parents of the next generation. The parents will then be crossed over and mutated to create the next generation of genes, which will share the positive traits of the parents, but also have some new traits which will allow for the NN to adapt and test new traits. This process will continue until the NN is able to complete the task at hand.

## How is it used?
Neuroevolution is used in a lot of different ways, for example in self driving cars, where the NN will be trained to drive a car in different circumstances, usually in a simulation in Unreal Engine or something similar. The NN will then learn on the go, figuring out what to and what not to do, and will be able to adapt to the new situations it is put in. This is a very useful technique, as it allows for the NN to be able to become smarter with each generation and develop a better understanding of how to attack a problem put in front of it. The reason it's put into a simulation is because it's a lot easier to test and train the NN. If you were to put it into a real car, you would have to be very careful as to make sure it doesn't damage itself (as that would be expensive) or anyone else, as this could be dangerous.

## Conclusion
As stated, this is a very simple breakdown of the neuroevolution techniques, there are a lot more situations it can be applied to and a lot more information behind how it works, but as stated, there isn't enough time and space to go through all of it here, and so in future when I work on it more, there will be more information to how it works and it's applications, but if you would like to read through a really brief set of notes that are unstructured and not very well written, but contain a decent bit of information on how it works, then you can find them below. Last week was quite interesting, I loved diving into how all of the different machine learning techniques work and how they can be used, and I'm looking forward to learning more about them in the future. This was a topic that I'd been looking forward to for a few years, but I didn't have the background knowledge required to get an in-depth understanding of it before hand, so I'm glad I've finally been able to learn about it and understand it. I've spent a lot of time on it, as can be seen in the notes, and I have been able to really use the time well to get a firm understanding, but next week I'm going to take a step back into the Monte Carlo technique and keep going from there. As usual, I'll keep you updated on how it goes.
{{< button href="./Neuroevolution_Notes.pdf">}}
Download Notes
{{< /button >}}