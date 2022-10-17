# SQL Databases
## Web Dev
### 17/10/2022

Over the past week, I had a look into further understanding SQL syntax and concepts using the Grok course provided and a small tutorial of creating a database through sql to get the main gist of using SQL statements and databases. I spent a majority of the time running through the grok course where I got a basic understanding of using the `SELECT`, `FROM`, `WHERE` and `ORDER BY` statements. In the tutorial, I was able to also get an understanding of using statements such as `DROP TABLE IF EXISTS`, `CREATE TABLE` and `INSERT INTO [TABLE_NAME] VALUES` as well as setting up primary and foreign keys.

Lets start from the beginning. I started off the week on Grok looking back through the basic syntax of SQL and how to make queries. The syntax looks a bit like this:
* `SELECT [COLUMN|*] FROM [TABLE] WHERE [COLUMN] [=|>|>=|<|<=|!=] [VALUE] ORDER BY [COLUMN] [ASC|DESC]` - Where the query is only through one table
* `SELECT [COLUMN|*] FROM [TABLE] JOIN [OTHER_TABLE] ON [OTHER_TABLE.ID] = [TABLE.ID] WHERE [COLUMN] [=|>|>=|<|<=|!=] [VALUE] ORDER BY [COLUMN] [ASC|DESC]` - Where the query is between multiple tables (It doesn't have to be the ID's but can be any Primary Key column where they match up)

That's a lot to work with, so let's break it down with each key word:
* `SELECT [COLUMN|*]` - Select a specific (or every) column from a specified table
* `FROM [TABLE]` - Specify the table/s that the column/s are coming from
* `WHERE [COLUMN] [=|>|>=|<|<=|!=] [VALUE]` - Only select the entries where the specific column meets a specific condition
* `ORDER BY [COLUMN] [ASC|DESC]` - Order the outputted table by a column either ascending or descending
* `JOIN [OTHER_TABLE] ON [OTHER_TABLE.ID] = [TABLE.ID]` - Join two tables together on a specific column that will match up. The two tables will be joined where the IDs are the same - Frequently used with association tables as well, where MANY to MANY relationships cannot be used

This allows for a lot of different queries to be made on a database to get the information that you want. I used this information to create some queries for the database I had to create in the short tutorial.

The short tutorial ran through creating tables and adding values into it. The tutorial went through using `DROP TABLE IF EXISTS`, `CREATE TABLE` and `INSERT INTO [TABLE] VALUES` so that I could make a database for the queries. To show how I created the table, it looked something along these lines:
```sql
-- Delete and Classes
DROP TABLE IF EXISTS Classes;
-- Create Classes
CREATE TABLE Classes 
(   ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Teacher INTEGER,
        FOREIGN KEY (Teacher) REFERENCES Teachers(ID)
);

-- Add data into classes
INSERT INTO Classes VALUES (null, 'Math', 2);
INSERT INTO Classes VALUES (null, 'English', 4);
INSERT INTO Classes VALUES (null, 'Science', 3);
```

After running it, the db file was created with the Classes table and had the ID as it's primary key to be referenced from other tables, and the Teacher which had a foreign key to get the Teacher data from the Teacher table.

This week I got a lot done, with running through the GROK course, to running through the short tutorial to create a database, I learnt a lot on how to use databases correctly. I used the time effectively, as I got all the work done and got a bit of a start on my assignment with ideating, but also got into a few conversations with people which didn't have me on task all the time, but was probably a good thing as it can be nice to get my mind off the work at times. I will continue to use these skills in the upcoming weeks on creating a database for my assignment to the best of my ability.

The SQL Files for this can be found at [school.sql](./learning/SQL/school.sql) and [school_queries.sql](./learning/SQL/school_queries.sql)