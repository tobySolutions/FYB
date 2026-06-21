import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-[60vh] justify-center py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center tracking-tight">Get In Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
            <Mail className="h-8 w-8 text-slate-900 mb-4" />
            <h3 className="font-semibold text-lg text-slate-900 mb-2">Email</h3>
            <a href='mailto:[EMAIL_ADDRESS]' className="text-slate-500" target="_blank">fyb@gmail.com</a>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
            <Phone className="h-8 w-8 text-slate-900 mb-4" />
            <h3 className="font-semibold text-lg text-slate-900 mb-2">Whatsapp</h3>
            <a href='https://wa.me/+2349027246597' className="text-slate-500" target="_blank">Reach out to us on Whatsapp</a>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
            <MapPin className="h-8 w-8 text-slate-900 mb-4" />
            <h3 className="font-semibold text-lg text-slate-900 mb-2">Address</h3>
            <a href='https://maps.google.com/?q=Lagos, Nigeria' className="text-slate-500" target="_blank">Lagos, Nigeria.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
