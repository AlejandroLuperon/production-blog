import React from "react";
import me from "../images/me.jpg";
import './about.css'

import callback_1 from "../images/dealing-with-callback-hell-using-graphs-asset-1.png";

export default () => (

     <div className='col-12' style={{
       maxWidth: '1200px'}}>
        <h1>About this blog</h1>
        <div className={'d-flex flex-lg-row flex-column '}>
          <div className='col-lg-4 col-12'>
            <img style={{maxHeight: "600px"}} src={me} className='me'/>
          </div>
          <div className='col-lg-8 col-12'>
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
        <h1>Hire me!</h1>
        <div>
          <p>
            I currently am providing consulting services to tech companies on a variety of topics and with a variety of technologies. Feel free to <a href="mailto:alejandro.luperon@gmail.com">e-mail me</a> to learn more about the services I provide.
          </p>
        </div>
        <h1>About me</h1>
        <div>
          <p>
            I have 10 years of software engineering experience and 6 years working in industry. 5 of these years have been at companies with less than 10 people. I have seen two companies through successful
            seed round raises, and one company through a Series A.
          </p>
          <p>
            I have worked across the entire application stack for many products and projects I have been involved with, including the front-end, back-end, mobile, databases, machine learning, and servers & infrastructure. I have built machine learning algorithms, ETL systems, web crawlers, and even a mobile application. Throughout my time as an engineer, I have made it
            a point to learn as many things as possible because I love what I do and I love learning about how things work.
          </p>
          <p>
            Prior to consulting, I spent three years working at, <a href="https://rentrezi.com">REZI</a>. I went with the founding team to Mountain View, CA, where I spent three months building out the flagship product while the founders attended Y Combinator.
          </p>
          <p>
            Much of my career has been spent building code bases from scratch, and along the way, I have worked with many technologies across the entire stack. These technologies include:
            <ul style={{marginTop: '15px', marginBottom: '15px'}}>
              <li>Java</li>
              <li>Javascript</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Ruby</li>
              <li>Python</li>
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>AWS (EC2, RDS, Redshift, Elasticbeanstalk)</li>
              <li>Firebase</li>
              <li>Elasticsearch</li>
              <li>Bootstrap</li>
              <li>Angular</li>
              <li>React</li>
              <li>React Native</li>
              <li>Redux</li>
              <li>Redux-Saga</li>
            </ul>
            to name a few.
          </p>
        </div>
    </div>

);
