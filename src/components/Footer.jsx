import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faGoogle
  } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (

        <footer className="bg-dark footer">

            <div className='social-container'>
                <div className='social-container-row'>
                    
                    <a href="mailto:safepay@gmail.com"
                        className="gmail social">
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                    </a>
                </div>
                <div className='website-rights'>
                    <small>© Copyright 2022 GEC. All rights reserved.</small>
                </div>
            </div>

        </footer>

    )
}

