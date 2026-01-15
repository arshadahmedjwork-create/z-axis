import { useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Shield, Users, CreditCard, ClipboardCheck, LogOut, Home, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";

const navItems = [
  { title: "Assessments", path: "/admin/assessments", icon: ClipboardCheck },
  { title: "Bookings", path: "/admin/bookings", icon: CreditCard },
  { title: "Blogs", path: "/admin/blogs", icon: FileText },
  { title: "Messages", path: "/admin/contacts", icon: Mail },
  { title: "Users", path: "/admin/users", icon: Users },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin, loading } = useAdmin();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Z-Axis Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <nav className="flex gap-2 mb-8 border-b border-border pb-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={isActive ? "" : "text-muted-foreground"}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
