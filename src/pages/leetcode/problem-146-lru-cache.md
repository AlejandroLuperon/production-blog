---
title: LeetCode Problem 460 - LFU Cache, Part 1
date: "2018-11-18"
description: LeetCode question to implement an LFU Cache.
---
<paragraph>
  <a target="\_blank" href="https://leetcode.com/problems/lru-cache/">Problem 146 on LeetCode</a> requires the creation of a Least Recently Used (LFU) cache. An LRU cache is an algorithm that, when it's capacity is reached, removes
  the least recently used object from memory.
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
      put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
    </li>
  </ul>
</paragraph>

<paragraph>
  The final result, below, has three methods, the get and put methods as required by the problem, and a search method, which is used both by the get and put method.
</paragraph>
```java

public class LRUCache {
    LinkedList<Node> log = new LinkedList<Node>();
    HashMap<Integer, Node> quickRetrievalMap = new HashMap<Integer, Node>();
    int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        Node node = search(key);
        if (node != null) {
            log.remove(node);
            log.addFirst(node);
            return node.value;
        }
        return -1;
    }

    public void put(int key, int value) {
        Node node = search(key);
        if (node != null) {
            node.value = value;
            log.remove(node);
            log.addFirst(node);
            return;
        }

        Node newNode = new Node(key, value);

        if (capacity == log.size()) {
            Node lastNode = log.removeLast();
            quickRetrievalMap.remove(lastNode.key);
        }

        quickRetrievalMap.put(key, newNode);
        log.addFirst(newNode);
    }

    public Node search(int key) {
        if (quickRetrievalMap.containsKey(key)) {
            return quickRetrievalMap.get(key);
        }

        return null;
    }
}
class Node {
    public int key;
    public int value;

    public Node(int key, int value) {
        this.key = key;
        this.value = value;
    }
}
```
<paragraph>
  Starting with the definition of the class
</paragraph>
