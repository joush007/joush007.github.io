---
title: "Linear Regression"
date: 2023-03-27
tags: ["Data Science", "Machine Learning", "Algorithms", "Python"]
--- 

## Linear Regression - What is it?
Linear regression is probably one of the most basic versions of a machine learning algorithm you'll find, with most other machine learning algorithms being built off of the ideas of the algorithm. It uses a linear function to predict the value of a variable based on the value of the data provided by, in essence, creating a line of best fit between the pata points to minimise a *cost* to the algorithm, which is how far off the line of best fit is from being, well, a line of best fit for all of the data, which will be looked at in a bit more detail later on.

## How does it work?
Linear regression works by taking a set of data points and finding the line of best fit for the data, which is the line that minimises the cost function. The cost function is the sum of the squares of the differences between the predicted value and the actual value for each data point (where the predicted value is the value that the line passes through for the given data point). The way the line is calculated is by minimising this cost function by adapting the equation of the line to get a better line of best with each data point added, yet due to the linear nature of the algorithm, it is limited in its prediction of data and will not always give the best output for the data provided, which is where people tend to use other algorithms to improve the accuracy of the predictions such as polynomial regression.

## Mathematical Representation
Linear regression uses the equation of a line to predict the value of a variable. This is represented by the equation `y = mx+b`, or in linear regression, it is referred to by `h = Θ0 + Θ1x`, where `h` is the hypothesis, or, predicted value, `Θ0` is the y-intercept, `Θ1` is the slope of the line. The cost function determines how far the prediction is from the original dependent variable, thus, with each iteration and reevaluation of the data, this cost should continue to decrease as it gets to a line of best fit, this can be calculated using the formula:

j(Θ0, Θ1) = 1/2m * Σ(h(i) - y(i))^2

where `j` is the cost function, `m` is the number of data points, `h(x)` is the hypothesis, and `y` is the value of the data point.

Finally, a gradient descent algorithm is used to find a local minimum in the cost function, using a partial derivative to find what the lowest value of the cost function will be for the given data points. This is represented by the formula:


`Θ0 = Θ0 - α * d/dΘ0 * J * Θ0`

&

`Θ1 = Θ1 - α * d/dΘ1 * J * Θ1`

which, after the partial derivative becomes:

`Θ0 = Θ0 - α * 1/m * Σ(h(i) - y(i))`

&

`Θ1 = Θ1 - α * 1/m * Σ(h(i) - y(i)) * X`

where `α` is the learning rate and the other variables were defined above.

## Code implementation 
The full code implementation is as follows, but I will break it down to get a better understanding of what is going on.

```py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('ex1data1.txt', header = None)
print(df.head())

theta = [0, 0]

def hypothesis(theta, X):
    return theta[0]+theta[1]*X

def cost_calc(theta, X, y):
    return (1/2*m) * np.sum((hypothesis(theta, X)-y)**2)


m = len(df)
def gradient_descent(theta, X, y, epoch, alpha):
    
    cost = []
    i = 0
    
    while i < epoch:
        hx = hypothesis(theta, X)
        theta[0] -= alpha * (sum(hx-y)/m)
        theta[1] -= (alpha * np.sum((hx-y)*X))/m
        cost.append(cost_calc(theta, X, y))
        i+=1
    
    return theta, cost

def predict(theta, X, y, epoch, alpha):
    theta, cost = gradient_descent(theta, X, y, epoch, alpha)
    return hypothesis(theta, X), cost, theta

y_predict, cost, theta = predict(theta, df[0],df[1], 2000, 0.01)

plt.figure()
plt.scatter(df[0], df[1], label="Original Y")
plt.scatter(df[0], y_predict, label="Predicted Y")
plt.legend(loc="upper left")
plt.xlabel("input feature")
plt.ylabel("original and predicted output")
plt.savefig('Linear Regression')
plt.show()

plt.figure()
plt.scatter(range(0, len(cost)), cost)
plt.savefig('Linear Regression Costs x Iterations')
plt.show()
```

The first thing that is done is bringing files and data such as the data set which includes this data, containing a bunch of points on a graph to which we will use the linear regression on:
```txt
6.1101,17.592
5.5277,9.1302
8.5186,13.662
7.0032,11.854
5.8598,6.8233
8.3829,11.886
7.4764,4.3483
8.5781,12
6.4862,6.5987
5.0546,3.8166
5.7107,3.2522
14.164,15.505
5.734,3.1551
8.4084,7.2258
5.6407,0.71618
5.3794,3.5129
6.3654,5.3048
5.1301,0.56077
6.4296,3.6518
7.0708,5.3893
6.1891,3.1386
20.27,21.767
5.4901,4.263
6.3261,5.1875
5.5649,3.0825
18.945,22.638
12.828,13.501
10.957,7.0467
13.176,14.692
22.203,24.147
5.2524,-1.22
6.5894,5.9966
9.2482,12.134
5.8918,1.8495
8.2111,6.5426
7.9334,4.5623
8.0959,4.1164
5.6063,3.3928
12.836,10.117
6.3534,5.4974
5.4069,0.55657
6.8825,3.9115
11.708,5.3854
5.7737,2.4406
7.8247,6.7318
7.0931,1.0463
5.0702,5.1337
5.8014,1.844
11.7,8.0043
5.5416,1.0179
7.5402,6.7504
5.3077,1.8396
7.4239,4.2885
7.6031,4.9981
6.3328,1.4233
6.3589,-1.4211
6.2742,2.4756
5.6397,4.6042
9.3102,3.9624
9.4536,5.4141
8.8254,5.1694
5.1793,-0.74279
21.279,17.929
14.908,12.054
18.959,17.054
7.2182,4.8852
8.2951,5.7442
10.236,7.7754
5.4994,1.0173
20.341,20.992
10.136,6.6799
7.3345,4.0259
6.0062,1.2784
7.2259,3.3411
5.0269,-2.6807
6.5479,0.29678
7.5386,3.8845
5.0365,5.7014
10.274,6.7526
5.1077,2.0576
5.7292,0.47953
5.1884,0.20421
6.3557,0.67861
9.7687,7.5435
6.5159,5.3436
8.5172,4.2415
9.1802,6.7981
6.002,0.92695
5.5204,0.152
5.0594,2.8214
5.7077,1.8451
7.6366,4.2959
5.8707,7.2029
5.3054,1.9869
8.2934,0.14454
13.394,9.0551
5.4369,0.61705
```

Next, we the hypothesis and cost functions based off of the previous definitions of the two which are now shown by python script:

```py
def hypothesis(theta, X):
    return theta[0]+theta[1]*X

def cost_calc(theta, X, y):
    return (1/2*m) * np.sum((hypothesis(theta, X)-y)**2)
```

The hypothesis, can be seen in cost_calc where the variable `h` was in the mathematical definition of the cost function but is now able to acutally be referenced by the hypothesis function. The cost function is the same as the mathematical definition of the cost function.

The next step is to define the gradient descent function which is the function that will be used to find the optimal theta values. The function is defined as:

```py
m = len(df) # number of data points
def gradient_descent(theta, X, y, epoch, alpha):
    
    # Initialise cost and iteration variables
    cost = []
    i = 0
    
    # Loop through the number of epochs (iterations)
    while i < epoch:
        hx = hypothesis(theta, X)

        # Update theta values with gradient descent (partial derivatives)
        theta[0] -= alpha * (sum(hx-y)/m)
        theta[1] -= (alpha * np.sum((hx-y)*X))/m

        # Add cost to cost array after calculated
        cost.append(cost_calc(theta, X, y))
        i+=1
    
    return theta, cost
```

Finally we need to predict the values of the data set using the gradient descent function and the hypothesis function. This is done by the predict function which is defined as:

```py
def predict(theta, X, y, epoch, alpha):
    # Run gradient descent to find optimal theta values
    theta, cost = gradient_descent(theta, X, y, epoch, alpha)

    # Predict value
    return hypothesis(theta, X), cost, theta
```

This makes up the script for the most part, the final part is just putting all the pieces together to generate a graph of the data set and the predicted values of the data set.

```py
# Grab predicted values, cost and theta values from prediction with learning rate of 0.01 and 2000 epochs (iterations)
y_predict, cost, theta = predict(theta, df[0],df[1], 2000, 0.01)

# Create a new figure to plot data
plt.figure()
# Plot original data
plt.scatter(df[0], df[1], label="Original Y")
# Plot predicted data (y_predict for y values instead of df[1], the original Y values)
plt.scatter(df[0], y_predict, label="Predicted Y")
plt.legend(loc="upper left")
plt.xlabel("input feature")
plt.ylabel("original and predicted output")
plt.savefig('Linear Regression')
plt.show()

# Create a new figure to plot cost
plt.figure()
# Cost is reevaluated each iteration, therefore we can show the cost change for each iteration
plt.scatter(range(0, len(cost)), cost)
plt.savefig('Linear Regression Costs x Iterations')
plt.show()
```

This outputs:

![Linear Regression](./Linear%20Regression.png)
![Linear Regression Costs x Iterations](./Linear%20Regression%20Costs%20x%20Iterations.png)

This shows a massve improvement over the previous linear regression model. The predicted values are much closer to the original values and the cost function is much lower than each previous iteration.

## Conclusion
This has been another simple but useful step into the world of machine learning, teaching the basics of how machine learning can work, and introduces information that I can understand for looking into the next steps into machine learning which will get more complex.

I spent a bit of time working through this to get a better understanding of just how to use linear regression in the context of python as well as to get an introduction into linear regression so I can get a hold on the fundamental information for machine learning that other models are built on. In the coming weeks I will be looking more in-depth at a specific machine learning model and how it works, as well as how it can be implemented in python, such as Neural Networks or Genetic Algorithms.