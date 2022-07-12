import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>About</h4>
            <ul>
              <li>
                <a href="#">Locations</a>
              </li>
              <li>
                <a href="#">Franchise With Us</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Make Kacha Happen !</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resource</h4>
            <ul>
              <li>
                <a href="#">Reviews</a>
              </li>
              <li>
                <a href="#">Kacha Resource Center</a>
              </li>
              <li>
                <a href="#">Media Fact Sheet</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>More</h4>
            <ul>
              <li>
                <a href="#">Gift Cards</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Franchisee Login</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Private Policy</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Newsletter</h4>
            <ul>
              <li>
                <a href="#">Signup to recive the Kacha</a>
              </li>
              <li>
                <a href="#">Family Newsletter</a>
              </li>
              <li>
                <input type="text"></input>
              </li>
            </ul>
            <div class="social-links">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
