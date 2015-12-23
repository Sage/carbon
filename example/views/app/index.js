import React from 'react';
import { Link } from 'react-router'

class App extends React.Component {

  render() {
    let welcome;
    if (!this.props.children) {
      welcome = <div>
                  <h1>WELCOME</h1><br/>
                  <h3>To your dynamic accounting product</h3>
                </div>
    }

    return (
      <div>
        <div className="nav">
          <div className="logo">
            <Link to='/'><h3>Fake Sage</h3></Link>
          </div>
          <ul className='navlinks'>
            <li><Link to='finances'>Finances</Link></li>
            <li><Link to='income'>Income</Link></li>
          </ul>
        </div>
        <div className='content'>
          { welcome }
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default App;
