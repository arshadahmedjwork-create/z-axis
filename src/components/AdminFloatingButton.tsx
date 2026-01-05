import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";

const AdminFloatingButton = () => {
  const { isAdmin, loading } = useAdmin();

  if (loading || !isAdmin) return null;

  return (
    <Link to="/admin" className="fixed bottom-6 right-6 z-50">
      <Button 
        variant="outline" 
        size="sm"
        className="shadow-lg bg-background border-border hover:bg-muted"
      >
        <Shield className="h-4 w-4 mr-2" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminFloatingButton;
