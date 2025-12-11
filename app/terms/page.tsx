export default function TermsOfService() {
  return (
    <div className="pt-32 pb-16 bg-background">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 text-foreground">Terms of Service</h1>
        <div className="prose prose-lg max-w-4xl">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-6">By accessing Vision Tech services, you agree to be bound by these terms, Indian laws including Information Technology Act 2000, Consumer Protection Act 2019, and Gujarat state regulations.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Company Information</h2>
          <p className="text-muted-foreground mb-6">Vision Tech is a technology company registered in Gujarat, India, providing SaaS solutions (Retailians POS, 911 Wrap ERP, DSAT Guru) in compliance with Indian business regulations.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Service Availability</h2>
          <p className="text-muted-foreground mb-6">Services are provided "as is" with 99.9% uptime SLA. Planned maintenance will be notified 24 hours in advance. Force majeure events are excluded from SLA calculations.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payment Terms and GST</h2>
          <p className="text-muted-foreground mb-4">All payments are in Indian Rupees (INR) and include applicable GST as per Indian tax laws:</p>
          <ul className="text-muted-foreground mb-6 list-disc pl-6">
            <li>Subscription fees are billed monthly/annually in advance</li>
            <li>18% GST applicable on all services</li>
            <li>Payments processed through RBI-approved gateways</li>
            <li>GST invoices provided as per Indian regulations</li>
            <li>Late payment charges: 2% per month on overdue amounts</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Refund Policy</h2>
          <p className="text-muted-foreground mb-6">Refunds available within 7 days of purchase as per Consumer Protection Act 2019. Processing fee of 3% may apply. Refunds processed within 7-10 business days.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Data Protection and Compliance</h2>
          <p className="text-muted-foreground mb-6">We comply with Digital Personal Data Protection Act 2023, IT Act 2000, and maintain data within Indian borders or with adequate safeguards as per RBI guidelines.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Intellectual Property</h2>
          <p className="text-muted-foreground mb-6">All software, trademarks, and content are protected under Indian Copyright Act 1957 and Trademarks Act 1999. Unauthorized use is prohibited.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">8. User Obligations</h2>
          <p className="text-muted-foreground mb-4">Users must:</p>
          <ul className="text-muted-foreground mb-6 list-disc pl-6">
            <li>Comply with Indian laws and regulations</li>
            <li>Provide accurate business information including GST details</li>
            <li>Maintain confidentiality of login credentials</li>
            <li>Not engage in illegal activities or misuse services</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Limitation of Liability</h2>
          <p className="text-muted-foreground mb-6">Liability limited to subscription fees paid in the preceding 12 months. Indirect damages excluded except as required under Indian consumer protection laws.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Termination</h2>
          <p className="text-muted-foreground mb-6">Either party may terminate with 30 days notice. Data export facility provided for 90 days post-termination. Immediate termination for breach of terms.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Dispute Resolution</h2>
          <p className="text-muted-foreground mb-6">Disputes resolved through arbitration under Arbitration and Conciliation Act 2015. Arbitration seat: Rajkot, Gujarat. Governing law: Indian law.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Jurisdiction</h2>
          <p className="text-muted-foreground mb-6">These terms are governed by Indian laws. Courts in Rajkot, Gujarat have exclusive jurisdiction for any legal proceedings.</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Grievance Officer</h2>
          <p className="text-muted-foreground mb-4">For complaints or grievances:</p>
          <p className="text-muted-foreground mb-6">Name: Grievance Officer<br/>Email: grievance@visiontech.com<br/>Phone: +91 96011 76051<br/>Response time: 72 hours</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Contact Information</h2>
          <p className="text-muted-foreground">Vision Tech<br/>Email: madevisionstudios@gmail.com<br/>Phone: +91 96011 76051<br/>Address: Rajkot, Gujarat, India<br/>Business Hours: 9 AM - 6 PM IST</p>
        </div>
      </div>
    </div>
  )
}