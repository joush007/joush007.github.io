---
title: "Winston Wk 1 | Blender Python Library & issues with Conda"
date: 2023-05-08
topics: ["Data Science", "WINSTON"]
series: ["WINSTON"]
series_order: 3
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Blender Python Library
Last week I figured out that I needed to use blender to create a scene that could be meshed and rendered (or attempted to). To do this I had a look around and found the bpy library made by blender for python integration. This was great to find and I got to installing it, but then I found an issue; it was only supported on python 3.7, therefore I'd need to either install 3.7 alongside 3.11 that I have now, or use a tool such as conda to create a virtual environment with python 3.7. I decided to use conda, because ultimately it would create less hastle, but this was starting to become painful in itself. My plan was that I'd be able to install bpy, then start messing around with it and get familiar with how it works, but instead I was met with the error on the compatibility of bpy with 3.7. On downloading and installing conda (I used miniconda, because it was lightweight which may have caused the issue), it wasn't being recognised in the command prompt, and where's the point in using something like conda if it won't be usable? So I have take to installing the full anaconda.

As of the time I'm righting this, I haven't actually tested that Anaconda is working at the moment, but I will be investigating it this week. One of the main issues I've had last week, and I'm sorry, is time. I've had 4 things due in the past 2 weeks, those being, a history draft and essay, an english creative and a maths assignment, but those are done now and it will allow me to focus on I.T. more in and out of the classroom. This means that I will have a decent bit more to write about next week, and hopefully I'll have some more progress to show.

Anyway, before the end of the week, I did have a look at the bpy documentation so that I can get a better understanding of how to interact with blender through python, and I've come to realise that it is a very object oriented approach, but it also seems quite a bit more complicated in the way to access different vertices and points on the model. I will have to continue diving down this rabbit hole in the coming weeks, and then after all of that figuring out how I'm going to texture the walls with ASCII characters based off of distance from the camera.

This has been a pretty uneventful week, but the next one shall be better, and so, as usual I'll keep you updated with how everything's going and make sure that there will be more information covering the week's progress.

|To Do|Done|
|-|-|
|Explore how Python interacts with Blender| |
|Create Mesh with Python in Blender| |
|Explore data output of CV||
|Create mesh with output of CV||
|Make mesh with ASCII characters||
|Constantly render mesh (Sort of)||
|Any other ideas will be added to the table if this changes||