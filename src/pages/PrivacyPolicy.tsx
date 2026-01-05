import AppShell from "@/components/layout/AppShell";

const PrivacyPolicy = () => {
  return (
    <AppShell>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1>Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>

            <h2>1. Information We Collect</h2>
            <p>
              Z-Axis Immigration collects personal information that you provide 
              directly to us, including name, email, phone number, and immigration-related 
              details necessary to assess your eligibility and provide our services.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our 
              services, communicate with you, and comply with legal obligations.
            </p>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with 
              service providers who assist in our operations, or as required by law.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. 
              Contact us at info@zaxisimmigration.ca to exercise these rights.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, contact us at:<br />
              Email: info@zaxisimmigration.ca<br />
              Phone: +1 647 533 4499
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default PrivacyPolicy;
