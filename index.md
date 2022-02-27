## Josh's Blog!
# Logic Circuits and Object Oriented Programming - Research and understanding
## Data Science
### 27/02/2022

Researching and understanding was quite important this week for me, as we dove straight into using Object Oriented Programming to develop a button that stays active for one clock cycle before deactivating, as said in the previous post. This task at first glance seemed a bit daunting as there was a massive reading and understanding component to it. Luckily though, it was pretty straight-forward and not too boring either. The websites and documents we read through ran through the process of turning an idea into a Finite State Machine diagram then into a Logic Circuit diagram and implementing that into a logic circuit.

We started off by taking the key idea of a button that only stayed active for one clock cycle before deactivating, and turned it into a finite state maching diagram, using just normal descriptions of how it works, and labelling them plainly and to the point. The states were then converted to binary so that it could be placed onto a truth table alongside the input so the functionality of the machine could be mapped out. The mapping out of the machine was shown in multiple ways, as there is never 1 solution, but some can provide a better functionality than others, and the difference in the two was just the use of either D Flip Flops or JK Flip Flops, with the main difference being the D Flip Flop has one input, while the JK Flip Flop has two.

![FSM Diagram Labelled](pictures/FSMDiaLab.png)

![FSM Diagram Binary](pictures/FSMDiaBin.png)

![Truth Tables D Flip Flop](pictures/TruthTableD.png)

![Truth Tables JK Flip Flop](pictures/TruthTableJK.png)

After those two steps, I had to use a Karnaugh map to find the boolean functions that produce the inputs to the flip flops. I feel that although I learnt a lot this week to do with specific Flip Flops and finite state machines, I missed some bits of crucial information, one of which was what a Karnaugh map is and how it can be used, but I will just do some more research into them this upcoming week to gain a deeper understanding into how this can be a useful tool for designing circuits or designing how a program will work, and so I looked at it and went to have a quick check of what it was, but didn't find anything that told me what it was in the quick look. Thus I accepted that it existed and had uses, and moved on through the rest of the document.

![JK Flip Flop Karnaugh maps](pictures/JK_Karnaugh.png)

To sum it up, I believe that this week has been mostly successful for Researching and Understanding the content in Logic Circuits, Finite State Machines and Object Oriented Programming, but there are still things that I need to dig deeper into to further my understanding, especially of Karnaugh maps at this point. This week has taught me a lot about the uses of FSM Diagrams and how they can be converted in Logic Circuit Diagrams and put into a functioning program.


# Logic Circuits and Object Oriented Programming - Creating a logic circuit
## Web Development
### 27/02/2022
_I love creating logic circuits from finite state machine diagrams_. This week we looked into Object Oriented Programming and Logic Circuits, in particular, JK Flip Flops and using logic gates to create a simple program. This program simulated a button that would only stay active for one clock cycle, and then disable until released and re-pressed. The clock cycle was simulated with a while loop and had an input through a switch, which was inputted once per clock cycle. This would go through a few AND, OR and NOT gates as well as 2 JK Flip Flops to have the button run for 1 clock cycle.

Creating the circuit was quite interesting as it required an understanding of JK Flip Flops, which was a new type of flip flop I hadn't learnt about. It also required reading viewing a logic circuit diagram and modifying it slightly so that it had the correct layout and didn't contain unnecessary parts. Initially I decided to just use the original diagram and take out the unnecessary components in my head and write it all in code, but that created a few bugs in the code, and so I got the right version of the circuit diagram drawn down and used that to make sure I had the right layout in code.

Original Diagram:

![Original Diagram](/pictures/buttonDiagram.png) 

Updated Diagram:

![Updated Diagram](/pictures/buttonDiagramUpdated.png)

The program still isn't finished and has a few errors in it, including the famous Recursion Error, that is often gotten from flip flops, or having two gates requiring the outputs of each other for their individual inputs. All in all, there is still a lot to get through, and although this task does have some annoying errors, they only require a bit of logical-thinking to figure out where they're coming from, encouraging the use of problem solving skills and logical thinking.

I feel This week I have been able to understand and put into use the skills of using Object Oriented Programming and creating Logic Circuits well, and not just do a straight forward task, but instead a task that requires learning something and putting it to use. Overall, the content of this week brought challenges that enhanced my problem solving and logical thinking skills as well as my general understanding of the content covered in I.T. this week.

```python

...
    # JK Flip Flop Black-boxed Logic
    def performGateLogic(self):
        if not self.requested:
            if self.getPinJ() == 1:
                self.q = 1 if self.q == 0 else 1
            elif self.getPinK() == 1:
                self.q = 0 if self.q == 1 else 0
            print(self.q)
            self.requested = True
        return self.q
...

# Main process
def main():
    JKFFT = JKFlipFlop("JKFF_Top")
    JKFFB = JKFlipFlop("JKFF_Bottom")
    AndG1 = AndGate("AndG1")
    AndG2 = AndGate("AndG2")
    AndG3 = AndGate("AndG3")
    NotG1 = NotGate("NotG1")
    NotG2 = NotGate("NotG2")
    Sw = Switch("Switch")
    Pw = Power("Power")
    Sw_AndG1 = Connector(Sw,AndG1)
    JKFFB_AndG1 = Connector(JKFFB,AndG1)
    Sw_NotG1 = Connector(Sw,NotG1)
    AndG1_JKFFT = Connector(AndG1,JKFFT)
    NotG1_JKFFT = Connector(NotG1,JKFFT)
    JKFFTnQ_NotG2 = Connector(JKFFT,NotG2)
    NotG2_AndG2 = Connector(NotG2, AndG2)
    Sw_AndG2 = Connector(Sw, AndG2)
    AndG2_JKFFB = Connector(AndG2, JKFFB)
    Pw_JKFFB = Connector(Pw, JKFFB)
    NotG2_AndG3 = Connector(NotG2, AndG3)
    JKFFB_AndG3 = Connector(JKFFB, AndG3)
    # Simulate clock cycle
    while True:
        print(AndG3.getOutput())
        JKFFB.requested = False
        JKFFT.requested = False
```


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

![T-Flip-Flop](/pictures/tff.png)
