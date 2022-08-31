# More Matplotlib and Numpy
## Data Science
### 09/05/2022

Matplotlib, or Mathematical Plotting Library, and Numpy are extremely useful in data science, and in particular, graphing things. They can take sets of data, and graph them, and with 25 different graphing methods, and a lot more modifications you can make to them, there is bound to be a way to visualise any data set in a meaningful way.

I looked into continuing on with last week's work in Matplotlib, continuing to consolidate my knowledge and even learn more about the library. I focused on part 2 of the intro to Matplotlib, where I learnt more about using the bar graph, fill, averaging with a line graph and then using the Y-error to check for outliers in the data. The code finalised to be:
```python
import numpy as np
import matplotlib.pyplot as plt
np.random.seed(1)

# Generate data...
y_raw = np.random.randn(1000).cumsum() + 15
x_raw = np.linspace(0, 24, y_raw.size)

# Get averages of every 100 samples...
x_pos = x_raw.reshape(-1, 100).min(axis=1)
y_avg = y_raw.reshape(-1, 100).mean(axis=1)
y_err = y_raw.reshape(-1, 100).ptp(axis=1)

bar_width = x_pos[1] - x_pos[0]

# Make a made up future prediction with a fake confidence
x_pred = np.linspace(0, 30)
y_max_pred = y_avg[0] + y_err[0] + 2.3 * x_pred
y_min_pred = y_avg[0] - y_err[0] + 1.2 * x_pred

# Just so you don't have to guess at the colors...
barcolor, linecolor, fillcolor = 'wheat', 'salmon', 'lightblue'

# Now you're on your own!
fig, ax = plt.subplots()
ax.fill_between(x_pred, y_min_pred, y_max_pred, color=fillcolor)
ax.set(title='Future Projection of Altitude', xlim=(0, 30), ylim=(0, 100), xlabel="Minutes since class began", ylabel="Snarkiness (snark units)")

ax.plot(x_raw, y_raw, color=linecolor, label='Raw Data')
ax.bar(x_pos, y_avg, yerr=y_err, color=barcolor, label='Data', edgecolor='gray', width=bar_width, ecolor='gray', capsize=5, align='edge')

plt.show()
```
which produced the output:
![09Figure1](/pictures/08Figure_1.png)

The second graph dealt with using a pcolor mesh or a heat map of sorts, displaying data with colors, the code consisted of:
```python
#Starter code
import numpy as np
import matplotlib.pyplot as plt
np.random.seed(1)

plt.style.use('classic')

# Generate random data with different ranges...
data1 = np.random.random((10, 10))
data2 = 2 * np.random.random((10, 10))
data3 = 3 * np.random.random((10, 10))

# Set up our figure and axes...
fig, axes = plt.subplots(ncols=3, figsize=plt.figaspect(0.5))
axes[0].set_aspect(1)
axes[1].set_aspect(1)
axes[2].set_aspect(1)
fig.tight_layout() # Make the subplots fill up the figure a bit more...
cax = fig.add_axes([0.25, 0.1, 0.55, 0.03]) # Add an axes for the colorbar

# Now you're on your own!
axes[0].invert_yaxis()
axes[1].invert_yaxis()
axes[2].invert_yaxis()
im1 = axes[0].pcolormesh(data1, cmap='viridis', vmax=3, vmin=0)
im2 = axes[1].pcolormesh(data2, cmap='viridis', vmax=3, vmin=0)
im3 = axes[2].pcolormesh(data3, cmap='viridis', vmax=3, vmin=0)
fig.colorbar(im1, cax=cax, orientation='horizontal')
fig.colorbar(im2, cax=cax, orientation='horizontal')
fig.colorbar(im3, cax=cax, orientation='horizontal')
plt.show()
```
and produced:
![09Figure_2](/pictures/08Figure_2.png)

Looking back over the week I learnt a lot about how to use the Matplotlib library to display information in a useful way that is easily interpretable. I learnt a lot about the different classes and subclasses in Matplotlib and the subclass of Pyplot. Reflecting back, I got through a lot in the time given to me, although I probably could have gotten more done, as also stated in the previous post, I did get through what I needed to. In the events where I needed help, I did go to others for help, and it benefitted me as it gave me a greater understanding of the topic at hand. I'll continue to attempt to spend my time wisely in class and get through the topics that are being focused on.