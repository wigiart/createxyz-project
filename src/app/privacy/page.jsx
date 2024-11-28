"use client";
import Layout from '../../components/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg my-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p>We collect information that you provide directly to us, including when you create an account, use our services, or contact us for support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Wigiart and our users.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <p>We do not share your personal information with companies, organizations, or individuals outside of Wigiart except in the following cases:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>With your consent</li>
              <li>For legal reasons</li>
              <li>To protect rights, property or safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p>We work hard to protect Wigiart and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p>Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
