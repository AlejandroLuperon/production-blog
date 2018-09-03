import React from "react";
import me from "../images/me.jpg";

export default () => (
  <div>
    <h1>Build Whatever You Want</h1>
    {/*<img style={{maxHeight: '500px'}} src={me}/>*/}
    <p>
      This is a blog run by <a href="https://www.linkedin.com/in/alejandroluperon/">me</a>, Alejandro Luperon. The topics in this blog will range across a variety of topics in Software Engineering,
      ranging from Front-End, to Back-End, database development, API development, machine learning, and more. I really enjoy engineering strategy, organization,
      and methodology, so there will also be articles about that.
    </p>
    <p>
      I hope to contribute to making the engineering spaces I am a part of positive and welcoming for all.
      I want people to feel comfortable entering and staying in the engineering world without insecurity or fear, so that way they can use their own positive traits to
      participate and grow however they see fit.
    </p>
    <p>This blog was built using Gatsby.js and React, and is under active construction.</p>
  </div>
);
