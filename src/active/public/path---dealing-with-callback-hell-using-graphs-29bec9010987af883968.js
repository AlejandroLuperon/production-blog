webpackJsonp([0xd982ed35414e],{392:function(e,t){e.exports={data:{markdownRemark:{htmlAst:{type:"element",tagName:"div",properties:{},children:[{type:"element",tagName:"paragraph",properties:{},children:[{type:"text",value:'\n  In the world of web development, the problem of chaining asynchronous calls in a particular order has been such a common challenge that it has its own nickname: "callback hell". There is even an '},{type:"element",tagName:"a",properties:{href:"http://callbackhell.com/",target:"\\_blank"},children:[{type:"text",value:"entire website"}]},{type:"text",value:" dedicated to this topic. A lot of strategies and design patterns have been developed or employed to provide structure and strategy to avoid this problem. At my job, we have several workflows that require that several levels of API calls be made, and that succeeding calls depend on data returned from previous calls.\n"}]},{type:"element",tagName:"paragraph",properties:{},children:[{type:"text",value:"\n  I drew the relationship of API calls out, and what came to be was a graph. This wasn't the first time I had drawn out such a relationship of objects/actions, but this was the first time that it occurred to me that modeling this problem using graphs could be another suitable solution to this problem.\n"}]},{type:"element",tagName:"paragraph",properties:{},children:[{type:"text",value:"\n  Let's say we had a blog. Each post has comments, and each comment can have both likes/dislikes, and replies. We first have to know which post is being viewed, and with that we can retrieve the likes/dislikes as well as replies.\n"}]},{type:"element",tagName:"paragraph",properties:{},children:[{type:"text",value:"\n  "},{type:"element",tagName:"img",properties:{src:"/static/dealing-with-callback-hell-using-graphs-asset-1.d84ccd4d.png"},children:[]},{type:"text",value:"\n"}]}]},frontmatter:{title:"Dealing with nested callback using graphs"}}},pathContext:{slug:"/dealing-with-callback-hell-using-graphs/"}}}});
//# sourceMappingURL=path---dealing-with-callback-hell-using-graphs-29bec9010987af883968.js.map