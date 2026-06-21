import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full">


      {/* What is FYB Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">What is FYB?</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-left">
              <p>
                FYB is more than just a clothing brand. We are a statement of intent. Born from the desire to merge classic tailoring with modern aesthetics, we provide high-quality, durable, and stylish clothing for individuals who want to look their best without compromising on comfort.
              </p>
              <p>
                Every piece is crafted with meticulous attention to detail and designed to stand the test of time. We believe that what you wear is a reflection of who you are, which is why we pour our passion into every stitch, seam, and silhouette.
              </p>
              <p>
                Our mission is simple: to empower you with confidence. Whether you're dressing for a corporate boardroom, a casual weekend out, or a high-end costume event, FYB ensures you always leave a lasting impression.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
