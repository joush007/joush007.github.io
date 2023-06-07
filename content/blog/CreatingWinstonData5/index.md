---
title: "Creating W.I.N.S.T.O.N. Week 5 | The BALL PIVOTING ALGORITHM"
date: 2023-06-07
topics: ["Data Science", "WINSTON"]
series: ["WINSTON"]
series_order: 11
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

[Ball Pivoting Algorithm Implementation](https://github.com/joush007/Ball-Pivoting-Algorithm)

# Overview
I talked a little bit about it last week, and I've finally implemented a basic version of the Ball Pivoting Algorithm. I spent a lot of time working out how to get the algorithm to get the right points and not overlap and everything else, but with the amount of time put in, I was able to get a version of the algorithm implemented.

Simply put, the Ball Pivoting Algorithm is a surface reconstruction algorithm that takes a point cloud and logically connects the vertices with edges and later faces to form surfaces in a mesh.

# The Ball Pivoting Algorithm
The first thing I had to do for the algorithm was setup a base for the class with functions that I would need to create. These included:

- `__init__` - The constructor for the class, which takes in the point cloud and the radius of the ball

- `find_seed_triangle` - This function finds the first triangle in the mesh, which is the first 3 points that are in close enough proximity to each other

- `pivot_ball` - This function pivots the ball around the mesh, and finds the next point to connect to the mesh

- `run` - This function runs the algorithm, and is the only function that needs to be called to run the algorithm

## `__init__`

The constructor takes the parameters for the radius, point cloud, file location and iterations (For testing or only creating `n` faces) for the algorithm to use. It will then set the class variables for use later on. If the file location exists and the point cloud doesn't, it will open the point cloud from the file location. If the iterations are set, it will only run the algorithm for that many iterations, otherwise it will run for the length of the point cloud.

```py
def __init__(self, radius: float, point_cloud: np.ndarray = None, file_location: str = None, iterations: int = None) -> None:
    """
    Initializes the Ball Pivoting Algorithm with the given point cloud and radius.
    :param point_cloud: The point cloud to be interpolated.
    :param radius: The radius of the ball used for pivoting.
    """
    self.point_cloud = point_cloud or np.ndarray([])
    if file_location:
        self.open_point_cloud(file_location)
        self.file_location = file_location
    self.radius = radius
    if iterations:
        self.iterations=iterations
    else:
        self.iterations = len(self.point_cloud)
    return
```

## `find_seed_triangle`

This function finds the first triangle in the mesh, which is the first 3 points that are in close enough proximity to each other. It does this by finding the first point in the point cloud, and then finding the next two points that are in close enough proximity to the first point. It then returns an instance of the Face class, which is a face for the mesh containing 3 points, 3 edges and the index for each point in the point cloud.

```py
def find_seed_triangle(self) -> Face:
    """
    Finds a seed triangle to start the algorithm.
    :return: A seed triangle.
    """

    first_point = self.point_cloud[0]

    # Find second point by distance
    neighbours, distances = first_point.find_neighbouring_vertices_with_distance(self.point_cloud, self.radius)
    second_point = first_point.get_closest_point(neighbours, distances)

    first_edge = Edge(first_point, second_point)
    self.edges.append(first_edge)

    # Find third point through shared neighbour along edge (Cylindrical space)
    third_point = first_edge.find_third_point(self.point_cloud, self.radius, self.faces)
    
    second_edge = Edge(second_point, third_point)
    
    third_edge = Edge(third_point, first_point)

    # Keep track of all edges
    self.edges.append(second_edge) 
    self.edges.append(third_edge)

    # np.where(xxx)[0][0] gets the index of the point in the point cloud for use in saving to file later
    seed_triangle = Face((first_point, second_point, third_point), (first_edge, second_edge, third_edge), (np.where(self.point_cloud == first_point)[0][0], np.where(self.point_cloud == second_point)[0][0], np.where(self.point_cloud == third_point)[0][0]))

    return seed_triangle
```

## `pivot_ball`

As it says, the pivot ball function will start at an edge, whether that's from the seed triangle or another edge that has been found. I will then use that edge to find the nearest point to it that is in the point cloud and create a new face with the edge and the new point. It will then return the new face with the same method as `find_seed_triangle`.

```py
def pivot_ball(self, edge:Edge):
    """
    Pivots the ball around the given edge until it touches another point.
    :param edge: The edge to pivot the ball around.
    :return: The next triangle formed by the ball pivoting around the edge.
    """
    
    # Find third point of triangle
    third_point = edge.find_third_point(self.point_cloud, self.radius, self.faces)

    # Create new edges
    second_edge = Edge(edge.p1, third_point)
    third_edge = Edge(edge.p2, third_point)
    self.edges.append(second_edge)
    self.edges.append(third_edge)

    # Remove any edges that are duplicates
    self.edges = list(set(self.edges))
    
    (np.where(self.point_cloud == edge.p1)[0][0], np.where(self.point_cloud == edge.p2)[0][0], np.where(self.point_cloud == third_point)[0][0])
    # np.where(xxx)[0][0] gets the index of the point in the point cloud for use in saving to file later
    return Face((edge.p1, edge.p2, third_point), (edge, second_edge, third_edge), (np.where(self.point_cloud == edge.p1)[0][0], np.where(self.point_cloud == edge.p2)[0][0], np.where(self.point_cloud == third_point)[0][0]))
```

## `run`

`run` puts everything together. It uses each of the functions above to run through each iteration and create a mesh from the point cloud. It will then save the mesh to a file, and return the mesh for use in other parts of the project.

```py
def run(self):
    """
    Runs the Ball Pivoting Algorithm to compute a triangle mesh interpolating the point cloud.
    :return: A triangle mesh interpolating the point cloud.
    """
    seed_triangle = self.find_seed_triangle()
    self.faces.append(seed_triangle)
    edge = seed_triangle.get_new_edge()
    for i in range(self.iterations): # Only run x iterations if you only want x faces (If it's a large point cloud, creating the entire mesh will take a while)
        
        face = self.pivot_ball(edge)
        self.faces.append(face)
        
        edge = face.get_new_edge() # Get the next edge to pivot around from the new face
        print(f"Point: {i+1}/{self.iterations} ☑️")
        k = 0
        # If you can't find the next edge, check on all other faces to see if there is one available, if not, quit as there are no more faces to add
        while edge == None:
            if k > len(self.faces): self.write_to_file(); quit()
            face = self.faces[k]
            edge = face.get_new_edge()
            k += 1

    self.write_to_file()

    return
```

## Honorable mentions

### `write_to_file`

The write to file takes the point cloud and face data to write to an `obj` file. This is one of the main file types for 3d models and is one that is easily interpreted by Blender, which will be quite useful for the rest of the project. The file format is quite straight forward and, for what I used and can be seen in my files, is as follows:

* `v` - Vertex
* `f` - Face
* `#` - Comment

```py
def write_to_file(self, file_location:str=None) -> None:
    """
    Writes the triangle mesh to an object file.
    :param file_location: The location of the object file.
    """

    if file_location is None:
        file_location = self.file_location
    edited_file_location = file_location.split('.')
    edited_file_location[-2] += '_edited'

    with open(".".join(edited_file_location), 'w') as f:
        f.write(f"# {file_location}\n")

        for point in self.point_cloud:
            f.write(f"v {point.x} {point.y} {point.z}\n")
        
        f.write(f"\n")

        for face in self.faces:
            f.write(f"f {face.p1_index+1} {face.p2_index+1} {face.p3_index+1}\n")
    
    # Create point cloud file
    if file_location is None:
        file_location = self.file_location
    edited_file_location = file_location.split('.')
    edited_file_location[-2] += '_point_cloud'
    with open(".".join(edited_file_location), 'w') as f:
        f.write(f"# {file_location}\n")

        for point in self.point_cloud:
            f.write(f"v {point.x} {point.y} {point.z}\n")
```

The function uses the built in method of opening and writing to files in Python, and is quite simple in that it will write the vertices and faces to the file, and then save it to the file location specified previously with a `_edited` or `_point_cloud` extension before the `.obj`.

### `open_point_cloud`

The open point cloud function is a simple function that will open a point cloud from a specified file location. It reads the file and creates a point cloud from the data. It will then return the point cloud in a numpy array for use in the algorithm. It will filter out any other data besides the vertices so that it can recalculate all of the faces and edges.

```py
def open_point_cloud(self, file_location: str) -> None:
    """
    Opens an object file, filtering out the points in the point cloud
    :param file_location: The location of the object file
    """

    file_list = ['obj']
    if file_location.split('.')[-1] not in file_list:
        raise ValueError(f"Only able to read object data of types {file_list}")

    with open(file_location, 'r') as f:
        # Initialise points to be added to numpy array
        points = []

        for line in f.readlines():
            # There must be text in the line and it must be a vertex
            if not len(line) > 3:
                continue
            # Segments of string
            segments = line.split()

            if segments[0] != 'v': continue

            points.append([
                    float(segments[1]),
                    float(segments[2]),
                    float(segments[3])
                ])

        self.point_cloud = np.array([Point(point) for point in points])

    return
```

# Conclusion
This is only the main file, but if I go in depth into the entire algorithm it will go on forever. This post doesn't have too much text explaining everything, as last weeks post had information on the Ball Point Algorithm to explain what it does, and the code comments explain how the code works. I would encourage you to go to the [github repository](https://github.com/joush007/Ball-Pivoting-Algorithm) for the full implementation of the algorithm, and to read the comments in the code to understand how it works. The rest of the code includes the other classes such as the `Point`, `Edge` and `Face` classes, which are used in the algorithm to create the mesh.

I worked through a lot of maths last week to get this implemented and I believe I even fried my brain once or twice too as some of the math that I believed I would need was quite difficult to even think about implementing. I managed to problem solve and figure out new solutions to these issues, especially in calculating a third point for a face, which I was originally going to look into vectors in a 3d space, but ultimately settled with finding the distance of all points to the edge, taking the ones inside the radius, and then using the cosine rule to calculate the angle from the third point back to the edge. This is important as with how triangles work, the larger the angle, the closer the point is to the edge, as the angles on the first edge will be smaller than the angle to the third point.

It is also crucial to note that the implementation is not the most optimised and is ~O(n^2) in the best case, but this will hopefully be improved in the future or another algorithm might be implemented so that I can create the renders needed for W.I.N.S.T.O.N.

|To Do                                                     |Done|
|----------------------------------------------------------|----|
|Explore how Python interacts with Blender                 | x  |
|Create Mesh with Python in Blender                        | x  |
|Explore data output of CV                                 |    |
|Create mesh with output of CV                             |    |
|Make mesh with ASCII characters                           | x  |
|Explore how to constantly render mesh                     | x  |
|Implement Ball Point Algorithm                            | x  |
|Constantly render mesh                                    |    |
|Test mesh creation and render with large mesh             |    |
|Any other ideas will be added to the table if this changes|    |