---
title: Dealing with nested callback using graphs
date: "2018-05-21"
description: An application of graphs to remedy this common problem
---

<paragraph>
  In the world of web development, the problem of chaining asynchronous calls in a particular order has been such a common challenge that it has its own nickname: "callback hell". There is even an <a href="http://callbackhell.com/" target="\_blank">entire website</a> dedicated to this topic. A lot of strategies and design patterns have been developed or employed to provide structure and strategy to avoid this problem. At my job, we have several workflows that require that several levels of API calls be made, and that succeeding calls depend on data returned from previous calls.
</paragraph>

<paragraph>
  I drew the relationship of API calls out, and what came to be was a graph. This wasn't the first time I had drawn out such a relationship of objects/actions, but this was the first time that it occurred to me that modeling this problem using graphs could be another suitable solution to this problem.
</paragraph>

<paragraph>
  Let's say we had a blog. Each post has comments, and each comment can have both likes/dislikes, and replies. We first have to know which post is being viewed, and with that we can retrieve the likes/dislikes as well as replies.
</paragraph>

<paragraph>
  <img src="/static/dealing-with-callback-hell-using-graphs-asset-1.c4032b2d.png"></img>
</paragraph>

<paragraph>

</paragraph>
  For each node there is an associated action, and in this instance,  it is an API call. This API call will retrieve some payload, and this payload will have the information required to be able to retrieve the node's immediate descendants. So, if a call does not return a payload or result, traversal will cease for the nodes dependents, because the information needed to retrieve the dependents is not available. So if we were to create a class for our node, it will need to have the following properties:
  <br/>
  <br/>
  <ul>
    <li>A payload property</li>
    <li>A retriever property</li>
    <li>A property to store the node's dependents</li>
  </ul>
</paragraph>

<paragraph>
  Graph traversal strategies such as breadth-first search or depth-first search provide a way to be able navigate the graph, so what we will do is also incorporate the traversal of a node's descendants with an implementation inspired by depth-first search.
</paragraph>

<paragraph>
  With our properties and functionality defined, we can define a Call class:
</paragraph>

```java
import java.util.List;
import java.util.function.Consumer;

public class Call<T> {
    public T payload;
    private Consumer<Consumer<T>> retriever;
    private List<Call<?>> dependents;

    public void setRetriever(Consumer<Consumer<T>> argRetriever) {
        retriever = argRetriever;
    }

    public void setDependents(List<Call<?>> argDependents) {
        dependents = argDependents;
    }

    private void getDependents() {
        if (dependents != null && !dependents.isEmpty()) {
            dependents.forEach((argDependent) -> {
                argDependent.retrieve();
            });
        }
    }

    public void retrieve() {
        if (retriever == null) {
            return;
        }
        retriever.accept((result)->{
            payload = result;
            getDependents();
        });
    }
}
```
<br/>
<paragraph>
  I also want certain actions to be able to execute just before a call is executed and just after the call is executed. This will be explained later, but we'll add some Runnables to the interface:
</paragraph>

```java
import java.util.List;
import java.util.function.Consumer;

public class Call<T> {
    public T payload;
    private Consumer<Consumer<T>> retriever;
    private List<Call<?>> dependents;
    private Runnable onExitRunnable;
    private Runnable onStartRunnable;

    public void setRetriever(Consumer<Consumer<T>> argRetriever) {
        retriever = argRetriever;
    }

    public void setDependents(List<Call<?>> argDependents) {
        dependents = argDependents;
    }

    private void getDependents() {
        if (payload == null) {
            exit();
        }

        if (dependents != null && !dependents.isEmpty()) {
            dependents.forEach((argDependent) -> {
                argDependent.retrieve();
            });
        }
        exit();
    }

    public void setOnStartRunnable(Runnable argOnStartRunnable) {
        onStartRunnable = argOnStartRunnable;
    }

    public void setOnExitRunnable(Runnable argOnExitRunnable) {
        onExitRunnable = argOnExitRunnable;
    }

    public void retrieve() {
        if (retriever == null) {
            exit();
        }
        if (onStartRunnable != null) {
            onStartRunnable.run();
        }

        retriever.accept((result)->{
            payload = result;
            getDependents();
        });
    }

    private void exit() {
        if (onExitRunnable != null) {
            onExitRunnable.run();
        }
        return;
    }
}


```

<paragraph>
  Our example is a disconnected graph, yet we want to be able to make all of the necessary calls, so we'll also create a graph class:
</paragraph>
<br/>

```java
import java.util.List;
import java.util.Stack;

public class Calls {
    private List<Call<?>> calls;
    private Runnable onCompleteRunnable;
    private Stack<Call<?>> activeCallStack = new Stack<Call<?>>();

    public void setCalls(List<Call<?>> argCalls) {
        calls = argCalls;
        calls.forEach((argCall) -> {
            argCall.setOnExitRunnable(()->{
                removeActiveCall(argCall);
                isLoaded();
            });

            argCall.setOnStartRunnable(()->{
                addActiveCall(argCall);
            });
        });

    }

    public void setOnCompleteRunnable(Runnable argOnCompleteRunnable) {
        onCompleteRunnable = argOnCompleteRunnable;
    }

    private Boolean isLoaded() {
        if (activeCallStack.size() == 0) {
            onCompleteRunnable.run();
            return true;
        }
        return false;
    }

    private void addActiveCall(Call<?> argCall) {
        activeCallStack.add(argCall);
    }

    private void removeActiveCall(Call<?> argCall) {
        activeCallStack.remove(argCall);
    }
}
```
<br/>
<paragraph>
  The idea behind the usage of the stack is to see if the graph is still being traversed. If the graph is traversed to the extent that existing payloads allow, the stack would be empty since all possible calls have been made, and whatever logical sequence the programmer intends can continue if the onCompleteRunnable is set.
</paragraph>
