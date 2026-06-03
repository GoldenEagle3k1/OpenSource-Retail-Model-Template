import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowRight, Globe, MessageCircle, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("You're subscribed! 🎉 Check your inbox.", { duration: 3000 });
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-black text-xl">VoltShop</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 mb-5">
              Your one-stop destination for premium products across electronics,
              fashion, home, sports, beauty, and bike parts.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: MessageCircle, href: '#', label: 'Twitter' },
                { Icon: Heart, href: '#', label: 'Instagram' },
                { Icon: Globe, href: '#', label: 'Facebook' },
                { Icon: Share2, href: '#', label: 'Github' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {['All Products', 'Electronics', 'Clothing', 'Home & Living', 'Sports', 'Beauty', 'Bike Spare Parts'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/shop"
                      className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {['FAQ', 'Shipping Policy', 'Returns & Refunds', 'Track Order', 'Contact Us', 'Size Guide'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">
              Get exclusive deals and new arrivals delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 active:scale-95"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} VoltShop. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
