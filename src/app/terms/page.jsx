"use client";
import Layout from '../../components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg my-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Terms of Use</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Wigiart, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use Wigiart for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <p>The materials on Wigiart are provided on an 'as is' basis. Wigiart makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
            <p>In no event shall Wigiart or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Wigiart.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Revisions</h2>
            <p>The materials appearing on Wigiart could include technical, typographical, or photographic errors. Wigiart does not warrant that any of the materials on its website are accurate, complete or current.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
