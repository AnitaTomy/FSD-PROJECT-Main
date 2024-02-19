import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const About = () => {
  return (
    <div>
      <header className="header" id="header">
        <div className="logo-container">
          <div className="logo">
            <img
              src="/img/166028664_padded_logo-removebg-preview.png"
              alt="Gourmet Grove"
              className="logo-img"
              style={{ height: '70px', width: '70px', color: 'white' }}
            />
          </div>
          <h3 style={{ color: "white" }}>Gourmet Grove</h3>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/about'}>
                About
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/login'}>
                Login
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/signup'}>
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="wrap" style={{ backgroundImage: 'url("/img/pexels-anna-tarazevich-7287678.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '500px', width: '100%' }}>
        <div className="genesis-widget">
          <div className="wrap">
          <section id="text-24" className="widget widget_text" style={{ position: 'relative' }}>
            <div className="widget-wrap" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px', height: '250px', width: '500px', position: 'absolute', top: '20px', right: '20px' }}>
              <h3 className="widgettitle widget-title"><span>Hi There!</span></h3><br />
                <div className="textwidget">
                  <h6>I’m Anita, the little hand behind this little blog. I’ve grown up in the kitchen alongside my mum and grandmother, and conversations in my family are always about the next meal. I’ve picked up their love for food along the way, and with this blog, I share my food story with you.</h6>
                </div>
                <img src='/img/fonts-signature (1).png' alt='Anita' style={{marginRight:"30px"}}></img>
                </div>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;
