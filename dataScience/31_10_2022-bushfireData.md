# Bushfire Data in Australia
## Data Science
### 31/10/2022

Last week, I looked into the data of bushfires in Australia from Nasa. I was able to grab more than 1 million data points on bushfires in Australia between 2019 & 2020. Then I made a script to compare two columns of the data and graph it, but the columns were chosen each time you run it, e.g. you can change the x & y values to different columns e.g. the latitude and longitude, or other points.

Here's the code with explanations:
```py
import math
import pandas as pd
import tkinter as tk
from tkinter.filedialog import askopenfilenames
import seaborn as sb
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from os import system

# Grab column name based on index of the columns list from the attributes of the dataframe
def get_column_name(c1, c2, hue):
    return [ds.columns.to_list()[int(c1)], ds.columns.to_list()[int(c2)], ds.columns.to_list()[int(hue)] if hue else None]

# Format the dates to only have month and year
def format_dates(dates: pd.Series) -> pd.Series:
    dates = dates.to_list()
    for i in range(len(dates)):
        dates[i] = "-".join(dates[i].split("-")[:2])
    return pd.Series(dates)

# Initialise tkinter without a window and grab the file/s
tk.Tk().withdraw()
files = askopenfilenames()

# Split the files into their own datasets and then concatenate them if there is more than one
datasets = []

for file in files:
    datasets.append(pd.read_csv(file))

if isinstance(datasets, list):
    ds = pd.concat(datasets)

# Fancy print statement to show all columns and indexes to ask which columns to compare
# Looks like:
# +----+----+----+
# | 0  | 1  | 2  |
# +----+----+----+
# | c1 | c2 | c3 |
# +----+----+----+

# Init columns
columns = "+"

try:
    # 5 lines (Index and column name + in between)
    for i in range(5):
        # Column and index
        for column in ds.columns:
            # DON'T put the '-' if it is the index or column names
            if i == 1:
                # Grab the column number for index
                colNum = str(ds.columns.to_list().index(column))
                # Put half of the spaces on the left and half on the right with mild changes depending on number being single or double digit
                columns += " "*math.ceil(((len(column)-len(list(colNum))+1)/2)) + \
                    colNum + " " * \
                    math.floor(((len(column)-len(list(colNum))+1)/2)) + " |"
            elif i == 3:
                # Column names with space either side
                columns += " " + column + " |"
            else:
                # Borders of the table
                columns += "-"*(len(column)+2)+"+"

        # next to column name is the "|" not "+" as the "+" represents a junction
        if i not in [1, 3]:
            columns += "\n|"
        else:
            columns += "\n+"
except Exception as e:
    # I want to know of any errors
    print(e)

# Print columns and indexes
print(columns)

# Ask X and Y columns and Hue
print("\n X:")
col1 = input("> ")
print("\n Y:")
col2 = input("> ")
print("\n Hue (Leave blank for None):")
hue = input("> ")

# Grab column names for Seaborn use
[x, y, hue] = get_column_name(col1, col2, hue if hue else None)

# If type is date, else only use month and year
if "date" in hue.lower():
    ds[hue] = format_dates(ds[hue])

# Clear the terminal
system("cls")

# Create the plot and save it
scatter = sb.scatterplot(x=x, y=y, hue=hue, data=ds)
scatter.set(ylim=(ds[y].min(), ds[y].max()), xlim=(ds[x].min(), ds[x].max()))
plt.legend(loc="upper right")
plt.savefig("%s-%s_%s" % (x, y, hue))
plt.show()
```

From this, I was able to get a visualisation of the data, but also wasn't able to compare some un-formatted data, which I will need to add in later. The program also takes a while to graph as it has over 1 million data points and I haven't yet implemented mapreduce or a random sampling technique.

I will continue with looking into the data and fixing my code to allow me to get a better view on the data with different perspectives, as at the moment I have geolocations and their dates or intensities as can be seen here:

![geolocation vs date of bushfires](/pictures/longitude-latitude_acq_date.png)

I will also look into different comparisons between data and look into different factors that could have affected the data.