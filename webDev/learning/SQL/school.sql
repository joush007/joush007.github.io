-- Destroy the Teachers table if it exists (this is just so we can cleanly -- rerun this file if we want to reset everything)
DROP TABLE IF EXISTS Teachers;
-- Create the teachers table
CREATE TABLE Teachers
(   ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT,
    LastName TEXT
);
-- Add data to the teachers table
INSERT INTO Teachers VALUES(null, 'Bob', 'Jenkins');
INSERT INTO Teachers VALUES(null, 'Fred', 'Rails');
INSERT INTO Teachers VALUES(null, 'Liam', 'O''neil');
INSERT INTO Teachers VALUES(null, 'Geoffry', 'Simons');
INSERT INTO Teachers VALUES(null, 'George', 'Georgeson');

-- Delete and re-create Classes
DROP TABLE IF EXISTS Classes;
CREATE TABLE Classes 
(   ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Teacher INTEGER,
        FOREIGN KEY (Teacher) REFERENCES Teachers(ID)
);

-- Add data
INSERT INTO Classes VALUES (null, 'Math', 2);
INSERT INTO Classes VALUES (null, 'English', 4);
INSERT INTO Classes VALUES (null, 'Science', 3);

DROP TABLE IF EXISTS Students;
CREATE TABLE Students
(   ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT,
    LastName TEXT
);

INSERT INTO Students VALUES (null, 'John', 'Smith');
INSERT INTO Students VALUES (null, 'Mary', 'Smith');
INSERT INTO Students VALUES (null, 'Bob', 'Smith');

DROP TABLE IF EXISTS Student_Classes;
CREATE TABLE Student_Classes
(   SID INTEGER REFERENCES Students (ID),
    CID INTEGER REFERENCES Classes (ID),
    PRIMARY KEY (SID, CID)
);

INSERT INTO Student_Classes VALUES (1,1);
INSERT INTO Student_Classes VALUES (2,2);
INSERT INTO Student_Classes VALUES (3,1);
-- Run a query to get all the data back out from the table so we can check –- if it is correct.
SELECT * FROM Teachers;
SELECT * FROM Classes;
SELECT * FROM Students;
