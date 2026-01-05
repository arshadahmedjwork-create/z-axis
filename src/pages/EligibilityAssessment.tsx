import AppShell from "@/components/layout/AppShell";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, User, Briefcase, GraduationCap, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useAssessment, AssessmentData } from "@/hooks/useAssessment";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Background", icon: Briefcase },
  { id: 3, title: "Education & Work", icon: GraduationCap },
  { id: 4, title: "Immigration Goals", icon: MapPin },
];

const countries = [
  "India", "Nigeria", "Philippines", "Pakistan", "Bangladesh",
  "China", "Iran", "Brazil", "Mexico", "Other"
];

const EligibilityAssessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { savedAssessment, saveAssessment, loading: assessmentLoading, refetch } = useAssessment();

  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AssessmentData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    homeCountry: "",
    isCitizen: "",
    yearsOfExperience: "",
    hasJobOffer: "",
    educationLevel: "",
    englishLevel: "",
    preferredCountry: "Canada",
    immigrationGoal: "",
    timeline: "",
    additionalInfo: "",
  });

  // Pre-fill email from user if logged in
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  // Show result if user already has an assessment
  useEffect(() => {
    if (savedAssessment && !showResult) {
      setShowResult(true);
    }
  }, [savedAssessment]);

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Final step - calculate and save
    const urgency = calculateUrgency();
    const result = urgencyData[urgency];

    if (user) {
      setSaving(true);
      const { error } = await saveAssessment(formData, urgency, result.action);
      setSaving(false);

      if (error) {
        toast.error("Failed to save assessment. Please try again.");
        return;
      }
    }

    setShowResult(true);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error("Sign in failed. Please try again.");
    }
  };

  // Simple urgency calculation
  const calculateUrgency = () => {
    let score = 0;

    if (formData.hasJobOffer === "yes") score += 30;
    if (parseInt(formData.yearsOfExperience) >= 3) score += 25;
    if (formData.educationLevel === "masters" || formData.educationLevel === "phd") score += 20;
    if (formData.englishLevel === "fluent") score += 15;
    if (formData.timeline === "immediate" || formData.timeline === "3-6months") score += 10;

    if (score >= 60) return "immediate";
    if (score >= 30) return "strong";
    return "strengthen";
  };

  const urgencyData = {
    immediate: {
      title: "Immediate Action Required",
      description: "Your profile shows strong potential! We recommend booking a case-specific consultation right away.",
      color: "text-primary",
      bgColor: "bg-primary-soft",
      action: "consultation-case-specific",
    },
    strong: {
      title: "Strong Candidate",
      description: "You have a solid foundation. An exploratory consultation can help finalize your strategy.",
      color: "text-primary",
      bgColor: "bg-primary-soft",
      action: "consultation-exploratory",
    },
    strengthen: {
      title: "Strengthen Profile First",
      description: "There are opportunities to improve your profile. Consider our educational resources or an exploratory consultation.",
      color: "text-muted-foreground",
      bgColor: "bg-surface",
      action: "consultation-exploratory",
    },
  };

  const isLoading = authLoading || assessmentLoading;

  // Show login prompt if not authenticated
  if (!authLoading && !user) {
    return (
      <AppShell>
        <section className="bg-background text-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Free Eligibility Assessment
              </h1>
              <p className="text-lg text-muted-foreground">
                Sign in to save your assessment and track your immigration journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card className="border-border">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-primary-soft rounded-full w-fit mx-auto mb-6">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Sign In to Start
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your assessment will be securely saved and linked to your account.
                  </p>
                  <Button variant="hero" size="lg" onClick={handleGoogleSignIn}>
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Takes only 5 minutes to complete
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AppShell>
    );
  }

  if (isLoading) {
    return (
      <AppShell>
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </section>
      </AppShell>
    );
  }

  if (showResult) {
    const urgency = savedAssessment?.urgency as keyof typeof urgencyData || calculateUrgency();
    const result = urgencyData[urgency];

    return (
      <AppShell>
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${result.bgColor} mb-6`}>
                <CheckCircle className={`h-5 w-5 ${result.color}`} />
                <span className={`font-semibold ${result.color}`}>{result.title}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Assessment Complete
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {result.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => {
                    const redirect = searchParams.get("redirect");
                    const target = redirect
                      ? decodeURIComponent(redirect)
                      : `/booking?service=${savedAssessment?.recommended_service || result.action}`;
                    navigate(target);
                  }}
                >
                  Continue to Booking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setShowResult(false);
                    setCurrentStep(1);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: user?.email || "",
                      phone: "",
                      dateOfBirth: "",
                      homeCountry: "",
                      isCitizen: "",
                      yearsOfExperience: "",
                      hasJobOffer: "",
                      educationLevel: "",
                      englishLevel: "",
                      preferredCountry: "Canada",
                      immigrationGoal: "",
                      timeline: "",
                      additionalInfo: "",
                    });
                  }}
                >
                  Retake Assessment
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                This is a preliminary assessment. A consultation with our RCIC will provide a detailed evaluation.
              </p>
            </div>
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-background text-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Free Eligibility Assessment
            </h1>
            <p className="text-lg text-muted-foreground">
              Answer a few questions to discover your best immigration options.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 ${step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.id <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {step.id}
                    </div>
                    <span className="hidden sm:inline text-sm">{step.title}</span>
                  </div>
                ))}
              </div>
              <Progress value={(currentStep / 4) * 100} className="h-2" />
            </div>

            <Card className="border-border">
              <CardContent className="p-6 md:p-8">
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Background */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Your Background</h2>
                    <div className="space-y-2">
                      <Label>Home Country *</Label>
                      <Select
                        value={formData.homeCountry}
                        onValueChange={(value) => updateFormData("homeCountry", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country.toLowerCase()}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Are you a citizen of your home country?</Label>
                      <RadioGroup
                        value={formData.isCitizen}
                        onValueChange={(value) => updateFormData("isCitizen", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="citizen-yes" />
                          <Label htmlFor="citizen-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="citizen-no" />
                          <Label htmlFor="citizen-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {/* Step 3: Education & Work */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Education & Work Experience</h2>
                    <div className="space-y-2">
                      <Label>Highest Education Level *</Label>
                      <Select
                        value={formData.educationLevel}
                        onValueChange={(value) => updateFormData("educationLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highschool">High School</SelectItem>
                          <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD/Doctorate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Years of Work Experience *</Label>
                      <Select
                        value={formData.yearsOfExperience}
                        onValueChange={(value) => updateFormData("yearsOfExperience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Less than 1 year</SelectItem>
                          <SelectItem value="1">1-2 years</SelectItem>
                          <SelectItem value="3">3-5 years</SelectItem>
                          <SelectItem value="6">6-10 years</SelectItem>
                          <SelectItem value="10">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Do you have a job offer from a Canadian employer?</Label>
                      <RadioGroup
                        value={formData.hasJobOffer}
                        onValueChange={(value) => updateFormData("hasJobOffer", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="job-yes" />
                          <Label htmlFor="job-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="job-no" />
                          <Label htmlFor="job-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>English Proficiency Level *</Label>
                      <Select
                        value={formData.englishLevel}
                        onValueChange={(value) => updateFormData("englishLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="fluent">Fluent/Native</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 4: Immigration Goals */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Immigration Goals</h2>
                    <div className="space-y-2">
                      <Label>What is your primary immigration goal? *</Label>
                      <Select
                        value={formData.immigrationGoal}
                        onValueChange={(value) => updateFormData("immigrationGoal", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent-residence">Permanent Residence</SelectItem>
                          <SelectItem value="work-permit">Work Permit</SelectItem>
                          <SelectItem value="study-permit">Study Permit</SelectItem>
                          <SelectItem value="visitor-visa">Visitor Visa</SelectItem>
                          <SelectItem value="family-sponsorship">Family Sponsorship</SelectItem>
                          <SelectItem value="business-immigration">Business Immigration</SelectItem>
                          <SelectItem value="citizenship">Canadian Citizenship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>When do you plan to immigrate? *</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => updateFormData("timeline", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">As soon as possible</SelectItem>
                          <SelectItem value="3-6months">Within 3-6 months</SelectItem>
                          <SelectItem value="6-12months">Within 6-12 months</SelectItem>
                          <SelectItem value="1-2years">Within 1-2 years</SelectItem>
                          <SelectItem value="exploring">Just exploring options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Share any additional details about your situation..."
                        value={formData.additionalInfo}
                        onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    onClick={handleNext}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : currentStep === 4 ? (
                      <>
                        Submit
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default EligibilityAssessment;
