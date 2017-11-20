import React, {Component} from 'react'
import firebase, {auth} from '~/fire';
import { Switch, Route, NavLink, HashRouter } from 'react-router-dom';
import Routes from './Routes'
import Login from './Login'
import AddScene from './AddScene'
import AddStory from './AddStory'
import Stories from './Stories'


const navStyle = {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: 'rgba(251, 202, 43, 1)'
}

const liStyle ={
    float: 'left',
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none'
}





export const Navbar = ({user, auth}) =>
<div className="navbar" >
    <HashRouter>
        <div>
            <div>
                <ul className='header' style={navStyle}>
                {/* link to home commented out as home component not ready yet */}
                    <li style={liStyle}>Home</li>
                    <li style={liStyle}><NavLink to ='/addStory'>Add Stories</NavLink></li>
                    <li style={liStyle}><NavLink to ='/addScene'>Add Scene</NavLink></li>
                    <li style={liStyle}><NavLink to ='/stories'>Stories</NavLink></li>

                     {((!user || user.isAnonymous))
                     ? <Login style={liStyle}>
                     Login with Google
                       </Login>
                     :
                     <li style={liStyle}
                     className='logout' onClick={() => auth.signOut()}>logout
                     </li>
                     }
                    </ul>
            </div>
               
            <div>
                {/* <Route path='/' component={App} /> */}
                <Route path='/addStory' component={AddStory} />
                <Route path='/addScene' component={AddScene} />
                <Route path='/stories' component={Stories} />
                <Route path='/login' component={Login} />
            </div>
        </div>
    </HashRouter>   
</div>



