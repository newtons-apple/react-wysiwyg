import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            this is hompage
            <p>
            <Link to='/posting'>posting하러 가기</Link>
            </p>
        </div> )
    }
}
 
export default Home;