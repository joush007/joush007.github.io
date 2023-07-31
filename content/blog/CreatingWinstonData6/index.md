---
title: "Creating W.I.N.S.T.O.N. Week 6 | Live Data Feed"
date: 2023-07-31
topics: ["Data Science", "WINSTON"]
series: ["WINSTON"]
series_order: 13
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

## Introduction
I've stated previously that I need to create a live data feed to display the data from WINSTON. Although we haven't yet created the method that will allow data to be taken from WINSTON's cameras, I have looked into the ways of displaying *some* data. The method of doing this was simple and will be talked about in this blog post along with the method of displaying the blender render on a webpage.

## Rendering the Image to be Displayed
The first step to displaying the image sequence is to render the image through Blender (as discussed in a previous post). To do this, I created a Python script using the Blender Python API (bpy) that will consistently render an image using the Workbench rendering engine. Workbench is being used as it is the fastest rendering engine in Blender and will allow us to render the most frames in the shortest time. The script to do this is as follows:

```python
import bpy
import time

# Write a readable file to show that the script is running
with open("D:/img_running.txt", "w") as f:
    f.write("1")

# Render 500 frames at ~ 20fps
for i in range(500):
    time.sleep(0.05)

    # Render to a JPEG file using 2 threads to 'D:/img.jpg'
    bpy.context.scene.render.image_settings.file_format='JPEG'
    bpy.context.scene.render.threads=2
    bpy.context.scene.render.filepath = 'D:/img.jpg'

    # Set the render engine to Workbench with a resolution of 480x270
    bpy.context.scene.render.engine = 'BLENDER_WORKBENCH'
    bpy.context.scene.render.resolution_x = 480
    bpy.context.scene.render.resolution_y = 270

    # Rotate the object by 0.1 degrees on the Z axis to show a change in the object
    bpy.ops.transform.rotate(value=0.1, orient_axis='Z')

    # Write a readable file to show that the image is in the process of being written
    with open("D:/img_written.txt", "w") as f:
        f.write("0")
    
    # Render the image
    bpy.ops.render.render(use_viewport = True, write_still=True)

    # Write a readable file to show that the image has been written
    with open("D:/img_written.txt", "w") as f:
        f.write("1")

# Write a readable file to show that the script has finished running
with open("D:/img_running.txt", "w") as f:
    f.write("0")
```

Breaking it down may explain it a little bit better.

For the breakdown, I will be talking about the code inside the for loop, as the rest is setting up other files and preventing other issues, but that's not important for what I'm explaining now.

The first part of the script sets any context needed for the render. That being the file format as a JPEG, the number of threads to render on (2) and the file path to render to ('img.jpg' on an external drive). The reason I've used an external drive for this is that there will be many read/write operations occurring on whichever drive I use, and I don't want to wear out my SSD.

```python
bpy.context.scene.render.image_settings.file_format='JPEG'
bpy.context.scene.render.threads=2
bpy.context.scene.render.filepath = 'D:/img.jpg'
```

After that, we can set up the way that the image will be rendered. For my case, I am using the Workbench renderer as it has the fastest render time, with a resolution of 480x270. This should significantly reduce the render time so that I can pump out more frames for a higher FPS.

```python
bpy.context.scene.render.engine = 'BLENDER_WORKBENCH'
bpy.context.scene.render.resolution_x = 480
bpy.context.scene.render.resolution_y = 270
```

Finally, I can render the scene using the active camera. This is done with the built-in render function in bpy. It will render the image with the settings defined earlier (as each of these are saved in the scene) and save to the file path we have defined.

```python
bpy.ops.render.render(use_viewport = True, write_still=True)
```

## Displaying the Image on a webpage
Now we've got an image to render, so it's possible to get something displayed on the webpage. While this script is running, it will consistently render out an image to the 'D:' drive, which we can then read with the Flask Server. The Flask Server will then send the image to the webpage, which will display it.

### Flask Server
Flask has an inbuilt function to send large amounts of data to the webpage if you use a chunking method. That being if you can cut a dataset into smaller chunks and put that into an iterable object, Flask will send each chunk to the webpage. This should speed up the process of sending the image to the webpage as it will be sent in smaller chunks, rather than one large chunk. We can use this to start a datastream and then send the image to the page. Using the following code, we can then edit the frame being displayed on the page to the most recent one to be saved. Using yield will allow us to continue from where we left off, meaning that it will stay in the while loop until it is broken out of.

```python
def gen():
'''
Generator funtion to send the image to the webpage
'''
    while True:
        # Limit to 0.02 seconds to prevent consistently attempting to read data
        time.sleep(0.02)
        # Check if the image has been written to a file
        if open('D:/img_written.txt', 'r').read() == "1":
            # Open the image as binary and send it to the webpage as a new frame to overwrite the existing one
            img = open('D:/img.jpg', 'rb').read()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

        # If the image hasn't been written to a file, send a blank frame (Will not overwrite)
        else:
            yield (b'--frame\r\n')
```

This function will be called by the Flask Server when the webpage is loaded through a GET request (`<img src="{{ url_for(video_stream) }}">`). This will then start the datastream to the webpage. The webpage will then display the image as a "video", displaying the sequence of images.

# Conclusion
There are many ways to deal with sending live data to a website, especially from a render. To counter this problem, I am going to be looking into a smarter way of sending data instead of having to read/write the image every time (especially with so many reads). Instead a way of writing it once and reading it in once may be a better solution. To do this I would be looking into setting up a connection to the server through the script so that the file would be written once, and then read in once so that it can be saved to a variable and sent when asked by the Flask Server. This method may be more effective than what we have now, but there will have to be further inquiry to understand its effectiveness.

### Final Words
The last few weeks have been quite productive, and although I am not talking about much that I've done, this was one of the important things that I definitely needed to talk about. I understand that I have started a new project in the Data Science course, but I had the urge to share the method of handling the previous project to get a real-time render in blender onto a webpage as a "video". I was quite happy with the outcome and will attempt to start on the newly defined project of object recognition, but with the amount that I have to do in Web Dev, I might not have as much time as I'd like for it.