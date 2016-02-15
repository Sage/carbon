import React from 'react';
import Row from 'components/row';
import AnimatedMenuButton from 'components/animated-menu-button';
import Link from 'components/link';

class QuickCreate extends React.Component {
  render() {
    return (
    <AnimatedMenuButton className='quick-create' direction='left' label="Create...">
      <Row>
        <div>
          <h2 className="title">Budget</h2>
            <p><Link href='#'>Personal</Link></p>
            <p><Link href='#'>Work</Link></p>
        </div>
        <div>
          <h2 className="title">Report</h2>
            <p><Link href='#'>Credits</Link></p>
            <p><Link href='#'>Debits</Link></p>
        </div>
        <div>
          <h2 className="title">Expense</h2>
            <p><Link href='http://google.com'>Personal</Link></p>
            <p><Link href='#'>Work</Link></p>
        </div>
      </Row>
    </AnimatedMenuButton>
    );
  }
}

export default QuickCreate;
