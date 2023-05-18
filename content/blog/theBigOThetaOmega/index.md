---
title: The Big O, Θ & Ω
date: 2023-02-20
topics: ["Data Science", "Algorithms", "Big O"]
---

So, last week we covered the Big O and how to calculate the Big O as well as it's uses. This week we're going to look at the Big Ω and Big Θ as well as it was meant to be covered but I had accidentally moved past the two and went to the work from the next week, so I looked at it this week.

## The Big O Recap
The Big O is a way of calculating the upper bound for the runtime of an algorithm. It measures the efficiency of an algorithm in it's worst case scenario and is used as a way of comparing algorithms to each other. A definition of the Big O from a function (f(n)) is:

> f(n) = O(g(n)) if there exists c > 0, n<sub>0</sub> ≥ 0 such that f(n) ≤ c * g(n) for all n ≥ n<sub>0</sub>

This is just the formula, to say that anywhere after a specific value of n, or x, the function f(n), which is the algorithm's real runtime, will be less than or equal to the function g(n) multiplied by a constant c (which will produce the Big O value). This will be the upper bound for the runtime of the algorithm.

## The Big Ω
The Big Ω is the opposite of the Big O, it's the lower bound for the runtime of an algorithm. It's measures the efficiency of an algorithm in it's best case scenario and is also used as a way of comparing algorithms to each other. A definition of the Big Ω from a function (f(n)) is:

> f(n) = Ω(g(n)) if there exists c > 0, n<sub>0</sub> ≥ 0 such that f(n) ≥ c * g(n) for all n ≥ n<sub>0</sub>

Which if you spotted it, is just saying the same as the Big O, but instead of being less than or equal to, it's greater than or equal to, thus this will always produce a value less than or equal to the real runtime, indicating the best case scenario. This will be the lower bound for the runtime of the algorithm.

## The Big Θ
The Big Θ is the combination of the Big O and Big Ω, it's the exact bound for the runtime of an algorithm. It measures the efficiency of an algorithm in it's average case scenario and is also used as a way of comparing algorithms to each other. A definition of the Big Θ from a function (f(n)) is:

> f(n) = Θ(g(n)) if there exists c<sub>1</sub> > 0, c<sub>2</sub> > 0, n<sub>0</sub> ≥ 0 such that f(n) ≤ c<sub>1</sub> * g(n) for all n ≥ n<sub>0</sub> and f(n) ≥ c<sub>2</sub> * g(n) for all n ≥ n<sub>0</sub>

Which is just saying that the function f(n) will be less than or equal to the function g(n) multiplied by a constant c<sub>1</sub> (Big O/Upper Bound) and greater than or equal to the function g(n) multiplied by a constant c<sub>2</sub> (Big Ω/Lower Bound). This will be the upper and lower constraints of the algorithm's runtime.

## Reflection
The last week was very math heavy, looking back over the Big O, Ω & Θ and realising the actual mathematical formulae behind them, it's very interesting to see how they work and how they're used but it also encourages you to check the running time of different algorithms to get a good idea of which are best to use for different situations.