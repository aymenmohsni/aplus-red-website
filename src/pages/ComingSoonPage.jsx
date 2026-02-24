import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, CheckCircle, Stethoscope, Shield, Truck } from 'lucide-react';
import logo from '../assets/logo.png';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  // Target launch date — 60 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 60);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = launchDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const features = [
    { icon: Stethoscope, text: 'Certified Medical Supplies' },
    { icon: Shield, text: 'Quality Assured Products' },
    { icon: Truck, text: 'Express Delivery' },
  ];

  const CountdownUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Card with gradient border effect */}
        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-primary/10">
          <span className="font-display text-3xl md:text-4xl text-neutral font-bold">
            {String(value).padStart(2, '0')}
          </span>
        </div>
        {/* Accent dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
      </div>
      <span className="mt-2 text-xs font-semibold tracking-widest uppercase text-gray-400">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(240, 60, 60, 0.08), rgba(0, 40, 80, 0.08))' }} />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #F03C3C20 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Header / Logo */}
      <header className="relative z-10 w-full px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="APlusMedDepot logo" className="h-14 w-auto object-contain" />
            <span className="font-display text-2xl text-neutral">
              A<span className="text-primary">Plus</span>MedDepot
            </span>
          </div>

          <a
            href="mailto:support@aplusmeddepot.com"
            className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            support@aplusmed.com
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8 shadow-sm animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-600 tracking-wide">Launching Soon</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl md:text-7xl text-neutral leading-tight mb-6 max-w-3xl animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          Your Medical{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundColor: '#F03C3C' }}
          >
            Supplies Hub
          </span>{' '}
          Is Almost Here
        </h1>

        <p
          className="text-lg md:text-xl text-gray-500 max-w-xl mb-12 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          We're putting the finishing touches on APlusMedDepot — your one-stop marketplace for
          certified medical supplies, delivered with care.
        </p>

        

        {/* Email Signup */}
        <div
          className="w-full max-w-md mb-12 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                required
                className="input-medical flex-grow text-sm"
              />
              <button
                type="submit"
                className="btn-medical inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Notify Me
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-xl px-6 py-4 text-green-700 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="font-semibold text-sm">
                You're on the list! We'll notify you at <strong>{email}</strong>
              </span>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-3">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>

        {/* Feature Pills */}
        <div
          className="flex flex-wrap justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          {features.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-full text-sm text-gray-600 font-medium"
            >
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              {text}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-6 text-center">
        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} APlusMedDepot. All rights reserved. &nbsp;·&nbsp;
            <a href="mailto:support@aplusmeddepot.com" className="hover:text-primary transition-colors">
              Contact Us
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;
