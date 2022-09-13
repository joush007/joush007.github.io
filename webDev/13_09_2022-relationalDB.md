# Relational Databases
## Web Dev
### 13/09/2022

Relational databases are ways of designing databases that alow different parts of the database to work cohesively with one another. This allows for easy access of data points that are all related across different data sets. Last week we looked over how to design a relational database and the ideas behind them that make them so useful.

With relational databases, you're able to access organised data across tables that all link to each other and provide easy connections to different bits of data whilst minimising duplication of data. The relations between different tables in databases are to do with the primary and foreign keys, where the primary keys are to ensure that each entry is unique so that they can be accessed easily, while a foreign is a column or group of columns that enable a link between two tables, referring to the field that is a primary key of another table.

On top of that, the relationship between different tables is taken into acount through the cardinality (the number of elements in a set or other grouping) of the relationships. There are 4 types of cardinality in the database relationships, those are one-to-one (1:1), one-to-many (1:N), many-to-one (M:1) and many-to-many (M:N). There is an issue though, M:N relationships aren't actually possible in databases and so another table is needed in the middle for a 1:N and M:1 on each side.

Within each of these tables there are different attributes that hold the data specified, having TEXT, NUMBERS and OTHER as follows:

* Text:
    * CHAR(length) - Fills up to the length amount with characters, if unspecified, it will be filled with spaces
    * VARCHAR(length) - Takes up only as much space as needed with a maximum length specified
    * TEXT - Can contain text, any amount even up to gigabytes

* Numbers:
    * INT - Positive or negative whole number
    * FLOAT, DOUBLE - Floating point numbers, double allowing for longer decimals

* Other:
    * BLOB - Binary data such as files
    * INET - IP Addresses

There is definetely more I can talk about and I could go further in depth, but due to the fact that this is already late, I will leave it at that. I will continue next week to go into SQL and hopefully catch up on the work that I need to be doing so that I am not too far behind by the next assessment and will be able to have the skills needed to do the tasks that have been assigned without too much struggle. As stated, I did fall behind a little bit in last week as I was feeling quite demotivated a few days which made it difficult to get into a groove and continue on with the work, but I should be able to bounce back this week and get it all done.