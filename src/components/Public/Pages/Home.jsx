import React from 'react';
import Navbar from '../Navbar';
import Hero from '../Hero';
// import Features from '../Features';
// import ProductShowcase from '../ProductShowcase';
// import HowItWorks from '../HowItwork';
// import Benefits from '../Benefits';
// import Pricing from '../Pricing';
// import FAQ from '../FAQ';
// import CTA from '../CTA';
import Footer from '../Footer';

/**
 * Home Component
 * Assembles all public landing page sections in structural sequence
 * with Navbar at the top and Footer at the bottom.
 */
const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* <Features />
        <ProductShowcase />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <FAQ />
        <CTA /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;