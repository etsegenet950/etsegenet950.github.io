import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/like">Like Us</a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;