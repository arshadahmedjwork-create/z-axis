import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, DollarSign, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  user_id: string;
  service_type: string;
  amount_cents: number;
  currency: string;
  payment_status: string;
  scheduled_at: string | null;
  created_at: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatAmount = (cents: number, currency: string) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currency,
    }).format(cents / 100);
  };

  const totalRevenue = bookings
    .filter((b) => b.payment_status === "completed")
    .reduce((sum, b) => sum + b.amount_cents, 0);

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
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage consultation bookings and payments</p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{bookings.length}</span>
              <span className="text-muted-foreground">Total</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{formatAmount(totalRevenue, "CAD")}</span>
              <span className="text-muted-foreground">Revenue</span>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No bookings yet</p>
              <p className="text-sm text-muted-foreground">
                Bookings will appear here when users complete payments
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium capitalize">
                      {booking.service_type.replace(/-/g, " ")}
                    </TableCell>
                    <TableCell>{formatAmount(booking.amount_cents, booking.currency)}</TableCell>
                    <TableCell>{getStatusBadge(booking.payment_status)}</TableCell>
                    <TableCell>
                      {booking.scheduled_at
                        ? format(new Date(booking.scheduled_at), "MMM d, yyyy h:mm a")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.created_at), "MMM d, yyyy")}
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

export default AdminBookings;
