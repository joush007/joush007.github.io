---
title: The Big O
date: 2023-02-13
tags: ["Data Science", "Big O", "Algorithms"]
---

## What is the Big O?
Big O notation is a way to describe the performance of an algorithm as the input size increases. It takes into account the upper bound of an algorithms run time, viewing the worst case scenario and is frequently used to compare the performance of different algorithms. The Big O is usually used whilst looking at large amounts of data, as smaller input sizes matter much less when running these algorithms.

## Why is it important?
Big O notation is used to compare run times and performance of different algorithms in worst case scenarios, when using a lot of data, it's useful to know which algorithms to use for doing certain functions

## How can you calculate the Big O for an algorithm?
To calculate the Big O for an algorithm, you need to understand how many operations would be performed for a specific input size, then you can start calculating the amount of operations that would be performed on a larger data set. The calculation from there is simple, first you will need to do the following using some simple maths:

1. Find the highest power of n in the equation
    - If you have an equation, 3n^4 + 500n + 2, the term 3n^4 has n^4, the highest power of n
2. Remove the coefficient from the term
    - From 3n^4 we would get n^4

## Dominant Terms
The remaining term, n^4 is the dominant term of the algorithm as it has the highest power of n. To understand this, we could look at the 3n^4 next to 500n. Although some think that 500n will be larger, they'd be wrong, or at least when n>5, as before that, 500n would be bigger. Due to the fact that n will be in a large subset of data when used, with >500,000 data points, the n^4 will have the greatest effect on the algorithm's run time (the coefficient will provide a small change but not much).

## Calculating the Big O (cont.)
In the following table, you can see that there are two things you have to look at when looking into the run time of algorithms, the input size (on the left) and the number of operations to be performed for those sizes (log(n) onwards), although these input sizes are still quite small you can already start to see a big difference in the run times. Even when the input size is still small, and they seem quite similar, as soon as you start looking into the bigger input sizes, the run times can differ significantly.

<table>
<tr>
<th>Input Size</th>
<th>log(n)</th>
<th>n</th>
<th>n^2</th>
<th>2^n</th>
</tr>
<tr>
<th>2</th>
<th>1</th>
<th>2</th>
<th>4</th>
<th>4</th>
</tr>
<tr>
<th>16</th>
<th>4</th>
<th>16</th>
<th>256</th>
<th>65536</th>
</tr>
<tr>
<th>256</th>
<th>8</th>
<th>256</th>
<th>65536</th>
<th>1.1579*10^77</th>
</tr>
</table>

Therefore when comparing the run times of different algorithms, you need to look into how the run time increases as the input size increases towards infinity, thus we would need to look at the dominating terms, ignoring any lower order terms.

## Merge Sort/Divide & Conquer
Let's say you have a list of numbers to sort in order of their size, and it looks like this:

`[ 7, 20, 5, 4, 8, 13, 100, 11 ]`

To sort this you wouldn't go through and compare each number other number, as for each term you would have to compare it to every other term. e.g. 7 would be compared with 20, 5, 4, 8, 13, 100, 11 taking 7 operations. If you were continuedthis for each term, the total operations would be n*(n-1) or n^2-n giving O(n^2). This is an very inefficient way of sorting a list of numbers, and there are better ways to do this, one of which is the merge sort algorithm:

1. Divide the problem into sub-problems

2. Solve each sub-problem recursively

3. Merge the solutions of each sub problem until the original problem is solved

For example, if you have that same list of numbers to sort you would:

1. Split the list into two halves
    - Recursively split the sub lists into two halves until you have 1 term in each list

2. Sort the sub lists and merge them together recursively

## Merge Sort Example

e.g.
    step 1:

    `[ 7, 20, 5, 4, 8, 13, 100, 11 ]`

    `[ 7, 20, 5, 4 ]` + `[ 8, 13, 100, 11 ]`
    
    `[ 7, 20 ]` + `[ 5, 4 ]` + `[ 8, 13 ]` + `[ 100, 11 ]`
    
    `[ 7 ]` + `[ 20 ]` + `[ 5 ]` + `[ 4 ]` + `[ 8 ]` + `[ 13 ]` + `[ 100 ]` + `[ 11 ]`

    step 2:

    `[ 7 ]` + `[ 20 ]` + `[ 5 ]` + `[ 4 ]` + `[ 8 ]` + `[ 13 ]` + `[ 100 ]` + `[ 11 ]`

    `[ 7, 20 ]` + `[ 4, 5 ]` + `[ 8, 13 ]` + `[ 11, 100 ]`

    `[ 4, 5, 7, 20 ]` + `[ 8, 11, 13, 100 ]`

    `[ 4, 5, 7, 8, 11, 13, 20, 100 ]`


## Merge Sort Algorithm
An algorithm for step 2 could look like:

Take the second merge step for example, you would have your two sorted sub-lists [ 7, 20 ] and [ 4, 5 ], to merge these, name 3 variables, `A`, `B`, and `C`, where `A` and `B` are the sub-lists and `C` is the merged list, which is empty at this point. You would then have `i`, `j`, and `k` as indexes for each list. The merge algorithm would work as follows:

1. Set `i = 0`, `j = 0`, and `k = 0`

2. If `A[i] > B[j]`, set `C[k]` to `A[i]` and increment `i` and `k`, if `B[j] was greater` you would increment `j` and `k` instead

3. Repeat until C is full

(You would do the same on the first merge, but it would be more simple)

## Reflection
As you can see, over the past week I have taken a lot of time to look into the Big O and taken that little bit of extra time to make sure that I have understood it enough to explain it in this post. I have used my time in class efficiently to get this done, but also taken time outside of class to make sure that I have gotten an in-depth understanding of what I have learnt so far, and I will use it in the future to continue understanding more about the Big O and algorithms for when I start to look into ML. Over the next few weeks I will continue to look into the Big O and different algorithms and *maybe* ML. Either way, a blog post will come out each week.