import React, {useState} from 'react'

function Nav() {
    
    return (
        <>
           <nav className="navbar">


                <a href = "index.html"> Home</a> &nbsp;
                <a href = "gallery.html"> Gallery</a> &nbsp;
                <a href = "prices.html"> Prices</a> &nbsp;
                <a href = "Feedback.html"> Feedback</a> &nbsp;
                <a href = "Reservations.html"> Reservation </a> &nbsp;
                <a href = "demo.html"> Demo </a> &nbsp;
                <a href = "staff.html"> Staff </a> &nbsp;
               {/* <div className="navbar-container">

                   <div className='menu-icon'>
                       <i className={click ? 'fas fa-times' : 'fas fa-bars'} />


                   
                   <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                       <li className='nav-item'>
                           <link to='/' className='nav-links' onClick={closeMobileMenu}>
                               Home
                           </link>

                       </li>
                       <li className='nav-item'>
                           <link to='/' className='nav-links' onClick={closeMobileMenu}>
                               Due Dates
                           </link>
                        </li>

                        <li className='nav-item'>
                           <link to='/' className='nav-links' onClick={closeMobileMenu}>
                               Calender
                           </link>
                       </li>
                   </ul>
                   </div>

               </div> */}

            </nav> 
        </>
    )
}

export default Nav
