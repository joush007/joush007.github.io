---
title: "Creating W.I.N.S.T.O.N. Week 3 | Methods of Data Visualisation"
date: 2023-05-22
topics: ["Data Science", "WINSTON"]
series: ["WINSTON"]
series_order: 7
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

I've realised the difference in complexity in both the Web Dev and Data Science tasks over the past week, as I've had a bit of a mess around with bpy, and I've realised that it's pretty simple to get the hang of mesh creation, but I am definitely not done, as I still need to texture the mesh with ASCII characters, which is one of the things I was thinking about last week.

I've also been at a bit of a slow point here as well, as I need to wait for Morgan to get his implementation of CV done and giving me data before I can get a decent idea of how it will actually look for the visualisation. This is fine though as I can still look into how to use the bpy library to do what I need to do with the mesh and how I'd be able to render it (I'd assume the constant render would be screen recorded and transmitted to the website on the same device, but this isn't set in stone).

The main things I looked at this week were to do with Web Dev and the implementation of the database which is quite crucial to the Web Dev assignment, but also I had to think about the implementation of a larger mesh in bpy and my thoughts were as follows:

With implementation of a larger mesh in blender and creating faces, I would first create the outside vertices of the mesh, that being the corners. From there I would go a level deeper with a subdivision or loop cut and then move the newly created vertices to their respective positions as defined by the CV data. Keep in mind that this would only create the vertices defined by the CV. It's a simple approach to the problem, but I believe it's possible and is a solution I am eager to try and will be trying next week with dummy data, probably with a 2D array of random numbers.

I'm sorry that I don't have much to share this week, but I will get on with the implementation of the mesh next week and have something to show for it.

As usual, I'll keep you posted each week.

|To Do                                                     |Done|
|----------------------------------------------------------|----|
|Explore how Python interacts with Blender                 | x  |
|Create Mesh with Python in Blender                        | x  |
|Explore data output of CV                                 |    |
|Create mesh with output of CV                             |    |
|Make mesh with ASCII characters                           |    |
|Explore how to constantly render mesh                     | x  |
|Constantly render mesh                                    |    |
|Test mesh creation and render with large mesh             |    |
|Any other ideas will be added to the table if this changes|    |