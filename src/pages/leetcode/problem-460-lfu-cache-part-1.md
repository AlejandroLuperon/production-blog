---
title: LeetCode Problem 460 - LFU Cache, Part 1
date: "2018-11-18"
description: LeetCode question to implement an LFU Cache.
src: problem-460-lfu-cache-part-1.jpg
---
<paragraph>
  <a target="\_blank" href="https://leetcode.com/problems/lfu-cache/">Problem 460 on LeetCode</a> requires the creation of a Least Frequently Used (LFU) cache. An LFU cache is an algorithm that, when it's capacity is reached, removes
  the least frequently used object from memory.
</paragraph>

<paragraph>
  The following operations that the LeetCode problem requires are, as stated in the problem statement:
  <br/>
  <br/>
  <ul>
    <li>
      get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
    </li>
    <li>
      put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity,
      it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency), the least recently used key would be evicted.
    </li>
  </ul>
</paragraph>

<paragraph>
  Before I go into my implementation of each method in the LFUCache, take a look at my final result below.
</paragraph>

```java
class LFUCache {
    HashMap<Integer, LinkedList<Node>> retrievalMap = new HashMap<Integer, LinkedList<Node>>();
    HashMap<Integer, Node> nodeMap = new HashMap<Integer, Node>();
    int capacity;
    int population = 0;

    public LFUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        Node node;
        if (nodeMap.containsKey(key)) {
            node = nodeMap.get(key);
            node.retrievals++;
            retrievalMap.get(node.retrievals-1).remove(node);
            if (!retrievalMap.containsKey(node.retrievals)) {
                retrievalMap.put(node.retrievals, new LinkedList<Node>());
            }
            retrievalMap.get(node.retrievals).addFirst(node);
            return node.val;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (capacity == 0) {
           return;
        }

        if (population == capacity && !nodeMap.containsKey(key)) {
            int i = 0;
            Node nodeToRemove;
            while (true) {
                if (retrievalMap.containsKey(i) && retrievalMap.get(i).size() > 0) {
                    nodeToRemove = retrievalMap.get(i).removeLast();
                    nodeMap.remove(nodeToRemove.key);
                    break;
                } else {
                    i++;
                }
            }
        }

        Node node;

        if (nodeMap.containsKey(key)) {
            node = nodeMap.get(key);
            node.val = value;
            node.retrievals++;
            retrievalMap.get(node.retrievals-1).remove(node);
            if (!retrievalMap.containsKey(node.retrievals)) {
                retrievalMap.put(node.retrievals, new LinkedList<Node>());
            }
            retrievalMap.get(node.retrievals).addFirst(node);
        } else {
            node = new Node(key, value);
            if (!retrievalMap.containsKey(0)) {
                retrievalMap.put(0, new LinkedList<Node>());
            }
            retrievalMap.get(0).addFirst(node);
            nodeMap.put(key, node);
            if (population < capacity) {
                population++;

            }
        }
    }
}
```
<br/>
<br/>

<paragraph>
  A Node class is also used above. With my implementation of the LFUCache, I want to store the key and value properties in an object, so I will create a class that will store these properties. I also want to keep track of the number of times a
  specific key is retrieved, so when a new key is added to the cache, a new Node object will be instantiated. Thus, this Node class will have the following properties:
  <br/>
  <br/>
  <ul>
    <li>key</li>
    <li>val</li>
    <li>retrievals</li>
  </ul>
  <br/>

</paragraph>

```java
class Node {
    public int key;
    public int val;
    public int retrievals = 0;

    public Node(int inKey,  int inVal) {
        key = inKey;
        val = inVal;
    }
}
```
<br/>
<br/>
<paragraph>
  The existence of an object in the LFUCache depends on how many times it is used. If there is a tie in terms of the frequency of objects used, and the capacity of LFUCache is reached, then the least recently used object from the tie of least frequently used objects will be removed from memory. To keep track of the frequency and relevance of an object, I will use a HashMap with the key being an Integer and the value being a LinkedList of Nodes. The key will represent the number of times all of the Nodes in the LinkedList have been seen, and the LinkedList will function as a Queue to keep track of the order in which the objects have been seen.
</paragraph>

```java
HashMap<Integer, LinkedList<Node>> retrievalMap = new HashMap<Integer, LinkedList<Node>>();
```
<br/>
<br/>
<paragraph>
  To check if a key has already been added to the cache, I will also store the key in a HashMap for retrieval:
</paragraph>

```java
HashMap<Integer, Node> nodeMap = new HashMap<Integer, Node>();
```
<br/>
<br/>

<paragraph>
Now using the retrievalMap and nodeMap, we can now implement our get and put methods of the LFUCache. We'll start with the get method.
</paragraph>

```java
public int get(int key) {
    Node node;
    if (nodeMap.containsKey(key)) {
        node = nodeMap.get(key); //get key since key exists
        node.retrievals++; //increment the usages by 1
        retrievalMap.get(node.retrievals-1).remove(node); //remove the current location of the Node in the cache
        if (retrievalMap.containsKey(node.retrievals)) { //make sure that there is a list at targeted key in the retrievalMap
            retrievalMap.get(node.retrievals).addFirst(node); //add to front of queue if list exists
        } else {
            retrievalMap.put(node.retrievals, new LinkedList<Node>(){{add(node);}}); //create a new list if no list exists where any key has been retrieved that number of times and add Node to list
        }
        return node.val; //return the value stored at that key
    }
    return -1;
}
```
<br/>
<br/>

<paragraph>
  The get method will first check the nodeMap to see if the key already exists in the cache. If the key exists in the cache,
  then the use of the key will have increased by 1, and thus we will have to increase the retrievals property of the Node associated with the key
  by 1. It's location in the retrievalMap will change as well, since the LinkedList that the Node should exist in will be in a different key. Finally, since the key exists, we should return the value stored at that key.
</paragraph>

<paragraph>
  If the key does not exist in the cache, then by definition, the get method should return -1.
</paragraph>

<paragraph>
  As for the behavior of the put method, it will depend on the current population and capacity of the cache. To keep track of this, our LFUCache class will have two properties:
  <br/>
  <br/>
  <ul>
    <li>capacity, to represent the maximum number of objects the cache can store</li>
    <li>population, to represent the current number of objects in the cache. The initial population of the cache upon instantiation will be zero.</li>
  </ul>
  <br/>
  <br/>
  While this implementation keeps track of population in a separate property, we don't need to have a separate property for the population of the cache, as could instead check the size of the nodeMap.
</paragraph>

```java
  int capacity;
  int population = 0;
```
<br/>
<br/>
<paragraph>
  Using those properties, our put method looks like this:
</paragraph>

```java
public void put(int key, int value) {
    if (capacity == 0) {
        return;
    }

    if (population == capacity && !itsNodeMap.containsKey(key)) {
        int i = 0;
        Node theNodeToRemove;
        while (true) {
            if (itsRetrievalMap.containsKey(i) && itsRetrievalMap.get(i).size() > 0) {
                theNodeToRemove = itsRetrievalMap.get(i).removeLast();
                itsNodeMap.remove(theNodeToRemove.key);
                break;
            } else {
                i++;
            }
        }
    }

    Node theNode;

    if (itsNodeMap.containsKey(key)) {
        theNode = itsNodeMap.get(key);
        theNode.val = value;
        theNode.retrievals++;
        itsRetrievalMap.get(theNode.retrievals-1).remove(theNode);
        if (!itsRetrievalMap.containsKey(theNode.retrievals)) {
            itsRetrievalMap.put(theNode.retrievals, new LinkedList<Node>());
        }
        itsRetrievalMap.get(theNode.retrievals).addFirst(theNode);
    } else {
        theNode = new Node(key, value);
        if (!itsRetrievalMap.containsKey(0)) {
            itsRetrievalMap.put(0, new LinkedList<Node>());
        }
        itsRetrievalMap.get(0).addFirst(theNode);
        itsNodeMap.put(key, theNode);
        if (population < capacity) {
            population++;

        }
    }
}
```
<br/>
<br/>
<paragraph>
  As required by the defined behavior of an LFUCache, if the cache has reached it's capacity, then the least frequently used object needs to be removed. The first two if statements in the put method check to see if capacity has been reached.
</paragraph>

```java
if (capacity == 0) {
    return;
}

if (population == capacity && !itsNodeMap.containsKey(key)) {
    int i = 0;
    Node theNodeToRemove;
    while (true) {
        if (itsRetrievalMap.containsKey(i) && itsRetrievalMap.get(i).size() > 0) {
            theNodeToRemove = itsRetrievalMap.get(i).removeLast();
            itsNodeMap.remove(theNodeToRemove.key);
            break;
        } else {
            i++;
        }
    }
}
```
<br/>
<br/>
<paragraph>
  The first if statement is for the case in which the cache has no capacity, so the put method should always exit. Otherwise, if the currently added key doesn't exist in the map and the capacity has been reached, the put method needs to remove the least frequently used object from the cache. To do so, starting from the smallest possible key of 0 in the retrievalMap, we will increment a counter to check to see if there exists a value in the retrievalMap for that specified key, and if that LinkedList is not empty, remove the node at the end of it. When a value is found, this search procedure ends and there is now room in the cache to add the new key.
</paragraph>

<paragraph>
  Whether or not capacity has been reached, we will need a procedure to manage the addition of a key to the cache. If, for a given key, there is an object in memory, then we will need to increment the number of times it has been retrieved and rewrite the value of the Node. The node will then need to be moved to the next appropriate key in the retrievalMap.
</paragraph>

```java
  Node node;

  if (nodeMap.containsKey(key)) {
      node = nodeMap.get(key);
      node.val = value;
      node.retrievals++;
      retrievalMap.get(node.retrievals-1).remove(node);
      if (!retrievalMap.containsKey(node.retrievals)) {
          retrievalMap.put(node.retrievals, new LinkedList<Node>());
      }
      retrievalMap.get(node.retrievals).addFirst(node);
  } else {
      node = new Node(key, value);
      if (!retrievalMap.containsKey(0)) {
          retrievalMap.put(0, new LinkedList<Node>());
      }
      retrievalMap.get(0).addFirst(node);
      nodeMap.put(key, node);
      if (population < capacity) {
          population++;

      }
  }

```
<br/>
<br/>
<paragraph>
If an object does not exist for that key, the we will need to create a new Node for that key, add that node to the nodeMap, and add the Node to retrievalMap in the LinkedList where the key, which represents the number of retrievals for the Nodes in the associated LinkedList, is 0.
</paragraph>

<paragraph>
  Notice that the get and put methods both have some shared code: when a node is retrieved, it's moved to a different LinkedList in the retrievalMap HashMap. We'll put the shared code in a method and call the method in place of the duplicate code.
</paragraph>

```java
  private void moveNode(Node node) {
      node.retrievals++;
      retrievalMap.get(node.retrievals-1).remove(node);
      if (!retrievalMap.containsKey(node.retrievals)) {
          retrievalMap.put(node.retrievals, new LinkedList<Node>());
      }
      retrievalMap.get(node.retrievals).addFirst(node);
  }
```
<br/>
<br/>
Finally, the implementation of our LFUCache class looks like this:

```java
class LFUCache {
    HashMap<Integer, LinkedList<Node>> retrievalMap = new HashMap<Integer, LinkedList<Node>>();
    HashMap<Integer, Node> nodeMap = new HashMap<Integer, Node>();
    int capacity;
    int population = 0;

    public LFUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        Node node;
        if (nodeMap.containsKey(key)) {
            node = nodeMap.get(key);
            moveNode(node);
            return node.val;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (capacity == 0) {
           return;
        }

        if (population == capacity && !nodeMap.containsKey(key)) {
            int i = 0;
            Node nodeToRemove;
            while (true) {
                if (retrievalMap.containsKey(i) && retrievalMap.get(i).size() > 0) {
                    nodeToRemove = retrievalMap.get(i).removeLast();
                    nodeMap.remove(nodeToRemove.key);
                    break;
                } else {
                    i++;
                }
            }
        }

        Node node;

        if (nodeMap.containsKey(key)) {
            node = nodeMap.get(key);
            node.val = value;
            moveNode(node);
        } else {
            node = new Node(key, value);
            if (!retrievalMap.containsKey(0)) {
                retrievalMap.put(0, new LinkedList<Node>());
            }
            retrievalMap.get(0).addFirst(node);
            nodeMap.put(key, node);
            if (population < capacity) {
                population++;

            }
        }
    }

    private void moveNode(Node node) {
        node.retrievals++;
        retrievalMap.get(node.retrievals-1).remove(node);
        if (!retrievalMap.containsKey(node.retrievals)) {
            retrievalMap.put(node.retrievals, new LinkedList<Node>());
        }
        retrievalMap.get(node.retrievals).addFirst(node);
    }
}
```

<paragraph>
  While I was happy that my solution solved the problem at all, I wanted to explore more optimal solutions. LeetCode provides visibility into how fast your solution performs with respect to other solutions and even provides access to code from other solutions. Part 2 of this article will cover a more performant implementation of an LFU cache.
</paragraph>
