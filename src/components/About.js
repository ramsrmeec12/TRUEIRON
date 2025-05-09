import React from 'react';
import { Helmet } from 'react-helmet-async'; // For SEO meta tags

function AboutUs() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* SEO Metadata */}
      <Helmet>
        
        <meta
          name="description"
          content="Discover the story behind Fitness Gear Experts – your trusted partner in premium-quality fitness equipment like treadmills, dumbbells, strength machines, and more."
        />
        <meta name="keywords" content="About Fitness Gear, Treadmill Company, Gym Equipment, Strength Machines, Fitness Experts, Home Workout Equipment" />
        <meta name="author" content="Fitness Gear Experts" />
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Helmet>

      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>

      {/* Content */}
      <p className="text-gray-700 text-lg mb-4">
        At <strong>Fitness Gear Experts</strong>, we’re passionate about empowering every individual and gym owner with cutting-edge fitness equipment that fuels results. From durable treadmills and high-performance cycle machines to strength-training gear and accessories, we provide only the best — designed for performance, safety, and reliability.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Founded in 2024, our mission is simple: to make fitness accessible and effective for everyone. Whether you're building a home gym or managing a commercial fitness center, our expert team is here to guide you with honest advice and top-tier support.
      </p>

      <p className="text-gray-700 text-lg">
        Join thousands of happy customers who trust us for their fitness journey. Your goals are our motivation — and we’re here to help you achieve them.
      </p>
    </div>
  );
}

export default AboutUs;
