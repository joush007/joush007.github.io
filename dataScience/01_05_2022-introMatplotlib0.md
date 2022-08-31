# Intro to Matplotlib and Numpy
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