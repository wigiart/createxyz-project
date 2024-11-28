"use client";
import Layout from '../../components/Layout';

export default function CookiesPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg my-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Cookie Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>To enable certain functions of the website</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisement delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function properly.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Preference Cookies</h3>
                <p>These cookies remember your preferences and settings.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                <p>These cookies help us understand how visitors interact with our website.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
            <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impact your overall user experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p>We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
