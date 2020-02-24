import React from 'react';
import Header from './header';
import DemoComponents from './components-demo/demo';
import SellingPoints from './selling-points';
import LovesCarbon from './loves-carbon';
import GetStarted from './get-started';
import Footer from './footer';

const Welcome = () => {
  return (
    <div>
      <Header />
      <DemoComponents />
      <SellingPoints />
      <LovesCarbon />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Welcome;
