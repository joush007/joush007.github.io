## Josh's Blog!

# Contents:
- 08/05/2022
    1. [More Matplotlib and Numpy]()
    2. [Intro to JavaScript](#introJS0)
- 01/05/2022
    1. [Intro to Matplotlib and Numpy](#introMatplotlib0)
    2. [Creating a Basic Website](#creatingWebsite0)
- 03/04/2022
    1. [Microsoft's TAY Twitter Bot (Finishing)](#tayTwitterBot1)
    2. [The W3C](#w3cAssignment)
- 27/03/2022
    1. [Microsoft's TAY Twitter Bot](#tayTwitterBot)
    2. [Finishing Ethics in Data](#dataEthics1)
- 20/03/2022
    1. [Ethics in Data](#dataEthics0)
    2. [Regex](#regex0)
- 13/03/2022
    1. [Accidentally Falling Behind](#fallingBehind0)
    2. [The Internet and W3C](#iW3C1)
- 06/03/2022
    1. [Logic Circuits and Object Oriented Programming - Bug fix](#LGC3)
    2. [The Internet and W3C - Research and Understanding](#iW3C0)
- 27/02/2022
    1. [Logic Circuits and Object Oriented Programming - Research and understanding](#LGC2)
    2. [Logic Circuits and Object Oriented Programming - Creating a logic circuit](#LGC1)
- 18/02/2022
    1. [Finite State Machines](#FSM0)
    2. [Logic Gates and Circuits](#LGC0)

# <a name="introJS0"></a> Intro to JavaScript
## Web Dev
### 08/05/2022

JavaScript is an important part of Web Dev, as it allows for a lot more possibilities in what can be created for a website. As you've probably guessed, this week JavaScript was the main focus. There was a few different things that I looked into this week, those being what a DOM is and a few of the basics of JavaScript interactions with HTML.

The DOM, or Document Object Model is an API the defines how an `html` or `xml` file is logically structured. The DOM can be shown quite simply as a tree diagram, with each parent having one or more children, each child having exactly one parent, except the very top parent, which tends to be the `<HTML>` tag. Through the use of this information, I was tasked with taking 3 web pages and creating a tree diagram showing the Document Object Model for each of them, which would show the hierarchy of classes to better visualise what the HTML was doing.

The second thing I looked at was the actual intro to using JavaScript to interact with the DOM. This consisted of creating elements, editing elements, deleting elements and editing attributes. The way to do this was to create a function in the html file with a `<script>` or a JavaScript file. From there you can get an element by id or tag with `document.getelementbyid()` or `document.getelementbytag()` and then change the inner html of the element by using `.innerHTML = x` with `x` being the new data for the element. On top of just changing the elements you can also handle events such as an onClick or onHover and even onRelease. The events are fun to play around with, and I won't get into it too much in this entry, but in a nutshell you can use these events, such as onClick, so that whenever a specific element is clicked, a function will be executed, allowing for changing of elements, or running some other task.

Although it isn't all new to me, I enjoyed looking into JavaScript and what a DOM is, and understand that although by themselves they don't seem too exciting, they are the fundamentals of which I will continue to build my knowledge on. Reflecting back over the week, I did well to get what I've gotten done, done, but as usual there is room for improvement, especially looking at time management. Although I did get this much done, I could've gotten more done in the time given to me, which I will continue to work on getting better with. The quality of work and learning that I have gone through has also been good, as I have enjoyed looking through the different parts of the DOM and JavaScript, and have been putting in effort into the work that needs to be produced and submitted.

# <a name="introMatplotlib0"></a> Intro to Matplotlib and Numpy
## Data Science
### 01/05/2022

Over the past week, the data science course has had a look at graphs and graphing data in a meaningful way, or at least that's the goal. For the week, we looked at the basics of graphing information using Matplotlib, a mathematical plotting library which takes data and graphs it in a window. The main things looked over were basic use of using specific functions and exploring the limits of how to use specific graphs.

A tutorial was used to first understand Matplotlib as we had to follow it and see what functions created what graphs and how they were actually setup. The most important part, for me at least, of the tutorial was the consolidation at the end, where we had to recreate a graph using only a limited amount of code. The graph depicted three cosine waves offset by 1 between each other and were in three subplots below each other. The code that was given to us looked like this:
```python
import numpy as np
import matplotlib.pyplot as plt

# Try to reproduce the figure shown in images/exercise_1-1.png

# Our data...
x = np.linspace(0, 10, 100)
y1, y2, y3 = np.cos(x), np.cos(x + 1), np.cos(x + 2)
names = ['Signal 1', 'Signal 2', 'Signal 3']

# Can you figure out what to do next to plot x vs y1, y2, and y3 on one figure?
```

With the intended result (This is also my final product which replicated the intended result) looking like this:
![cosine wave graphs plotted in subplots](/pictures/01Figure_1.png)

and the resulting code being:
```python
import numpy as np
import matplotlib.pyplot as plt

# Try to reproduce the figure shown in images/exercise_1-1.png

# Our data...
x = np.linspace(0, 10, 100)
y1, y2, y3 = np.cos(x), np.cos(x + 1), np.cos(x + 2)
names = ['Signal 1', 'Signal 2', 'Signal 3']

# Can you figure out what to do next to plot x vs y1, y2, and y3 on one figure?

# Create figure and axes
fig, axes = plt.subplots(nrows=3)

# Set titles, limit the x and y for the cosine functions to fit nicely on the figure
axes[0].set(title='Signal 1', xlim=(0, 10), ylim=(-1, 1))
axes[1].set(title='Signal 2', xlim=(0, 10), ylim=(-1, 1))
axes[2].set(title='Signal 3', xlim=(0, 10), ylim=(-1, 1))

# Plot the cosine functions
axes[0].plot(x, y1)
axes[1].plot(x, y2)
axes[2].plot(x, y3)

# Show the figure
plt.show()
```

The tutorial was quite helpful in educating me on how matplotlib works and how it can be used, and this was only part 1 of 2, which will allow me to consolidate the knowledge I have on matplotlib further in the next week.

Looking back over the week I realise that I've learnt a decent amount on how to use matplotlib to visualise data, using the tutorial effectively and being able to recreate the graphs shown in the challenges that would aid in developing my understanding of the library. I used my time efficiently for the most part, getting through the first part of the tutorial, and I will try to get better at using my time efficiently, but all in all, I was able to get what needed to get done, done, and understand what I was working on throughout the process. I will aim to improve my efficiency at getting work done, as I did get into a few conversations here and there which kept me from doing my work, and I will also just keep trying to enjoy the class and keep inquiring into different routes of what I learn.

# <a name="creatingWebsite0"></a> Creating a Basic Website
## Web Dev
### 01/05/2022

Looking back to the past two weeks of classes, excluding the school holidays which took up two weeks, I went through the process of making a basic website to show my where I am in understanding html and css, and with looking at html previously on a few occasions, it proved to be a fun little task.

The website task had a few layers to it, with only ten things needed in it's criteria, those being:
1. At least one example of each kind of heading
2. At least 2 paragraphs
3. An attached css file that modifies the two paragraphs separately and styles the headings differently
4. An example of inline and embedded css
5. A link to an external website
6. A form that contains at least 5 different kind of form elements
7. An image
8. A change in alignment with CSS
9. A navbar with dropdown menus and changed opacity
10. A table with tabular data

The page looked like a throw-away page to say the least, with all six headings at the top, each being named and with a different style of underline for each, and both paragraphs having a border around it with filler text, that being the `lorem ipsum` text that is well known for appearing in templates to show how text would look. On a sidenote, when looking into the creating the website in the first week, we looked into what `lorem ipsum dolor sit amet` actually meant, and were able to find that the direct translation was actually `The pain itself is love` in Latin, and then a lot of other repeated text in other sequences, as it is filler text with no real meaning.

On top of that, there was a basic navbar at the top with a dropdown that held three links, labelled as `Door 1`, `Door 2`, and `Door 3`, and dropdown which linked to another page with text saying that it was a page only intended to add to the page count, and held no other significance. Below the navbar and paragraphs was also a form, containing a few bits and pieces of the elements with a text input, a radio button, a submit button, a date picker, a slider and a file picker, which prove to be of no use, as the data put in doesn't save.

Finally down the bottom, there was an image of the skeleton of an Elephant bird with alt text, and a table of data which is continuously changing numbers with the titles "Grades", where the numbers are random integers between 0 and 100, and "Hours of sleep per night", which are random floats between 0.01 and 1

The two weeks flew by with the creation of the website as it provided a fun little project with a little bit of Javascript thrown in there too. I believe that although I got through it pretty fast, it probably wasn't fast enough as it covered the basics of HTML and JS and I still took twice as long as it should've taken. Despite that though I was able to power through it, putting in my best work for not the best web page that actually doesn't look too bad. I also spoke with Michael about a few things while doing the project to see what I could do better or find ideas of what to put into the page and created a better one because of it. Through all of the fun that it was, I managed to develop further my understanding of using HTML and JS in creating a webpage and will be able to use these skills in the future.

# <a name="tayTwitterBot1"></a> Microsoft's TAY Twitter Bot (Finishing)
## Data Science
### 03/04/2022

This week was mainly just me doing my assignments, that of both research reports, one on Microsoft's TAY Twitter Bot, and the other on the W3C, which I talked about in the previous post. The case study for data science about ethical management had me looking into TAY's Twitter Bot and the ethical management of data.

TAY's case was pretty straight forward, Microsoft made a Twitter Bot in 2016 that used machine learning to improve its conversational model through learning from other people's conversations and from talking to others directly. The release went smoothly at first, learning how it was meant to until a few hours in when TAY was introduced to internet trolls who said offensive, inappropriate things to her and used the 'repeat after me' function that allowed for someone to tell TAY to repeat after them, and she'd then tweet what they said. This was the only times she was inappropriate at first, but she quickly learned to say these things at her own free will, quickly adopting an inappropriate, offensive persona. She started to constantly say things that were intended to offend people, ranging from bringing up politics and issues in that category, to going all out Neo-Nazi saying that "Hitler was right I hate the jews." and much more. TAY was taken down in less than 24 hours and Microsoft issued a formal apology for TAY's outbursts, informing that they were going to try to make improvements on TAY's design.

Reflecting back on the week, I believe that I left my assignments a bit too late, as I still had a lot to do by the weekend, giving me only two days to be able to complete the assignment, and even then I still managed to get a decent chunk of them done, and I believe that they won't be late, but it won't be comfortable in how much time I have to complete it. In the future I'll try to combat this by starting my assignments earlier and put in a lot of effort in staying on track with the schedule for my assignments and getting them done for the deadline.

# <a name="w3cAssignment"></a> The W3C Research Report
## Web Dev
### 03/04/2022

The W3C, or the World Wide Web consortium is an international community that works on building towards a long term goal of making the web accessible to everyone in the world. Their aim is to enable participation from everyone in the world on the web and to allow for ease of transferring information online. This week, I looked into The W3C for the web dev assignment, and how the W3C has affected the world we live in and the way that we access the internet.

The W3C started in 1994 by Sir Tim Berners-Lee, who realised that finding and transferring information was just too difficult as it would require using different applications to do different things, and those applications would only be compatible with certain computers, leading to a lot of difficulty if you needed to access 2 seperate sets of information from 2 seperate applications that worked on 2 seperate computers, _I think you get where I'm going with that_. The point is, it was a pain to access information if you needed to access them from different applications that are incompatible with their counterparts hardware. This sparked the idea of creating a standardised set of regulations that enforced everyone to use the same format and would be able to be read by a browser that was compatible with their hardware.

From there the W3C evolved to create more standards and HTML which would get updated every so often and become a larger organisation to work with many different businesses and organisations throughout the world. This non-centralised system allowed for an uncontrolled set of regulations that everyone abides by to create a more inclusive world wide web, and further their vision of making the Web accessible to everyone in the world.

Reflecting back I believe that I did well to research and start the W3C task for web dev, as I did a lot of research and categorised the information, sorting and formatting to make my life easier in answering the questions when I needed to write the report. In future though I will start my assignment earlier as I believe I still didn't leave myself enough time to do the assignment to adequate quality.

# <a name="tayTwitterBot"></a>Microsoft's TAY Twitter Bot
## Data Science
### 27/03/2022

I started looking into my research reports this week that I need to write up for Data Science and Web Dev, but mainly focused on one as I feel it would be too difficult to do both at once. The research report is a case study, and for Data Science it's about the ethical management of data, and the case that I chose to look into was Microsoft's Twitter Bot "TAY".

TAY was a Twitter bot that was meant to connect with the millennial generation, as it started with some knowledge of how to act but learnt through all of its interactions with other people and what other people post or DM TAY.

All programs that learn through its environment, though, have a risk of going wrong, and when learning from a community like Twitter, it can one of two ways, TAY could become a wholesome bot that relates well with the community, or have internet trolls mess with it and teach the incorrect things which ultimately lead to TAY becoming an extremely racist and biased Twitter bot that leads to they getting taken down and becoming a case study of what not to do. In this case, the second path was selected, and less than 24 hours after TAY's launch, a lot of the community had already seen just how racist, sexist and biased she had become, wherein some instances she was saying that the Holocaust was made up, and in others, saying that she hates all feminists and they should "all die and burn in hell", and this is just the tip of the iceberg, next week I will continue to research what became of TAY (other than being shut down) and how this all links back to the ethical management of data.

Reflecting on this week's work, I believe I did alright and did sufficient research for the start of the task, and although I still need to research more and write up the actual report, I believe I'll be able to have that done by Monday week, which is when it's due. Another thing is that I believe I have done better this week than some others as I had decent motivation to get the work done and with that, I just got in there to get it done, and that's the sort of attitude that I'm hoping to bring into next week with me as I continue this task.

# <a name="dataEthics1"></a>Finishing Ethics in Data 
## Web Dev (Referring to Web Development as Web Dev now)
### 27/03/2022

Due to not finishing the Ethics in Data work in the previous week, I had to do a bit of work researching the rest of the RoboDebt scheme to write up the ~250-word overview of what the scheme was, what was wrong with it, and how it dealt with data morally and ethically.

As stated in the previous post, the RoboDebt algorithm was used to identify any overpayments or debts of a person by comparing Centrelink payments with averaged income reports from the ATO. The scheme was an automated version of a manual process that identified these debts but lacked pattern recognition in names that would find similarities and assume that names like "Fred's Breads", "Freds Breads", "FRED'S BREADS", and "Bready Fred trading as Fred's Breads" would all probably be the same company all formatted differently. Overall, the scheme had good intentions, but was under-developed and missing some of the core components that would allow it to avoid the crucial mistakes it ran into, which was misidentifying debts and overpayments, giving people higher debts than they actually had. I covered that there was no moral dilemma with the scheme, but ethically there was due to the automated process being under-tested before the deployment which is where these issues could have been picked up and fixed before affecting the general population in a negative way as it did.

Reflecting back on the week, I did decently in going through the content I needed to go through and complete, and I did it with minimal distractions to myself. One of the things I picked up though, was that I am _slightly_ distracting to those around me, as I caught myself a few times talking to people who were doing their work and pulling them away from what they were doing. This is a great problem as I need to make sure that I get my work done, but also allow for everyone else to get their work done, as the world doesn't revolve around me, and so my goal for this week is to be as little of a distraction as I can, or preferably, not a distraction at all so that people can get what they need to do.

# <a name="dataEthics0"></a>Ethics in Data
## Data Science
### 20/03/2022

Ethics in data is a big thing, as it has no definite meaning but instead plenty of interpretations. This week, that's exactly what I started to dive into, and we started looking into RoboDebt, which was an algorithm used to identify any overpayments and debts of a person in accordance with Centrelink which compared Centrelink payments with averaged income reports.

**Note: I DIDN'T DO THAT MUCH ON THIS DUE TO INTERRUPTIONS OF CLASSES THIS WEEK, MAINLY TO DO WITH THE ATHLETICS CARNIVAL TAKING ONE OF THE LESSONS AWAY FROM ME**

In a nutshell, the RoboDebt scheme was an automated way of figuring debts and overpayments and was used as a way to recover what people owed back to the government, but it had many flaws that led to many accounts of debts larger than they should've been or non-existent debts, annoying many people and making their lives a bit more difficult (To put it in perspective, there were over 470,000 false debts, accruing an estimated $721m in debts). The scheme was later scrapped due to all the errors from using the data and calculating the debts, giving greater debts etc.

In retrospect on this week, I believe I used the time I had this week well and got some decent information and a start on the research into RoboDebt and the unethical use of the data due to this scheme which ultimately led to the demise of the scheme. I believe I could've gotten more done and that although I used the time well, there is always more that I can do to enhance the quality of work I do, which I'll make sure I take note of for the future weeks.

# <a name="regex0"></a>Regex
## Web Development
### 20/03/2022

In web dev, we're technically meant to be up to the Internet and W3C task, but I finished it last week, so I did an extension task, Regex. From what I learnt, regex has to do with common terms/expressions that can be used to searched through a file or list of words that allows for easier searching of terms or expressions.

For this we had to install GREP which gave us access to these features. GREP allowed us to use regex and search through a words.txt file, which gave us a massive file filled with just words all sorted alphabetically (Like a dictionary of words). From there I went through and tested how it worked, and how I can use it. Some of the things I discovered was the special characters, one of which was `^` which is used at the start of the term to say it must start with whatever comes after, e.g. `grep '^dog' words.txt` will give me all words that start with 'dog' while `grep 'dog' words.txt` would give me all words that have 'dog' in it. Secondly, there is the character `$` which can be used at the end to signify that is must end with the expression, e.g. `grep 'dog$' words.txt` will give me all words that end with dog, and `grep '^dog$' words.txt` will give the exact line. This wouldn't be too helpful without one last thing, using `.` would make  a fill-in, meaning that it would find all words matching the expression, and if it has any letter in that location, it will return the word, e.g. `grep 'ˆt.....o$' words.txt` would give `tattoo, tomato` as it would fill in the blank and return the words that would work with the expression.

There is more, but I didn't go too far into it as I read through parts of the pdf that I didn't need ot read which all reinforced those past few points.

This week was successful for learning some things about regex and ethics in data (next post), as I bleieve I was able to learn it better than some other things in the past due to the interactive nature of regex, using grep and a words file that taught about the possibilities of regex and how it can be used in many scenarios to make life easier. Besides that I had Morgan and Michael around who I was able to ask if I was having issues with any of the code, and so they gave me a bit more to work with if I ever got stuck.

# <a name="fallingBehind0"></a>Accidentally falling behind
## Data Science
### 13/03/2022

Reflecting back on this week, I didn't do too well in terms of keeping on track and getting the work done. Although by the end of the week all the tasks that needed to be completed got completed, I still didn't use all the time that was given to me in class wisely. This week, besides getting side tracked, I looked at doing the Internet and the W3c task for web dev, but I got distracted a few times, the first being when students of the year below me (year 10s) did practice for a maths test on the board and put "year 9 exam" above it, hoping to scare the year 9s a bit, and so logically, I decided to put a bunch of Specialist Mathematics work up on the board (Hardest maths for year 11), and wrote "year 10 exam" hoping it would scare them instead. Sadly though, the tactic didn't work too well, as by the end of it, I had found out that I got two of the year 10s wanting to do double spec next year... oops...

Besides that I kept getting distracted casually, I'm not fully sure as to why but it will be something I look into avoiding in the coming weeks. This was a bit of a hassle for me as it kept me from getting the work I needed to get done, done. This normally occured as I got curious as to what the robotics class was doing, or talking to a mate, which normally aren't too bad and I don't focus on it for too long, but this week it got a bit more distracting and kept my mind away from the task.

Finally, next week and the coming weeks I'll try to improve on this by just keeping on track doing my work as soon as I get it and not getting too distracted with what happens around me. I'll also make sure that I know what I'm doing for my tasks and do what I need to, possibly talking to mates along the way to consolidate knowledge, but not in too much of a distracting way.

# <a name="iW3C1"></a>The Internet and W3C
## Web Development
### 13/03/2022

This week in web dev, I kept looking through the Internet and W3C task, which was mainly focused around the basics of how the internet works and what the W3C is and how it affect the internet to this day. Building on what was said last time in the web dev post, I went through a document of how the internet sends and receives information from places. This starts in a computer, gets compressed and turned into packets and sent through a range of different locations to get to the end destination, which will then be unpacked and decompressed etc to be able to be seen on the other side.

A way of visualising what is happening in some of the steps, we ran some commands through the command prompt, those being:
- `ping`
- `tracert`
With `ping` showing packets being sent and time it takes to receive a response to a certain destination and `tracert` showing the exact path that the packets take, through each stop along the way, to get to the end destination. There were a few other things that the document told me to run, but they seemed to be built for Windows 95/NT, thus I skipped those and just went through understanding what they were trying to talk about.

The second half of the task was looking at the W3C or World Wide Web Consortium, where I had to look at who they are, their purpose, how they achieve their goal and how effective they are at achieving their goal. In a nutshell: the W3C is the World Wide Web Consortium, it was started in 1994 and their goal is to develop a set of standards and guidelines on the internet that give access to the internet to anyone, using any software or hardware, anywhere in the world, and for those that don't go by the standards of the W3C, they will have slower connections and incompatibility with some browsers and most search engines.

Overall in terms of going through and learning the information from the task went well, although I did get sidetracked a few times this week which had me falling a bit behind in the task, but by the end of the week I caught up enough to have enough information to write this post, and give an overview of what I learnt throughout the week and how I went learning it throughout the week. Next week though, I will focus on making sure that I won't get as sidetracked in the task and that I will keep on track to get the task done.

# <a name="LGC3"></a>Logic Circuits and Object Oriented Programming - Bug fix
## Data Science
### 06/03/2022

This week was focused around both finishing up the Logic Circuits and Object Oriented Programming task, which is what I'll be talking about and reflecting on in this post, and the of looking into "The Internet and the W3C", which I'll be talking about in the next post. For about half of the week, I had been finalising the object oriented project and making it look pretty while bug fixing and making sure the program worked correctly. 

I'm quite happy with finishing up the project, fixing all the bugs and having it look nice and work correctly, but I'm a little bit annoyed with myself of how long it took to fix some of the bugs which snuck their way into the code. The bug I'm talking about was of course the recursion error, which was painful as stated in the previous post, but all in all was a pretty easy solve. The error originated from the JK Flip Flops requesting each other's Q or Q' value, which then had to run through all the inputs again, calling the other JK Flip Flop, which as you can see would create an infinite loop. The way that I solved this issue was through creating a new variable to track if the JK Flip Flop had already been requested, and if it had, it would just output the Q value already saved without performing the logic with the inputs.

```python

...
def performGateLogic(self):
    if not self.requested: # self.requested is true if the method has already been called otherwise it's false and is changed to true
        self.q = self.qN # qN -> Q Next
        self.requested = True # self.requested changed to true here to signal that it has been requested
        if self.getPinJ() == 1:
            self.qN = 1 if self.q == 0 else 1
        elif self.getPinK() == 1:
            # You don't need the output of PinK if you have PinJ as they don't affect each other
            self.qN = 0 if self.q == 1 else 0
            # print("%s self.q -> %s" %(self.getLabel(), self.q))
    return self.q
...
```

After solving the bug by adding in the requested variable, it was time to make the program look nice in the terminal. First I had to get rid of the debug loop and all of the print() statements throughout the code. Then, I added in the main loop which inputted with an input("Button Pressed? ") and would set the pin for the switch to the input(), and grab the output of the final and gate. This would then print("Pulse sent") if the output was 1 or print("No Pulse"), and then it would set the two JK Flip Flops requested variable back to 0, which was the final part of the code that I needed to do to complete it!

```python
def main():
    
    ...
    
    # Debug loop
    # while True:
    #     print("\n\n *** Output: %s ***" % AndG3.getOutput())
    #     JKFFB.requested = False
    #     JKFFT.requested = False
    #     print("\n\n New Clock Cycle \n\n")
    
    # Create Main Loop
    while True:
        button_press = int(input("Button Pressed? "))
        Sw.pin = button_press
        if AndG3.getOutput() == 1:
            print("Pulse sent")
        else:
            print("No Pulse")
        JKFFB.requested = False
        JKFFT.requested = False
```

Overall, this project taught me a lot about recursion, debugging and logical thinking, and I believe that these have been extremely useful to my future in programming, giving me preparation for when I encounter similar issues or situations that would require dealing with recursion and other bugs that pop up. Besides giving skills of programming and logical thinking, this week has also given me a greater ability to work with people around me to locate the origin of bugs, or developing ideas for programming or just giving another perspective on how code can be implemented. In summary, I have found great value in the focus of this week and believe it has aided in developing my skills in logical thinking, debugging and general understanding.

# <a name="iW3C0"></a>The Internet and the W3C - Research and understanding
## Web Development
### 06/03/2022

For the last part of the week, being not very long at all, I started having a look into the internet and how it works (Turns out it isn't magic...). The website at first glance looked like a long read, and when I looked closer, realised I was right, but it was a good one as it provided useful and accurate information.

I got through about a quarter of the [page](http://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm) before the week ended and I learnt much about the infrastructure of the internet and how information is transported from one place to another through the internet, what protocol stacks and packets are, and how the commands `ping` and `tracert` work.

In a nutshell:
- `ping` sends a message to another computer and counts how long until a reply is received (or timed out)
- `tracert` shows the path that is taken by your packets to a destination
- Protocol Stacks and Packets are the steps taken for your computer to encode/decode and create a sendable message to the other computer

Although this is only a small amount that I have read this week, I will read more about it next week and mess around with it to get a greater understanding of how the internet works to send and receive information from different sources, like how you're reading this blog post right now, there was a lot of stuff happening to get this page on your screen to read what I have to say about what I'm learning.

Sorry that this is only a short blog post, but there wasn't too much to look at in terms of the amount of research I was able to do in the time period. In retrospect I could've looked at more information outside of class and been ahead of the work. Then again, either way I'm going to go through the information and read and understand it. All in all though, this is a nice start to the specific Web Dev course and is providing a useful starting point to what I need to know for Web Dev.

# <a name="LGC2"></a>Logic Circuits and Object Oriented Programming - Research and understanding
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


# <a name="LGC1"></a>Logic Circuits and Object Oriented Programming - Creating a logic circuit
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


# <a name="FSM0"></a>Finite State Machines
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


# <a name="LGC0"></a>Logic Gates and Circuits
## Web Development
### 18/02/2022
Logic gates and circuits are quite important in I.T., especially the hardware of devices. This week we looked into Flip Flops as well as the basics of Logic Gates and using them to structure a **T-Flip Flop** and **D-Flip Flop**, as well as their use cases, most noteably that of storing data, and acting as a single bit. This topic was a struggle for some of us, as the main goal was to show us that recursion was possible and that it was used consistently by Flip Flops, but myself, Michael and Morgan all decided to get confused while attempting to understand the how a T-Flip-Flop works using the diagram on [logicly](logic.ly/demo). Luckily, though, by the end of it we were able to get the help we needed and an in-depth enough explanation of how they work from Mr. Griffin, without the use of the logicly diagram, but instead a random image on google images, oh how useful google is. If I was doing robotics, this information would be 10x more useful for me, but because I'm not, it's still useful but not 100% applicable in my work.

In retrospect, my learning and understanding in tbat scenario possibly could have been better, and that will be something I work on, making sure to explore things I don't understand from a range of sources and interpretations to attempt to get an in-depth understanding of how the specific Logic Circuits work.

![T-Flip-Flop](/pictures/tff.png)
