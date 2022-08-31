# Data Science Assignment & Matplotlib Part 4
## Data Science
### 23/05/2022

Throughout the past week I was start thinking about what I was going to do for the assignment I have received for Data Science that involved me to obtain a dataset, create a hypothesis and then analyse the data to either prove or disprove my hypothesis, which includes plotting the data in a useful and easy to understand way. The other part of the week was me looking at doing part 4 of the intro to Matplotlib course, which I hadn't gotten entirely completed, but managed to get the first half of done.

I'll start with the matplotlib stuff first. Through looking into more of the basics of matplotlib I was able to gain a deeper understanding into the different ways I can use matplotlib to plot data in a useful way, which will be useful for my assignment. I looked into the use of three main methods, those being:

* `ax.margins()` - Change the margins for the plot, giving padding by x amount
* `ax.axis()` - Change how the axis will fit into the plot
* `ax.legend()` - Gives a legend for the different graphed lines/sets of data

Through the use of the three methods I was able to replicate a specific graph looking like this:

![2 circles graphed with a legend](/pictures/23Figure_1.png)

The graph presented above was produced by the code:
```py
import numpy as np
import matplotlib.pyplot as plt

plt.style.use('classic')

t = np.linspace(0, 2 * np.pi, 150)
x1, y1 = np.cos(t), np.sin(t)
x2, y2 = 2 * x1, 2 * y1

colors = ['darkred', 'darkgreen']

# Try to plot the two circles, scale the axes as shown and add a legend
# Hint: it's easiest to combine `ax.axis(...)` and `ax.margins(...)` to scale the axes
fig, ax = plt.subplots()
ax.plot(x1, y1, color=colors[0], label='Inner')
ax.plot(x2, y2, color=colors[1], label='Outer')

ax.margins(y=0.05, x=0.2)
ax.axis("tight")

ax.legend()

plt.show()
```

Secondly I was able to start on the data representation and analysis assignment, which I hadn't gotten much of it done, but I had looked into a few datasets, one of which being of annual car sales and the change throughout time, which is a topic that slightly interests me, and of which I find more interesting than other data sets available to me.

As stated, I haven't gotten too much of the assignment done but I have had a look into the dataset and already partly developed a hypothesis, that being: As the Australian population increases, the amount of cars sold in Australia will also increase. The only issue is that I'm not 100% sure that I will stick with this dataset as I'm unable to actually find a csv download that would allow me to analyse the data, that will be my goal though for this week- I will try to find a csv file to use or change datasets to something I can analyse more efficiently.

I believe that I could have used this week slightly better in preparing for the assignment and/or finishing up the part 4 of intro to matplotlib, but I got a decent amount done and that is one of the positives for this week. I will make sure that in future weeks I will get right into doing the assignment so that it is in on time or even early. This will be the challenge I set for myself for the week, and I will attempt to discipline myself to make sure it gets done, as I don't want a repeat of my English assignment.