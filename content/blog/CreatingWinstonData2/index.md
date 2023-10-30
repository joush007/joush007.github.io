---
title: "Winston Wk 2 | Blender Python Library, Creating Objects and Meshes"
date: 2023-05-16
tags: ["Data Science", "WINSTON"]
series: ["WINSTON"]
series_order: 5
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Bpy Library and Meshes
The Bpy library is blenders python library that allows you to create custom plugins or scripts to do tasks through blender for you. This is quite good in terms of Winston's render as it will allow for an interpretation of the data that I will be receiving from Morgan through his computer vision, but because he's not created the physical model of the CV I will have to use dummy data to get a working version on my computer.

In previous weeks I have gotten stuck on small things such as the installation of the bpy library and conda, and I hadn't realised at the time that there was an inbuilt python IDE in blender that you could run and test things as well as a console. This was revolutionary, as I realised I didn't in fact need to use Conda for installing Bpy, but instead could create and run the files in blender to make the job easier for myself, and luck for me, I had already installed blender.

A good thing about bpy, is that it's all documented at [docs.blender.org](https://docs.blender.org/api/current/index.html). A bad thing is that the documentation is not beginner friendly and I had a very hard time getting to understand how to actually use the api. Lucky I had YouTube to teach me what the documentation could not. I went on and had a look at the actual way that I could use bpy, and although the tutorial I found didn't cover anything I needed to figure out how to create objects and edit vertices, it did direct me to the templates and to look at those in finding how to implement different features (The tutorial can be found [here](https://www.youtube.com/watch?v=cyt0O7saU4Q&t=604s) if you'd like to see how to use bpy in context of addons and general usage of the library).

# Application of Bpy
To start off with, I needed to get a few things off the to do list, and so I started experimenting with how to use bpy, that being creating new meshes and objects. I started messing around with the bpy.data object to figure out how to create a mesh. I found the `bpy.data.meshes.new(name)` function, which allowed me to create a new blank mesh with a specific name.

I could then edit the mesh with a list of vertices that could be defined as `verts = [(0, 0, 0), (1, 0, 1), (1, 1, 1), (0, 1, 1)]`, or however you'd like to define each vertex, but in a list so as to make it all into 1 mesh.

I could update the vertices on the mesh with `mesh.from_pydata(verts, [], faces)`  which took in the vertices, edges and faces to create the points on the mesh. There are other ways of doing it, but this is the most straight forward

The faces can be defined as a list of connections between each vertex (shown with indexes) `faces = [[0, 2, 1], [0, 3, 2]]`. This creates a link from each vertex to the next with an area between them, creating a face. In this example, it creates a connection between the first vertex defined: (0, 0, 0), the third: (1, 1, 1) and the second: (1, 0, 1) to create a triangle. The way to create the face is done in a counter-clockwise direction so as to make the face point in the correct direction.

In the final steps to creating the object, we must instantiate the mesh into an actual object and then put it into the scene in the relevant collection. This is done by creating a new object with `bpy.data.objects.new(name, data)` where the data is the mesh, and the name is whatever you'd like to call the object. Then we must link the object to the scene with `bpy.context.collection.objects.link(obj)` where the obj is the object we just created.

The full code to create an object like this is as follows:

```python
import bpy

# Define shape
verts = [(0, 0, 0), (1, 0, 1), (1, 1, 1), (0, 1, 1)]

faces = [[0, 2, 1], [0, 3, 2]]

# Create mesh
mesh = bpy.data.meshes.new("Mesh")
mesh.from_pydata(verts, [], faces)

# Create object
obj = bpy.data.objects.new("Object from Mesh", mesh)
bpy.context.collection.objects.link(obj)

bpy.context.view_layer.objects.active = obj
```

and it creates this:

![Blender Object](./blender_object.png)

Now finally, I did manage to get a bit of insight into real-time rendering in blender, and that would be using the Eevee rendering engine in realtime rendering mode to get a decent render of the object that W.I.N.S.T.O.N. is looking at. The only downside to all of this is that I am still waiting to get some actual data from Morgan's CV so that I can start visualising real data and testing accuracies as well as make sure I have a script to format the data so that it's usable in blender.

To be quite honest, the first half of the week was quite slow for data science, as I was still believing that I needed to install bpy on my local device and use it in vscode to get a working script, but once I realised that blender had it all built in, I started exploring what it had to offer and ideating the ways I could use this to progress in my project. Although I'm not at the final product, I believe I have gotten a decent amount of the project done this week, and I'm quite happy with the progress. Now I just need to continue this flow into the coming weeks until the project is due.

As usual, I will continue working on the blender script and testing it all until I get a finalised version of the script that I can use to create the mesh and render it in real time. I will continue updating the blog as I go along, and hopefully there isn't too many more posts before there is a functional version of the script.

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