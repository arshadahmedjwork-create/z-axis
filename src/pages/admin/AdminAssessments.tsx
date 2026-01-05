import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ClipboardCheck, Eye } from "lucide-react";
import { format } from "date-fns";

interface Assessment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  home_country: string | null;
  is_citizen: boolean | null;
  education_level: string | null;
  years_of_experience: number | null;
  has_job_offer: boolean | null;
  english_level: string | null;
  preferred_country: string | null;
  immigration_goal: string | null;
  timeline: string | null;
  additional_info: string | null;
  urgency: string;
  recommended_service: string;
  created_at: string;
}

const AdminAssessments = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return <Badge className="bg-primary">Immediate</Badge>;
      case "strong":
        return <Badge variant="secondary">Strong</Badge>;
      default:
        return <Badge variant="outline">Strengthen</Badge>;
    }
  };

  const deleteAssessment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assessment?")) return;

    try {
      const { error } = await supabase
        .from("assessments")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setAssessments((prev) => prev.filter((a) => a.id !== id));
      if (selectedAssessment?.id === id) setSelectedAssessment(null);
    } catch (error) {
      console.error("Error deleting assessment:", error);
      alert("Failed to delete assessment");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">View all eligibility assessments</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{assessments.length}</span>
            <span className="text-muted-foreground">Total</span>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No assessments yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Recommended</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell className="font-medium">
                      {assessment.first_name} {assessment.last_name}
                    </TableCell>
                    <TableCell>{assessment.email}</TableCell>
                    <TableCell className="capitalize">{assessment.home_country || "-"}</TableCell>
                    <TableCell className="capitalize">
                      {assessment.immigration_goal?.replace(/-/g, " ") || "-"}
                    </TableCell>
                    <TableCell>{getUrgencyBadge(assessment.urgency)}</TableCell>
                    <TableCell className="capitalize">
                      {assessment.recommended_service?.replace(/-/g, " ")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(assessment.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAssessment(assessment)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteAssessment(assessment.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedAssessment} onOpenChange={(open) => !open && setSelectedAssessment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedAssessment && format(new Date(selectedAssessment.created_at), "PPP p")}
            </DialogDescription>
          </DialogHeader>

          {selectedAssessment && (
            <ScrollArea className="max-h-[80vh] pr-4">
              <div className="grid gap-6 py-4">
                {/* Section 1: Personal Info */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Full Name</span>
                      <span className="font-medium">{selectedAssessment.first_name} {selectedAssessment.last_name}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Email</span>
                      <span className="font-medium">{selectedAssessment.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Phone</span>
                      <span className="font-medium">{selectedAssessment.phone || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Date of Birth</span>
                      <span className="font-medium">{selectedAssessment.date_of_birth || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Home Country</span>
                      <span className="font-medium capitalize">{selectedAssessment.home_country || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Citizen?</span>
                      <span className="font-medium">{selectedAssessment.is_citizen ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Section 2: Profle */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Professional Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Education Level</span>
                      <span className="font-medium capitalize">{selectedAssessment.education_level || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Experience (Years)</span>
                      <span className="font-medium">{selectedAssessment.years_of_experience || "0"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">English Level</span>
                      <span className="font-medium capitalize">{selectedAssessment.english_level || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Has Job Offer?</span>
                      <span className="font-medium">{selectedAssessment.has_job_offer ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Section 3: Goals */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Immigration Goals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Primary Goal</span>
                      <span className="font-medium capitalize">{selectedAssessment.immigration_goal?.replace(/-/g, " ") || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Timeline</span>
                      <span className="font-medium capitalize">{selectedAssessment.timeline?.replace(/-/g, " ") || "-"}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Preferred Country</span>
                      <span className="font-medium">{selectedAssessment.preferred_country || "Canada"}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground block mb-1">Additional Information</span>
                    <p className="text-sm bg-muted p-3 rounded-md min-h-[60px]">
                      {selectedAssessment.additional_info || "No additional information provided."}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Section 4: System Result */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">System Recommendation</h3>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Urgency</span>
                      <div className="mt-1">{getUrgencyBadge(selectedAssessment.urgency)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Recommended Service</span>
                      <span className="font-medium capitalize mt-1">{selectedAssessment.recommended_service?.replace(/-/g, " ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAssessments;
