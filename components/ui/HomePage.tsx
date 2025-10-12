
"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const HomePage = () => {
  return (
    <div id="page-container" className="w-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-indigo-300 to-sky-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <header className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <Link
                href="/"
                className="text-white text-2xl font-bold flex items-center justify-center md:justify-start"
              >
                <i className="fa fa-expand text-white/70 mr-2"></i> Startup
              </Link>
            </div>
          </header>
          {/* END Header */}

          {/* Hero Content */}
          <div className="flex justify-center text-center py-12 sm:py-20">
            <div className="max-w-xl sm:max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
                Let’s build the future together
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8">
                Inspiring tools and resources to help you build your next
                endeavour easily and effortlessly.
              </p>
              <Link
                href="/auth/signup"
                className="animate-pulse inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold uppercase tracking-wide px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transition"
              >
                <i className="fa fa-check-circle"></i> Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* END Hero */}

      {/* Feature #1 */}
      <div className="bg-zinc-100 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="flex justify-center lg:justify-end">
            <Image
              width={600}
              height={400}
              src="/images/img.jpg"
              alt="Businessman Illustration"
              className="w-full max-w-xs sm:max-w-md rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Awesome Features</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              Get to know all the features our resources have to offer for your
              business
            </p>
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <i className="fa fa-check text-orange-800 mr-2"></i> Employee
                Database & Profiles
              </li>
              <li className="flex items-center">
                <i className="fa fa-check text-green-600 mr-2"></i> Role-Based
                Access Control (RBAC)
              </li>
              <li className="flex items-center">
                <i className="fa fa-check text-green-600 mr-2"></i> Attendance &
                Time Tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* END Feature #1 */}

      {/* Mini Stats */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 text-center gap-6 sm:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">350</div>
            <div className="uppercase text-gray-500 font-semibold text-sm sm:text-base">Clients</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">580</div>
            <div className="uppercase text-gray-500 font-semibold text-sm sm:text-base">Projects</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">1.5k</div>
            <div className="uppercase text-gray-500 font-semibold text-sm sm:text-base">Sales</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">35</div>
            <div className="uppercase text-gray-500 font-semibold text-sm sm:text-base">Servers</div>
          </div>
        </div>
      </div>
      {/* END Mini Stats */}

      {/* Feature #2 */}
      <div className="bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <Image
              width={600}
              height={400}
              src="/images/img2.jpg"
              alt="Nomad Illustration"
              className="w-full max-w-xs sm:max-w-md rounded-lg shadow-md"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Nomad Support</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              We offer our services worldwide, 24/7. You can always count on us
              to deliver the best for your creative projects.
            </p>
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <i className="fa fa-check text-green-600 mr-2"></i> Leave
                Management System
              </li>
              <li className="flex items-center">
                <i className="fa fa-check text-green-600 mr-2"></i> Payroll
                Management
              </li>
              <li className="flex items-center">
                <i className="fa fa-check text-green-600 mr-2"></i> Performance
                Review & KPI Tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* END Feature #2 */}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-400 to-sky-400 py-12 sm:py-20 text-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Start creating now</h2>
          <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
            We are here to help you build your idea.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold uppercase tracking-wide px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transition"
          >
            <i className="fa fa-check-circle"></i> Get Started Today
          </Link>
        </div>
      </footer>
      {/* END Footer */}
    </div>
  )
}

export default HomePage
