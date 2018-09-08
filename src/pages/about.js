import React from "react";
import me from "../images/me.jpg";

export default () => (
  <div className={'layout-column layout-align-center-center'}>
         <div style={{
           width: '1200px'
         }}>
    <h1>Build Whatever You Want</h1>
    <p>
      This is a blog run by <a target='_blank' href="https://www.linkedin.com/in/alejandroluperon/">me</a>, Alejandro Luperon. The topics in this blog will range across a variety of topics in Software Engineering
      ranging from Front-End, to Back-End, database development, API development, machine learning, and more. I really enjoy engineering strategy, organization,
      and methodology, so there will also be articles about that as well.
    </p>
    <p>
      I hope to contribute to making the engineering spaces I am a part of positive and welcoming for all.
      I want people to feel comfortable entering and staying in the engineering world without insecurity or fear, so that way they can use their own positive traits to
      participate and grow however they see fit.
    </p>
    <p>This blog was built using <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby.js</a> and <a href="https://reactjs.org/" target="_blank">React</a>, deployed on AWS, and is under active construction.</p>
  </div>
  </div>
);
