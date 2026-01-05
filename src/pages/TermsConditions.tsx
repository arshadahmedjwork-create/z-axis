import AppShell from "@/components/layout/AppShell";

const TermsConditions = () => {
  return (
    <AppShell>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1>Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>

            <h2>1. Services</h2>
            <p>
              Z-Axis Immigration provides immigration consulting services. Our services 
              are advisory in nature and do not guarantee approval of any immigration 
              application.
            </p>

            <h2>2. Professional Standards</h2>
            <p>
              Our consultants are Regulated Canadian Immigration Consultants (RCIC) 
              registered with the College of Immigration and Citizenship Consultants (CICC).
            </p>

            <h2>3. Fees and Payment</h2>
            <p>
              All fees are disclosed upfront before services commence. Payment is 
              required before booking confirmation. Refund policies are outlined in 
              individual service agreements.
            </p>

            <h2>4. Client Responsibilities</h2>
            <p>
              Clients are responsible for providing accurate and complete information. 
              Misrepresentation may result in service termination and immigration consequences.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              Z-Axis Immigration is not liable for decisions made by immigration 
              authorities. We provide guidance based on current laws and policies.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website is the property of Z-Axis Immigration and 
              may not be reproduced without permission.
            </p>

            <h2>7. Contact</h2>
            <p>
              For questions about these terms, contact us at:<br />
              Email: info@zaxisimmigration.ca<br />
              Phone: +1 647 533 4499
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default TermsConditions;
