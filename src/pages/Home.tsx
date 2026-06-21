import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import HeroSlideshow from '../components/home/HeroSlideshow';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroSlideshow />

      {/* Trending Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Products</h2>
              <p className="text-slate-500 mt-2">Our most popular pieces right now.</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              // Skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="bg-gray-200 rounded-xl aspect-[3/4] w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))
            ) : products.length > 0 ? (
              // Actual Products
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-4 text-center py-10 text-gray-500">
                <p>No products found. Go to the Admin dashboard to add some!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info/About Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What is FYB?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              FYB is more than just a clothing brand. We are a statement of intent. Born from the desire to merge classic tailoring with modern aesthetics, we provide high-quality, durable, and stylish clothing for individuals who want to look their best without compromising on comfort. Every piece is crafted with meticulous attention to detail and designed to stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer">
              <Mail className="h-8 w-8 text-slate-900 mb-4" />
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Email</h3>
              <a href='mailto:[EMAIL_ADDRESS]' className="text-slate-500" target="_blank">fyb@gmail.com</a>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer">
              <Phone className="h-8 w-8 text-slate-900 mb-4" />
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Whatsapp</h3>
              <a href='https://wa.me/+2349027246597' className="text-slate-500" target="_blank">Reach out to us on Whatsapp</a>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer">
              <MapPin className="h-8 w-8 text-slate-900 mb-4" />
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Address</h3>
              <a href='https://maps.google.com/?q=Lagos, Nigeria' className="text-slate-500" target="_blank">Lagos, Nigeria.</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
