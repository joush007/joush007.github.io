---
title: "Monte Carlo Tic-Tac-Toe Implementation"
date: 2023-03-21
topics: ["Data Science", "Machine Learning", "Python"]
---

## Introduction
You may remember a few weeks ago we went over what Monte Carlo is and how this method is used to help machines make decisions by replicating a scenario many times and testing different outcomes to find the best outcome for the scenario. From there I've taken it a step further than just the theory by implementing it into a game of Tic-Tac-Toe.

If you'd like to follow along with what I do to implement this, you can find the starting ZIP file below which will provide you with a starting point to build off of:
{{< button href="./mc_ttt.zip">}}
Download ZIP
{{< /button >}}

It includes a class for the Board and a few empty starting functions for you to create yourself as shown here:
```py
# Constants for Monte Carlo simulator
# Change as desired
NTRIALS = 1  # Number of trials to run
MCMATCH = 1.0  # Score for squares played by the machine player
MCOTHER = 1.0  # Score for squares played by the other player

# Add your functions here.
def mc_trial(board, player):
    """
    plays a complete game given the current board and the player to move
    """
    pass

def mc_update_scores(scores, board, player):
    """
    score the board and update the grid
    """
    pass

def get_best_move(board, scores):
    """
    return one of the squares with the maximum score
    """
    pass

def mc_move(board, player, trials):
    """
    returns a move for the machine player
    """
    pass
```

## Implementation
So firstly, we have to cover just how this will work. In Tic-Tac-Toe, the board is split into a grid defined as follows:

|      |      |      |
|:----:|:----:|:----:|
| 0, 0 | 0, 1 | 0, 2 |
| 1, 0 | 1, 1 | 1, 2 |
| 2, 0 | 2, 1 | 2, 3 |

This means it would be defined as coordinates in a grid by row and column as it is probably the easiest and most efficient implementation of grids for this scenario.

Now comes the first question

### What does the program need to do?
The program needs to be able to:

1. Take in a board state
2. Test a lot of different variations of the game by making random moves for both a simulated player and the ai
3. Score each of the test games based on the outcome
4. Take the highest scoring move and play it against the player
5. Repeat on the next move

### Actual implementation of the program
Lets start with step 1, we need to take in the board state. This can be done quite easily thanks to the provided starting code which has a built in method to the board class called `board.clone()` which just returns a copy of the board which we can then use to modify and test for our second step.

#### Step 1:
We're going to start this in the `mc_move` function, which is the entry point for the ai to make a move. As stated, we'll need to start with a clone of the board which we can modify, and we need to do this for as many trials as we're running, done as follows:
```py
def mc_move(board, player, trials):
    """
    returns a move for the machine player
    """

    # To figure out a move, run trials for games then find best move by scoring
    for _ in range(trials):
        trial_board = board.clone()

    return
```

#### Step 2:
Now we have a board to work with, so let's implement the second step, which is running the actual trials for the AI to find its best move. This is done by another function called `mc_trial`, which takes in the clone of the board and runs a trial of the game with a bunch of random moves.

```py
def mc_trial(board, player):
    """
    plays a complete game given the current board and the player to move
    """
    while board.check_win() == None: # Check if the game is ended, if so a player will be returned
        empty_squares = board.get_empty_squares() # Get all the empty squares on the board
        square = random.choice(empty_squares) # Choose a random square from the list
        board.move(square[0], square[1], player) # Make a move on the board for the player
        player = provided.switch_player(player) # Switch to the other player
    return board # Return the trial board when the game is over

...

def mc_move(board, player, trials):
    """
    returns a move for the machine player
    """

    scores = list()

    # To figure out a move, run trials for games then find best move by scoring
    for _ in range(trials):
        trial_board = board.clone()
        trial_result = mc_trial(trial_board, player)

    return
```

Great! This is already starting to take shape, now for the next step.

#### Step 3:
Now that we have a bunch of trials, we need to score them. This is done by another function called `mc_update_scores` which takes in the previous scores (if there are any), the trial board, and who the ai was as a player (X or O) and updates the scores based on the outcome.

The scoring will work as follows:

- If the ai won, all scores for the ai will be increased by `MCMATCH` and all scores for the other player will be decreased by `MCOTHER`
- If the ai lost, all scores for the ai will be decreased by `MCMATCH` and all scores for the other player will be increased by `MCOTHER`
- If the game was a draw, no scores will be changed

This shouldn't be too hard to implement by looping through each square and seeing who placed it and who was the winner. From there we can update the scores accordingly.

```py
def mc_update_scores(scores, board, player):
    """
    score the board and update the grid
    """

    winner = board.check_win()
    opposition = provided.switch_player(player)

    # For each square, add score based on player & win
    for row in range(len(board._board)):
        for column in range(len(board._board[row])):

            # In case the scores list doesn't exist, create it, should go down three layers
            if not scores:
                scores = [[0 for dummy in range(board._dim)] for dummy in range(board._dim)]
            if not len(scores):
                scores = [[0 for dummy in range(board._dim)] for dummy in range(board._dim)]
            if not len(scores[row]):
                scores = [[0 for dummy in range(board._dim)] for dummy in range(board._dim)]


            if winner == player:
                
                # If the ai won and the square was played by the ai, increase the score for that square
                if board.square(row, column) == player:
                    scores[row][column] += MCMATCH

                # If the ai won and the square was played by the other player, decrease the score for that square
                elif board.square(row, column) == opposition:
                    scores[row][column] -= MCOTHER

            else:

                # If the ai lost and the square was played by the ai, decrease the score for that square
                if board.square(row, column) == player:
                    scores[row][column] -= MCMATCH

                # If the ai lost and the square was played by the other player, increase the score for that square
                elif board.square(row, column) == opposition:
                    scores[row][column] += MCOTHER
                
    return scores

...

def mc_move(board, player, trials):
    """
    returns a move for the machine player
    """

    scores = list()

    # To figure out a move, run trials for games then find best move by scoring
    for _ in range(trials):
        trial_board = board.clone()
        trial_result = mc_trial(trial_board, player)
        scores = mc_update_scores(scores, trial_result, player)
    
    # Print scores to get a glimpse of what the AI sees
    print(scores)
    
    return
```
Almost there, now we've got the board and a few scored trials (depending on the number of trialse specified at the top). Now we just need to figure out which is the best move for the AI to play. This can be incorporated in the `get_best_move` function which takes in the board and the scores and returns the best move for the AI to play.

```py
def get_best_move(board, scores):
    """
    return one of the squares with the maximum score
    """
    
    # Init a list to contain all scores and their positions
    scores_and_positions = list()

    # Add each score to the list by looping through the scores list
    for row in range(len(scores)):
        for col in range(len(scores)):
            
            # scores[row][col] is the score for a specific square
            scores_and_positions.append([scores[row][col], row, col])
    
    # Sort the list by the score in descending order, as it will take the first item in each list inside the original list and then compare the scores
    scores_and_positions = list(sorted(scores_and_positions, key=lambda x: -x[0]))

    # To prevent things from being a pain we can use a while loop to continue looping over the list until we find an empty square to play
    
    moved = False

    while not moved:
        # Popping from a list removes it and returns it, meaning it will take it out of the list and store in the score variable
        score = scores_and_positions.pop(0)
        # Check if the square is empty by checking the positions from the score list and seeing if it's in the empty squares list, if so, return the position
        if tuple(score[1::]) in board.get_empty_squares(): return score[1::]

...

def mc_move(board, player, trials):
    """
    returns a move for the machine player
    """

    scores = list()

    # To figure out a move, run trials for games then find best move by scoring
    for _ in range(trials):
        trial_board = board.clone()
        trial_result = mc_trial(trial_board, player)
        scores = mc_update_scores(scores, trial_result, player)

    print(scores)

    return get_best_move(board, scores)
```

Alrighty, and now we should have a working AI that runs a bunch of trials based off of the game of Tic-Tac-Toe and then produce a move based off of those tests. If you run it, you'll notice it's pretty hard to beat, but it does still make the wrong move sometimes. Another issue may occur where the scores are all 0, the number of trials or the negative number of trials, e.g. `[-10, -10, 0], [0, 10, -10], [10, 10, 10]`. This can be fixed (in my scenario at least) by changing the values of `MCMATCH` and `MCOTHER` up the top to not be the exact same.

The final code looks like this:

```py
"""
Monte Carlo Tic-Tac-Toe Player
"""

import random
import poc_ttt_gui
import poc_ttt_provided as provided

# Constants for Monte Carlo simulator
# Change as desired
NTRIALS = 1000  # Number of trials to run
MCMATCH = 1.0  # Score for squares played by the machine player
MCOTHER = 2.0  # Score for squares played by the other player

# Add your functions here.
def mc_trial(board, player):
    """
    plays a complete game given the current board and the player to move
    """
    while board.check_win() == None:
        empty_squares = board.get_empty_squares()
        square = random.choice(empty_squares)
        board.move(square[0], square[1], player)
        player = provided.switch_player(player)
    return board

def mc_update_scores(scores, board, player):
    """
    score the board and update the grid
    """
    winner = board.check_win()
    # For each square, add score based on player & win
    for row in range(len(board._board)):
        for column in range(len(board._board[row])):
            opposition = provided.switch_player(player)

            if not scores:
                scores = [[0 for dummy in range(board._dim)] for dummy in range(board._dim)]
            if not len(scores):
                scores = [[0 for dummy in range(board._dim)] for dummy in range(board._dim)]
            if not len(scores[row]):
                scores = [[0 for dummy in range(board._dim)] for dummy in range(board._dim)]


            if winner == player:

                if board.square(row, column) == player:
                    scores[row][column] += MCMATCH

                elif board.square(row, column) == opposition:
                    scores[row][column] -= MCOTHER

            else:

                if board.square(row, column) == player:
                    scores[row][column] -= MCMATCH

                elif board.square(row, column) == opposition:
                    scores[row][column] += MCOTHER
                
    return scores

def get_best_move(board, scores):
    """
    return one of the squares with the maximum score
    """
    
    scores_and_positions = list()

    for row in range(len(scores)):
        for col in range(len(scores)):
            
            scores_and_positions.append([scores[row][col], row, col])
    
    scores_and_positions = list(sorted(scores_and_positions, key=lambda x: -x[0]))

    moved = False

    while not moved:
        score = scores_and_positions.pop(0)
        if tuple(score[1::]) in board.get_empty_squares(): return score[1::]


def mc_move(board, player, trials):
    """
    returns a move for the machine player
    """

    scores = list()

    # To figure out a move, run trials for games then find best move by scoring
    for _ in range(trials):
        trial_board = board.clone()
        trial_result = mc_trial(trial_board, player)
        scores = mc_update_scores(scores, trial_result, player)
    print(scores)
    return get_best_move(board, scores)


# Test game with the console or the GUI.
# Uncomment whichever you prefer.
# Both should be commented out when you submit for
# testing to save time.

dimension = 3
board = provided.TTTBoard(dimension)
player = provided.PLAYERX

# provided.play_game(mc_move, NTRIALS, False)
poc_ttt_gui.run_gui(dimension, player, mc_move, NTRIALS, False)
```

And that's it! I did a lot of testing and problem solving to create this version of the Monte Carlo Tic-Tac-Toe Player, and I hope you enjoyed reading it. I am quite interested in this and how different algorithms will continue to improve my knowledge of machine learning and I will see where I can apply different ones in the future. Next coming is Linear Regression, so get ready for that. I will continue to dedicate myself to it and try to get it done well enough so that I can give a good explanation of my understanding of the subject.