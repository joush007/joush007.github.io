# Completing the Assignment
## Data Science
### 06/06/2022

Over the last week I got a lot done in my assignment, getting the codebase of the assignment done all in one day because I just got into a groove. This was great as for quite a while I hadn't gotten much done on the assignment and realised this in my blog post last week, saying that I needed to work on getting more done on the assignment and splitting my work better between data science and web dev.

This week I developed the codebase for the assignment and started on the discussion, writing all the helper functions I needed and being able to get a decent looking graph that would allow me to get analysis done. This took me a decent chunk of time but in the end it was well worth it, being able to look through the set of data and looking at useful ways of graphing it. From there I had to look at cleaning it and getting into the right format to work with Seaborn and Numpy so that it could be graphed effectively. The  helper functions for the code were these:

```py
def formatDates(df: pd.DataFrame) -> pd.DataFrame:
    """
    Format the date in the date column
    to be formatted as YYYY instead of MM-YY

    Parameters:
        df: pd.DataFrame

    Returns:
        df: pd.DataFrame
    """
    dates = []
    for row in df["Date"]:
        _, year = row.split("-")
        # If year is greater than 50, it is assumed to be 1951-1999, otherwise it is assumed to be 2000-2050
        year = '19' + year if year > '50' else '20' + year
        dates.append(str(np.datetime64(year)))
    df["Date"] = dates
    return df


def calculateAverages(df: pd.DataFrame, excluded: list = list()) -> pd.DataFrame:
    """
    Calculate the average of the costs in the row

    Parameters:
        row: pd.DataFrame
        excluded: list - list of columns to exclude from calculation

    Returns:
        average: pd.DataFrame
    """

    averages = []
    for i in range(len(df[df.columns[0]])):
        # For length of values in columns
        columns = []
        for column in df.columns[::]:
            if not (column in excluded):
                # Get mean of all columns except the Date column
                columns.append(df[column][i])
        average = np.round(np.mean(np.nan_to_num(columns)), 2)
        averages.append(average)

    averages = np.nan_to_num(
        np.array(averages)) if np.nan in averages else np.array(averages)
    return pd.DataFrame({"average": averages})


def indexToPercent(df: pd.DataFrame, column: str) -> pd.DataFrame:
    """
    Convert the index number to a percentage

    Parameters:
        df: pd.DataFrame
        column: str - column to convert

    Returns:
        df: pd.DataFrame
    """
    # pretty much just take away 100 to get the increase
    values = df[column].values.copy()
    for i in range(len(df[column].values)):
        df.loc[i, column] -= values[i-4] if i > 3 else 100

    return df


def deleteUncommonDates(df1: pd.DataFrame, df2: pd.DataFrame, column: str) -> pd.DataFrame:
    """
    Delete the row with uncommon dates from the dataframe

    Parameters:
        df1: pd.DataFrame
        df2: pd.DataFrame - dataframe to compare to
        column: str - column to delete

    Returns:
        df: pd.DataFrame
    """

    # Check if dates in df1 are in df2
    values = df1[column].values
    for i in range(len(values)):
        if values[i] not in df2[column].values:
            df1.drop(i, axis=0, inplace=True)
    df1.reset_index(drop=True, inplace=True)

    return df1
```

and the output looked like this:

![0606Figure1](/pictures/0606Figure1.png)

With all of this I was able to get into the analysis part, and you can see that there's a big spike at the end of the graph from 2019 onwards, which I suspect was from the property price cycle, where the rate of price increase will change in a specific cycle. This was something that I was able to have a look into but was not able to fully confirm or deny it. This is something I am continually looking into up until the assignment is handed in.

Although I haven't fully completed the assignment by this point, it will definitely be in by the end of the day, and hopefully without a 5% penalty.

My goal going forward is to just get things started early, as whenever I leave things until the last minute I am too stressed and normally don't have a good enough assignment for a good mark. This has been seen time and time again when I have done the exact same thing, and I reckon that I am starting to realise the importance of getting it started early. The time I've had hasn't been used to the best that I could have used it, but I have been happy that I have been able to go to classmates about ideas in different pieces of code or elsewhere. Thus this will be my last goal for the semester and will be the goal I go into next semester with: Get it started early.