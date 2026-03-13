/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Intake from './components/Intake';
import CommunityResources from './components/CommunityResources';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Intake />
        <FAQ />
        <CommunityResources />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}


