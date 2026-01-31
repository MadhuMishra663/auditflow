"use client";

import Image from "next/image";

const ContactSection = () => {
  return (
    <section className="w-full bg-[#E8F1F8] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text + Form */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Contact <span className="text-[#6B9AC4]">Us</span>
          </h2>

          <p className="text-gray-700 text-lg mb-6">
            Have questions or want to learn more? Fill out the form below, and
            we’ll get back to you as soon as possible.
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
            />
            <textarea
              placeholder="Your Message"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4] resize-none"
              rows={4}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#6B9AC4] text-white rounded-lg hover:bg-[#5A89B0] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[300px] md:h-[360px]">
          <Image
            src="/images/contactus.png" // replace with your illustration
            alt="Contact illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
