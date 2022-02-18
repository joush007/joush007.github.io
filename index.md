## Josh's Blog!
# Finite State Machines
## Data Science
### 18/02/2022
Throughout the week I was able to do some revision on finite state machines. The way we did this was through taking a set of instructions for a simple machine, showing how it would work visually, on a piece of paper or digitally, and then getting to implementing it in Python. Finite state machines are important as they are able to encapsulate the behaviour of a machine and how an input can change its output based on which **finite state** the machine is in. To understand the topic, we dove into creating a finite state machine to replicate the function of 1. A **Garage Door** and how that would work, and 2. A simple **Vending Machine**. Although sometimes tedious when I had to go back through the code and try to minimise it about 5 times, it was very informative and gave a great insight into different use cases of the finite state machines, with their simple, yet logical, uses.

Looking over the progress throughout the week, I feel I was working effectively with my peers and myself, giving my 100% while talking with those next to me to get another perspective on the code, allowing for more options in the routes I can take to complete the tasks. Socialising with those around is an extremely useful tool, allowing for a range of different thoughts on a task, and pushing for creativity, which can be beneficial to give a well layed-out, effective program that produces the desired functionality. Another upside of socialising is being able to run your work by a peer, and seeing how understandable your code is, and how you could improve it based on their views.

The code below is the finite state machine that was developed this week:

```python
import math

allowed = ["10", "20", "50", "1", "2","r"]
money = 0
while True:

    # State: Insert money
    print("\nMoney in machine: $%s" % round(money, 2))
    print("\nState: Collecting Money\n")
    moneyIn = input("Please insert money (or 'r' for refund): ")
    if moneyIn in allowed:
        if moneyIn.isdigit(): 
            moneyIn = int(moneyIn)
            if moneyIn >2: moneyIn/=100
            money += moneyIn
            money = round(money, 2)
        else:
            if math.floor(money/1) > 0:
                print("%s x $1" % math.floor(money/1))
                money -= math.floor(money/1)*1
            if math.floor(money/2) > 0:
                print("%s x $2" % math.floor(money/2))
                money -= math.floor(money/2)*2
            if math.floor(money/0.5) > 0:
                print("%s x 50c" % math.floor(money/0.5))
                money -= math.floor(money/0.5)*0.5
            if math.floor(money/0.2) > 0:
                print("%s x 20c" % math.floor(money/0.2))
                money -= math.floor(money/0.2)*0.2
            if math.floor(money/0.1) > 0:
                print("%s x 10c" % math.floor(money/0.1))
                money -= math.floor(money/0.1)*0.1
            money = 0
    
    # State: Dispensing
    if money >= 1:
        print("\nState: Dispensing\n")
        print("Please choose a drink: ")
        # Make the drinks easier to add, instead of hardcoding, just put it in the list
        drinks = ["Coke","Water","Fanta","Sprite","Dr Pepper"]
        for i in drinks:
            print("%s. %s" % (drinks.index(i)+1, i))
        drink = input("> ")
        # Convert drink number to an int and give the drink
        drink = int(drink) if drink.isnumeric() else 5
        if drink <= len(drinks):
            money -= 1
            print("\nHere is your %s" % drinks[drink-1])
        elif drink > len(drinks):
            print("\nInvalid drink")
            continue
        # State: Change
        print("\nState: Giving change\n")
        print("Change: ")

        # Check to give the least amount of coins it can
        if math.floor(money/2) > 0:
            print("%s x $2" % math.floor(money/2))
            money -= math.floor(money/2)*2
        if math.floor(money) > 0:
            print("%s x $1" % math.floor(money))
            money -= math.floor(money)
        if math.floor(money/0.5) > 0:
            print("%s x 50c" % math.floor(money/0.5))
            money -= math.floor(money/0.5)*0.5
        if math.floor(money/0.2) > 0:
            print("%s x 20c" % math.floor(money/0.2))
            money -= math.floor(money/0.2)*0.2
        if math.floor(money/0.1) > 0:
            print("%s x 10c" % math.floor(money/0.1))
            money -= math.floor(money/0.1)*0.1
        money = 0
```


# Logic Gates and Circuits
## Web Development
### 18/02/2022
Logic gates and circuits are quite important in I.T., especially the hardware of devices. This week we looked into Flip Flops as well as the basics of Logic Gates and using them to structure a **T-Flip Flop** and **D-Flip Flop**, as well as their use cases, most noteably that of storing data, and acting as a single bit. This topic was a struggle for some of us, as the main goal was to show us that recursion was possible and that it was used consistently by Flip Flops, but myself, Michael and Morgan all decided to get confused while attempting to understand the how a T-Flip-Flop works using the diagram on [logicly](logic.ly/demo). Luckily, though, by the end of it we were able to get the help we needed and an in-depth enough explanation of how they work from Mr. Griffin, without the use of the logicly diagram, but instead a random image on google images, oh how useful google is. If I was doing robotics, this information would be 10x more useful for me, but because I'm not, it's still useful but not 100% applicable in my work.

In retrospect, my learning and understanding in tbat scenario possibly could have been better, and that will be something I work on, making sure to explore things I don't understand from a range of sources and interpretations to attempt to get an in-depth understanding of how the specific Logic Circuits work.
![T-Flip-Flop](/images/tff.png)
