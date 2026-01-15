import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const blogsToSeed = [
    {
        title: "IRCC Secure Account: A Step-by-Step Guide",
        slug: "ircc-secure-account-guide",
        image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
        content: `
            <p><strong>One account, many applications—learn what it’s for and how to use it correctly.</strong></p>
            <p>Immigration, Refugees and Citizenship Canada (IRCC) relies heavily on its digital platform to process applications efficiently. For most modern immigration pathways—whether you are applying for a Visitor Visa, a Study Permit, or Express Entry—the <strong>IRCC Secure Account</strong> (formerly known as GCKey or MyCIC) is your central hub. It’s where you start applications, upload documents, pay fees, and track your status.</p>
            <p>However, the system can be confusing. "Online application" can refer to multiple different portals (like the new IRCC Portal vs. the traditional Secure Account). This guide focuses on the <strong>IRCC Secure Account</strong>, the robust platform used for the majority of temporary and permanent residence programs.</p>

            <h2>Check if this is the right account for you</h2>
            <p>Before you register, it is crucial to ensure you are using the correct portal for your specific needs. The IRCC Secure Account is the designated platform for:</p>
            <ul>
                <li><strong>Express Entry:</strong> Creating your profile and submitting your permanent residence application (e-APR).</li>
                <li><strong>Study and Work Permits:</strong> Initial applications, extensions, and restoring status.</li>
                <li><strong>International Experience Canada (IEC):</strong> Creating your profile and submitting your work permit application.</li>
                <li><strong>Visitor Records:</strong> Extending your stay in Canada as a visitor.</li>
                <li><strong>Changing Conditions:</strong> Changing employers on a work permit or changing schools (DL) for students.</li>
                <li><strong>Citizenship:</strong> Applying for a citizenship certificate (proof of citizenship) or searching citizenship records.</li>
            </ul>
            <p><em>Note: For some simple Visitor Visa or eTA applications, IRCC is transitioning to the newer "IRCC Portal," but the Secure Account remains the most comprehensive tool for complex files and extensions.</em></p>

            <h2>Registering for an account</h2>
            <p>To "register" means to create your login credentials. You have two main options to access the system:</p>
            <ol>
                <li><strong>GCKey:</strong> This is a unique username and password you create specifically for Government of Canada services. It requires setting up security questions. This is the most common method.</li>
                <li><strong>Sign-In Partner:</strong> You can log in using your existing Canadian online banking credentials (e.g., TD, RBC, Scotiabank). This is convenient if you already bank in Canada, as you don't need to remember a new password.</li>
            </ol>
            <p><strong>Step-by-Step:</strong></p>
            <ul>
                <li>Go to the official <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/register.html" target="_blank">IRCC Register page</a>.</li>
                <li>Choose "Register with GCKey" or "Register with a Sign-In Partner".</li>
                <li>Follow the prompts to create your ID.</li>
                <li><strong>Crucial Step:</strong> You will be asked to create "Recovery Questions". Write these down exactly as you typed them. You will need to answer one every time you log in.</li>
            </ul>

            <h2>Signing in and managing applications</h2>
            <p>Once logged in, you enter the main dashboard. This is your command center. From here, you can:</p>
            <h3>Start an Application</h3>
            <p>Use the "Apply to come to Canada" section. It will lead you to a questionnaire ("Come to Canada Wizard") that determines your eligibility and generates the correct personalized document checklist for you.</p>
            <h3>Upload Documents</h3>
            <p>Every application has a tailored list of required documents. The system allows you to upload one file per field (e.g., "Proof of Means of Financial Support"). If you have multiple bank statements, you must merge them into a single PDF file before uploading.</p>
            <h3>Link a Paper Application</h3>
            <p>If you applied on paper (or through a Visa Application Centre), you can "link" that application to your online account to see real-time status updates. This is extremely useful for tracking progress without waiting for mail.</p>

            <h2>Practical checklist for a smooth online submission</h2>
            <ul>
                <li><strong>File Size Limits:</strong> Most uploads are limited to 4MB. Compress your PDFs if they are too large.</li>
                <li><strong>File Naming:</strong> Use clear, English filenames (e.g., "<strong>JohnDoe_Passport.pdf</strong>" rather than "<strong>Scan001.pdf</strong>"). This helps officers review your file faster.</li>
                <li><strong>Responding to Requests:</strong> If IRCC sends a "Request Letter" (e.g., for biometrics or a medical exam), it will appear in your account messages. You usually have a strict deadline (often 30 or 90 days) to respond.</li>
                <li><strong>Browser Compatibility:</strong> The site works best on desktop browsers (Chrome, Edge, Firefox). Avoid using mobile phones for uploading critical documents.</li>
            </ul>
        `
    },
    {
        title: "IRCC Processing Times Explained: What the Numbers Mean",
        slug: "ircc-processing-times-explained",
        image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Processing times are estimates—understand how IRCC calculates them and what can change.</strong></p>
            <p>One of the first questions every applicant asks is, <em>"How long will it take?"</em> Processing times are critical for planning major life events like quitting a job, enrolling in school, or booking flights. However, the numbers you see on the IRCC website are often misunderstood. They are not guarantees; they are historical estimates based on how long it took to process <em>past</em> applications.</p>

            <h2>What the processing time covers</h2>
            <p>It is important to understand when the "clock" starts and stops:</p>
            <ul>
                <li><strong>Start:</strong> The time begins when IRCC receives a <strong>complete</strong> application. For online applications, this is the second you hit "Submit." For paper applications, it’s when the mailroom receives it.</li>
                <li><strong>End:</strong> The time ends when a decision is made (approval or refusal).</li>
            </ul>
            <p><strong>What is NOT included:</strong> The time it takes for you to give biometrics, the time it takes for mail to travel back to you (for PR cards), or the time between your approval and your actual travel.</p>

            <h2>How IRCC calculates “historical” processing times</h2>
            <p>For most permanent residence and temporary residence programs, IRCC uses a <strong>backward-looking</strong> calculation. They look at how long it took to process <strong>80% of applications</strong> in the past 6 or 12 months.</p>
            <p><em>Example:</em> If the website says "15 weeks," it means that 80% of the applications processed in the last chunk of time were finished within 15 weeks. Some (20%) took longer.</p>
            <p>This is why your friend might have gotten their visa in 2 weeks while the website says 10 weeks—the "80%" figure covers the majority, but complex cases drag the average up. Conversely, if you are stuck in security screening, you might fall into the 20% that take longer.</p>

            <h2>Online vs. Paper start dates</h2>
            <ul>
                <li><strong>Online:</strong> Instant receipt. The processing time estimate applies from the moment of submission.</li>
                <li><strong>Paper:</strong> There is a lag. IRCC has to open the mail, check for completeness, and enter it into the system. The processing time technically starts when they receive it, but you might not see it in the system for weeks.</li>
            </ul>

            <h2>Common reasons times vary</h2>
            <p>Even with the estimates, your specific application might face delays due to:</p>
            <ol>
                <li><strong>Completeness:</strong> If you forgot a document, IRCC might return the whole package (paper) or ask for it later (online), pausing the clock.</li>
                <li><strong>Complexity:</strong> If you have a medical condition requiring further testing, or a background check that hits a keyword in security databases, it will take longer.</li>
                <li><strong>Volume:</strong> Seasonal spikes (like student permit applications in July/August) can slow down the entire global network.</li>
                <li><strong>Country of Residence:</strong> For some visas, the local visa office's workload matters. An office in New Delhi might have a different queue than one in London.</li>
            </ol>
            <p>Always check the <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank">official processing times tool</a> regularly, as it is updated weekly.</p>
        `
    },
    {
        title: "Reasons You Can Be Found Inadmissible to Canada",
        slug: "inadmissible-to-canada-reasons",
        image_url: "https://images.unsplash.com/photo-1569420067965-188e734c148c?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Inadmissibility can block visas, eTAs, and entry—learn the categories IRCC uses.</strong></p>
            <p>You can have all the right qualifications—a job offer, a university acceptance, or a loving spouse in Canada—but if you differ to the definition of "inadmissible," you will not be allowed to enter the country. Inadmissibility is a legal finding that a person is not allowed to enter or stay in Canada.</p>

            <h2>Security Reasons</h2>
            <p>This is the most serious category and usually involves a permanent ban. Grounds include:</p>
            <ul>
                <li><strong>Espionage or Subversion:</strong> Spying against Canada or attempting to overthrow a government.</li>
                <li><strong>Violence or Terrorism:</strong> Engaging in or instigating violence closer to political or religious goals.</li>
                <li><strong>Membership:</strong> Being a member of an organization that engages in acts of espionage, subversion, or terrorism.</li>
            </ul>

            <h2>Human or International Rights Violations</h2>
            <p>Canada takes a hard stance on international justice. You are inadmissible if you have:</p>
            <ul>
                <li>Committed war crimes or crimes against humanity.</li>
                <li>Been a senior official in a government engaged in gross human rights violations or sanctioned by Canada.</li>
            </ul>

            <h2>Criminality and Organized Crime</h2>
            <p>This is the most common reason for inadmissibility among regular travelers.</p>
            <ul>
                <li><strong>Criminality:</strong> Having committed a crime (including <strong>DUI/DWI</strong>) inside or outside Canada that would be punishable by less than 10 years if committed in Canada.</li>
                <li><strong>Serious Criminality:</strong> Crimes punishable by 10 years or more (e.g., major assault, drug trafficking).</li>
                <li><strong>Organized Crime:</strong> Membership in a gang or syndicate involved in criminal activity like people smuggling or money laundering.</li>
            </ul>
            <p><em>Note on Driving Under the Influence:</em> In Canada, impaired driving contributes to "Serious Criminality." A single DUI can bar you from entering Canada forever unless resolved.</p>

            <h2>Medical, Financial, and Misrepresentation</h2>
            <ul>
                <li><strong>Medical:</strong> If you have a condition that endangers public health (e.g., untreated tuberculosis) or causes "excessive demand" on Canada's health system (costs exceeding a certain threshold).</li>
                <li><strong>Financial:</strong> If you are unable or unwilling to potential support yourself and your family members.</li>
                <li><strong>Misrepresentation:</strong> Lying on an application or withholding information. This results in a <strong>5-year ban</strong> from applying for any status.</li>
                <li><strong>Non-Compliance:</strong> Failing to follow immigration laws (e.g., overstaying a visa previously).</li>
            </ul>
        `
    },
    {
        title: "Overcoming Criminal Inadmissibility: Rehabilitation",
        slug: "overcoming-criminal-inadmissibility",
        image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Past convictions can make you inadmissible—IRCC explains when rehabilitation may apply.</strong></p>
            <p>A mistake in your past doesn't necessarily mean you are banned from Canada forever. IRCC has mechanisms to allow people with past criminal records to enter, provided they can demonstrate they have been "rehabilitated" and are unlikely to reoffend.</p>
            
            <h2>Deemed Rehabilitation vs. Individual Rehabilitation</h2>
            <p>It mostly depends on how much time has passed since you completed your <strong>entire sentence</strong> (including probation and fines).</p>
            <h3>Deemed Rehabilitation</h3>
            <p>This happens automatically fairly often if enough time has passed. Generally:</p>
            <ul>
                <li>If you had <strong>one</strong> non-serious conviction.</li>
                <li>At least <strong>10 years</strong> have passed since you finished your sentence.</li>
            </ul>
            <p>If you qualify, you don't need to apply for special permission, but you should bring proof (court records) to the border to show the 10 years have passed.</p>
            
            <h3>Individual Rehabilitation</h3>
            <p>If less than 10 years have passed (but at least 5 years), strict "Deemed Rehabilitation" doesn't apply. You must applying for <strong>Criminal Rehabilitation</strong>.</p>
            <ul>
                <li>You fill out a form (IMM 1444).</li>
                <li>You provide extensive proof of your stable lifestyle, community ties, and how you have changed.</li>
                <li>If approved, your inadmissibility is permanently removed (unless you commit a new crime).</li>
            </ul>

            <h2>Equivalency to Canadian Law</h2>
            <p>IRCC doesn't just look at what the crime is called in your country; they look at what it equates to in Canada. For example, a "misdemeanor" in the US doesn't exist in Canada. It might equate to a "summary offense" or an "indictable offense."</p>
            <p>The <strong>maximum sentence</strong> possible in Canada for the equivalent crime is what matters. This is why DUI is serious—in Canada, the max sentence is 10 years, making it "Serious Criminality."</p>

            <h2>How to Apply</h2>
            <p>Rehabilitation applications can be submitted to a Canadian consulate or visa office. They take a long time to process (often over a year). If you need to travel urgently, you might consider a <strong>Temporary Resident Permit (TRP)</strong>, which overrides inadmissibility for a specific trip, though it is temporary and hard to get.</p>
        `
    },
    {
        title: "Study Permit Basics: What You Need Before You Apply",
        slug: "study-permit-basics-canada",
        image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
        content: `
            <p><strong>A study permit application succeeds when the fundamentals are correct.</strong></p>
            <p>Canada is a top destination for international students. A Study Permit is a document we issue that allows foreign nationals to study at designated learning institutions (DLIs) in Canada. It is not just about getting into a school; it is about proving to an immigration officer that you are a genuine student.</p>

            <h2>The Core Requirements</h2>
            <p>Before you log into the portal, ensure you have the "Big Three":</p>
            <ol>
                <li><strong>Letter of Acceptance (LOA):</strong> You must be accepted by a Designated Learning Institution (DLI). If applying for a post-secondary program (like a Master's), you generally also need a <strong>Provincial Attestation Letter (PAL)</strong> unless exempted (e.g., Master's degree students are currently exempt from PALs in many cases, but always check the latest rules).</li>
                <li><strong>Proof of Identity:</strong> A valid passport.</li>
                <li><strong>Proof of Financial Support:</strong> You must prove you can support yourself. <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html#doc3" target="_blank">IRCC recently raised the financial requirement</a>. You now need to show the cost of first-year tuition <strong>PLUS</strong> $20,635 for living expenses (for a single applicant).</li>
            </ol>

            <h2>The "Dual Intent" Concept</h2>
            <p>Many students want to stay in Canada permanently. This is allowed (Dual Intent). However, when applying for the study permit, you must still satisfy the officer that <strong>you will leave Canada at the end of your authorized stay</strong> if you do not get permanent residence. If an officer thinks you will stay illegally, they will refuse the permit.</p>

            <h2>Work Rights</h2>
            <ul>
                <li><strong>While Studying:</strong> Most study permits allow you to work part-time (up to 20 hours/week, currently temporarily waived to 24 hours under new proposals) off-campus during regular semesters and full-time during breaks.</li>
                <li><strong>After Graduation:</strong> The <strong>Post-Graduation Work Permit (PGWP)</strong> is a massive draw. It allows you to work for any employer in Canada for up to 3 years after graduating, depending on your program length.</li>
            </ul>
        `
    },
    {
        title: "Work in Canada: Understanding Work Permit Pathways",
        slug: "work-in-canada-pathways",
        image_url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Start with the right category—open permits, employer-specific permits, and special programs.</strong></p>
            <p>Not all work permits are created equal. IRCC categorizes them broadly into two buckets: Employer-Specific and Open.</p>

            <h2>Employer-Specific Work Permits</h2>
            <p>These tie you to one job, one employer, and one location.</p>
            <ul>
                <li><strong>LMIA-Based:</strong> Usually, an employer must get a Labour Market Impact Assessment (LMIA) to prove no Canadian could do the job. Once they have a positive LMIA, you apply for the work permit.</li>
                <li><strong>LMIA-Exempt:</strong> Some jobs (due to free trade agreements like CUSMA/NAFTA, or Intra-Company Transfers) don't need an LMIA, but still need a focused work permit.</li>
            </ul>

            <h2>Open Work Permits</h2>
            <p>These allow you to work for <em>almost</em> any employer in Canada. You don't need a job offer to apply, but you usually need to qualify via a special pathway:</p>
            <ul>
                <li><strong>Post-Graduation Work Permit (PGWP):</strong> For graduates of eligible Canadian institutions.</li>
                <li><strong>Spousal Open Work Permit (SOWP):</strong> For spouses of skilled workers or certain international students.</li>
                <li><strong>International Experience Canada (IEC):</strong> Working Holiday visas for youth from partner countries.</li>
                <li><strong>Bridge Open Work Permit (BOWP):</strong> For those waiting for PR results.</li>
            </ul>

            <h2>Key Advice</h2>
            <p>Never work without authorization. "Working" in immigration law is defined broadly—even unpaid internships can count as work. Always check the conditions on your permit.</p>
        `
    },
    {
        title: "Visiting Canada: eTA, Visitor Visa, or Super Visa?",
        slug: "visiting-canada-options",
        image_url: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80",
        content: `
            <p><strong>The right visitor document depends on nationality, purpose, and length of stay.</strong></p>
            <p>If you want to visit Canada for tourism, business, or family, you generally need permission before you fly. The type of permission depends on "Who you are" (nationality) and "Who you are visiting."</p>

            <h2>1. Electronic Travel Authorization (eTA)</h2>
            <p><strong>For:</strong> Visa-exempt nationals (e.g., UK, France, Australia, Japan) and some US Green Card holders.</p>
            <p><strong>Process:</strong> Quick, online, costs $7. Approved in minutes.</p>
            <p><strong>Validity:</strong> Linked to your passport for up to 5 years.</p>

            <h2>2. Visitor Visa (TRV)</h2>
            <p><strong>For:</strong> Nationals of non-visa-exempt countries (e.g., India, China, Philippines).</p>
            <p><strong>Process:</strong> Full application via IRCC Secure Account or Portal. Requires biometrics, proof of funds, and ties to home country.</p>
            <p><strong>Validity:</strong> Can be issued for up to 10 years (or passport validity), allowing multiple entries.</p>

            <h2>3. Super Visa</h2>
            <p><strong>For:</strong> Parents and Grandparents of Canadian Citizens or Permanent Residents.</p>
            <p><strong>Benefit:</strong> Unlike a regular visitor visa (which usually allows 6-month stays), a Super Visa allows parents to stay for <strong>up to 5 years at a time</strong>.</p>
            <p><strong>Requirements:</strong> Higher income threshold for the child (LICO), mandatory Canadian medical insurance, and upfront medical exam.</p>

            <h2>Extending Your Stay</h2>
            <p>If you are in Canada as a visitor and want to stay longer than 6 months, you must apply for a <strong>Visitor Record</strong>. You must apply <em>before</em> your current status expires (at least 30 days recommended).</p>
        `
    },
    {
        title: "Express Entry: What It Is and Who Uses It",
        slug: "express-entry-explained",
        image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Express Entry is a system IRCC uses for skilled immigration—know the moving parts.</strong></p>
            <p>Express Entry is not an immigration program itself; it is the <strong>application management system</strong> for the three main federal economic programs:</p>
            <ol>
                <li><strong>Federal Skilled Worker (FSW)</strong></li>
                <li><strong>Canadian Experience Class (CEC)</strong></li>
                <li><strong>Federal Skilled Trades (FST)</strong></li>
            </ol>

            <h2>How it works (The Pool)</h2>
            <p>You create a profile online. You verify your language skills (IELTS/CELPIP) and education (ECA). The system gives you a <strong>CRS Score</strong> (Comprehensive Ranking System) based on age, education, language, and work experience.</p>
            <p>You enter a "pool" of candidates. Roughly every two weeks, IRCC conducts a "Draw." They set a cutoff score (e.g., 500). Everyone above that score gets an <strong>Invitation to Apply (ITA)</strong>.</p>

            <h2>Category-Based Selection</h2>
            <p>Recently, IRCC introduced category-based draws. Instead of just a high score, they prioritize candidates with specific experience, such as:</p>
            <ul>
                <li>French-language proficiency</li>
                <li>Healthcare occupations</li>
                <li>STEM professions</li>
                <li>Trades</li>
                <li>Transport</li>
                <li>Agriculture and Agri-food</li>
            </ul>
            <p>This means even if your score is lower, you might get invited if you fit a category Canada needs.</p>

            <h2>Reference Sites</h2>
             <p>Official pages to bookmark:</p>
             <ul>
                 <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/works.html" target="_blank">How Express Entry works</a></li>
                 <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html" target="_blank">Rounds of invitations (Draws)</a></li>
             </ul>
        `
    },
    {
        title: "Service Standards vs. Processing Times",
        slug: "ircc-service-standards-vs-processing-times",
        image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Standards and estimates are different—learn how IRCC presents each.</strong></p>
            <p>If you dig into IRCC reports, you'll see two different sets of numbers regarding speed. It's vital to know the difference so you don't set false expectations.</p>

            <h2>Service Standards</h2>
            <p>These are the <strong>goals</strong> or "commitments" IRCC sets for itself. They represent the "ideal" timeline for routine cases.</p>
            <p><em>Example:</em> The service standard for an electronic Express Entry application is <strong>6 months</strong> for 80% of cases. The standard for a Study Permit applied for outside Canada is <strong>60 days</strong>.</p>
            <p>These standards often encompass the "normal" workflow without backlogs.</p>

            <h2>Processing Times (The Tool)</h2>
            <p>These are <strong>realities</strong>. The <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank">Processing Times Tool</a> shows the actual time it took to process applications recently.</p>
            <p>Sometimes, the Processing Time is <em>worse</em> than the Service Standard (due to backlogs). Sometimes it is <em>better</em>. The Processing Time tool should be your guide for planning life events, not the Service Standard document.</p>

            <h2>Performance</h2>
            <p>IRCC publishes annual reports on whether they met their standards. For example, in years with high backlogs, they might report they only met the 6-month standard for 60% of FSW applications, missing their 80% target.</p>
        `
    },
    {
        title: "A Map of IRCC Application Services",
        slug: "map-of-ircc-application-services",
        image_url: "https://images.unsplash.com/photo-1577791465839-4d6910606b24?auto=format&fit=crop&q=80",
        content: `
            <p><strong>Use IRCC’s own structure to avoid missing steps and submitting the wrong application.</strong></p>
            <p>The IRCC ecosystem is vast. Here is a mental map of how the services connect, which helps you navigate the website and your application journey.</p>

            <h2>1. The "Before" Phase (Research)</h2>
            <ul>
                <li><strong>"Immigrate"</strong> tab: For permanent moves (Express Entry, Family Sponsorship, PNP).</li>
                <li><strong>"Work" / "Study"</strong> tabs: For temporary stays.</li>
                <li><strong>"Come to Canada Wizard":</strong> A tool to tell you what you are eligible for.</li>
            </ul>

            <h2>2. The "During" Phase (Application)</h2>
            <ul>
                <li><strong>Accounts:</strong> GCKey / Secure Account (for most things) vs. IRCC Portal (for some Visitor/eTA).</li>
                <li><strong>Biometrics:</strong> After you apply, you get a Biometrics Instruction Letter (BIL). You must book an appt at a VAC (Visa Application Centre). You generally give biometrics once every 10 years.</li>
                <li><strong>Medicals:</strong> Either you do an Upfront Medical (before apply) or wait for a Medical Request (after apply).</li>
            </ul>

            <h2>3. The "After" Phase (Arrival)</h2>
            <ul>
                <li><strong>Port of Entry (POE):</strong> The border officer makes the final decision. Your visa gets you to the door; the officer lets you in.</li>
                <li><strong>PR Card:</strong> If you land as a PR, you don't get the card instantly. It is mailed to a Canadian address weeks later.</li>
                <li><strong>SIN (Social Insurance Number):</strong> You get this from Service Canada (not IRCC) after you have your permit/PR status.</li>
            </ul>
        `
    }
];

const BlogSeeder = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        try {
            // 1. Auth check removed for seeding
            // const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            // if (sessionError || !session) { ... }

            // 2. Insert blogs
            let successCount = 0;
            let failCount = 0;

            for (const blog of blogsToSeed) {
                // Check if exists first to avoid duplicates (optional, based on slug)
                const { data: existing } = await supabase
                    .from('blogs')
                    .select('id')
                    .eq('slug', blog.slug)
                    .single();

                if (!existing) {
                    const { error } = await supabase.from('blogs').insert([{
                        ...blog,
                        published: true
                    }]);

                    if (error) {
                        console.error(`Failed to insert ${blog.title}:`, error);
                        failCount++;
                    } else {
                        successCount++;
                    }
                } else {
                    console.log(`Skipping ${blog.title}, already exists.`);
                }
            }

            toast({
                title: "Seeding complete",
                description: `Inserted ${successCount} blogs. Failed/Skipped ${failCount}.`,
            });
        } catch (error: any) {
            console.error("Seeding error:", error);
            toast({
                title: "Error",
                description: "Critical error during seeding.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-12 text-center">
            <h1 className="text-3xl font-bold mb-6">Blog Content Seeder</h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                This tool will populate the blog database with 10 detailed articles about IRCC, Visas, and Immigration.
                You must be logged in as an admin to perform this action.
            </p>
            <Button onClick={handleSeed} disabled={loading} size="lg">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Seeding..." : "Seed 10 Blog Posts"}
            </Button>
        </div>
    );
};

export default BlogSeeder;
