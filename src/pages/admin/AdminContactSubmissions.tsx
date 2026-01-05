import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    created_at: string;
}

const AdminContactSubmissions = () => {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const { data, error } = await (supabase
                .from("contact_submissions" as any)
                .select("*")
                .order("created_at", { ascending: false })) as any;

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSubmission = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const { error } = await (supabase
                .from("contact_submissions" as any)
                .delete()
                .eq("id", id)) as any;

            if (error) throw error;
            setSubmissions((prev) => prev.filter((s) => s.id !== id));
        } catch (error) {
            console.error("Error deleting submission:", error);
            alert("Failed to delete message");
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
                    <h1 className="text-2xl font-bold">Contact Submissions</h1>
                    <p className="text-muted-foreground">View and manage contact form messages</p>
                </div>
                <Card className="p-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold">{submissions.length}</span>
                        <span className="text-muted-foreground">Total</span>
                    </div>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    {submissions.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No messages yet</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead className="w-1/3">Message</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {submissions.map((submission) => (
                                    <TableRow key={submission.id}>
                                        <TableCell className="whitespace-nowrap">
                                            {format(new Date(submission.created_at), "MMM d, HH:mm")}
                                        </TableCell>
                                        <TableCell className="font-medium">{submission.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm">
                                                <span>{submission.email}</span>
                                                {submission.phone && <span className="text-muted-foreground">{submission.phone}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="line-clamp-2" title={submission.message}>
                                                {submission.message}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={submission.status === 'unread' ? 'default' : 'secondary'}>
                                                {submission.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteSubmission(submission.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminContactSubmissions;
