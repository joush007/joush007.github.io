-- Run a query to get all the data back out from the table so we can check –- if it is correct.
SELECT * FROM Teachers;

SELECT * FROM Classes c
JOIN Student_Classes sc ON sc.CID = c.ID
ORDER BY CID ASC;

SELECT * FROM Students s
JOIN Student_Classes sc ON sc.SID = s.ID
ORDER BY SID ASC;

SELECT s.FirstName AS 'Student Name', s.LastName AS 'Student Surname', c.Name AS 'Subject', t.FirstName AS 'Teacher Name', t.LastName AS 'Teacher Surname'
FROM Students s
JOIN Student_Classes sc ON sc.SID = s.ID
JOIN Classes c ON c.ID = sc.CID
JOIN Teachers t on t.ID = c.Teacher
ORDER BY c.ID ASC;