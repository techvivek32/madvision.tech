export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 text-foreground">Privacy Policy</h1>
        <div className="prose prose-lg max-w-4xl">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">In compliance with the Information Technology Act, 2000 and Digital Personal Data Protection Act, 2023, we collect:</p>
          <ul className="text-muted-foreground mb-6 list-disc pl-6">
            <li>Personal identifiers (name, email, phone number, PAN, GST number)</li>
            <li>Business information for our SaaS products (Retailians POS, 911 Wrap ERP, DSAT Guru)</li>
            <li>Usage data and analytics for service improvement</li>
            <li>Payment information processed through RBI-compliant payment gateways</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Legal Basis for Processing</h2>
          <p className="text-muted-foreground mb-6">We process personal data under legitimate business interests, contractual necessity, and with explicit consent as per Indian data protection laws.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Data Storage and Security</h2>
          <p className="text-muted-foreground mb-6">Data is stored within India or with adequate safeguards as per RBI guidelines. We implement ISO 27001 compliant security measures including encryption, access controls, and regular security audits.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Retention</h2>
          <p className="text-muted-foreground mb-6">Personal data is retained as per Indian tax laws (minimum 7 years for financial records) and business requirements, with secure deletion thereafter.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
          <p className="text-muted-foreground mb-4">Under Indian data protection laws, you have rights to:</p>
          <ul className="text-muted-foreground mb-6 list-disc pl-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request data deletion (subject to legal obligations)</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Third-Party Sharing</h2>
          <p className="text-muted-foreground mb-6">We may share data with RBI-approved payment processors, GST network for compliance, and authorized service providers under strict data processing agreements.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Cookies and Tracking</h2>
          <p className="text-muted-foreground mb-6">We use cookies for functionality and analytics. You can manage cookie preferences through your browser settings.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Grievance Redressal</h2>
          <p className="text-muted-foreground mb-4">For privacy concerns, contact our Grievance Officer:</p>
          <p className="text-muted-foreground mb-6">Email: privacy@visiontech.com<br/>Phone: +91 96011 76051<br/>Address: Rajkot, Gujarat, India</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Jurisdiction</h2>
          <p className="text-muted-foreground mb-6">This Privacy Policy is governed by Indian laws. Any disputes shall be subject to the exclusive jurisdiction of courts in Rajkot, Gujarat, India.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact Information</h2>
          <p className="text-muted-foreground">Vision Tech<br/>Email: madevisionstudios@gmail.com<br/>Phone: +91 96011 76051<br/>Address: Rajkot, Gujarat, India</p>
        </div>
      </div>
    </div>
  )
}