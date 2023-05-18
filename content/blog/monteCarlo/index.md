---
title: The Monte Carlo Method
date: 2023-02-27
topics: ["Data Science", "Machine Learning", "AI"]
---

## What is the Monte Carlo Method?
To put it simply: The Monte Carlo method is a probability based AI that makes decisions off of a bunch of random variations of a situation to calculate the likelihood of a specific decision being the correct one in its context.

## How does it work?
To explain how it works, I'll use an example: Let's say you were playing a game of Tic Tac Toe, if you were to play a move anywhere on the board whilst versing an AI based off the Monte Carlo method, it would play a bunch of random variations of the game in the background, and scoring each of those games based on the outcome, and then it would play the move that would have the highest score or likelihood of contributing to a win.

To give a better explanation of the scoring that would happen, let's visualise it:

<table>
    <tr>
        <th>X</th>
        <th>O</th>
        <th>X</th>
    </tr>
    <tr>
        <th>X</th>
        <th>O</th>
        <th>O</th>
    </tr>
    <tr>
        <th>X</th>
        <th></th>
        <th></th>
    </tr>
</table>

### Scoring
In this example, lets say the player is X and the AI is O, it would play a bunch of games in the background, and score each of them. To score them it would take a board like this one and assign values to each move that it has played, for instance if the AI won the game, it would assign a value of 1 to each move that it played, and a value of -1 to each move that the player played. If the player won, it would assign a value of 1 to each move that the player played and a value of 1 to each move that the AI played. In this scenario the scoring of the board would look like this:

<table>
    <tr>
        <th>1</th>
        <th>-1</th>
        <th>1</th>
    </tr>
    <tr>
        <th>1</th>
        <th>-1</th>
        <th>-1</th>
    </tr>
    <tr>
        <th>1</th>
        <th>0</th>
        <th>0</th>
    </tr>
</table>

From this, the AI would take the highest scoring move and place it's move there. This would, in theory, give the AI the best chance of winning.

## Conclusion
Although the Monte Carlo AI is very simple, it is quite effective at a lot of different things, such as playing games, and even making decisions for other scenaries. I haven't implemented it myself yet, but will be looking into that next time I get the chance, as I will be researching into AI and Machine Learning this week and next week I have exams, so I will be continuing the implementation of the Monte Carlo AI after that, or possibly next week if I get the chance.

## Reflection
I hope that was a good explanation of the Monte Carlo AI, as I have spent the last week working well on going through how it works and the theory behind it. I have spent the time looking through lectures and reading the usages of the AI and continuing to collaborate with classmates about the different topics that we learn in class. Over the next few weeks I will be doing a few things, those being:

1. Researching Neural Networks, their history and how they work (exam prep, this week)

2. Doing exams (next week)

3. Implementing the Monte Carlo AI (after exams)

That should cover everything I've covered so far, and I will continue posting updates on my progress each week.