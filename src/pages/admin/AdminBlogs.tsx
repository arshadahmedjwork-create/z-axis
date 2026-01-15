import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Blog = Database["public"]["Tables"]["blogs"]["Row"];

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setBlogs(data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast({
                title: "Error",
                description: "Failed to fetch blogs",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("blogs").delete().eq("id", id);
            if (error) throw error;

            setBlogs(blogs.filter((blog) => blog.id !== id));
            toast({
                title: "Success",
                description: "Blog post deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast({
                title: "Error",
                description: "Failed to delete blog post",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                <Link to="/admin/blogs/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No blog posts found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            blogs.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="font-medium">{blog.title}</TableCell>
                                    <TableCell className="text-muted-foreground">{blog.slug}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${blog.published
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                }`}
                                        >
                                            {blog.published ? "Published" : "Draft"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <Link to={`/blog/${blog.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" title="View Public Page">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link to={`/admin/blogs/${blog.id}`}>
                                                <Button variant="ghost" size="icon" title="Edit">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the blog post "{blog.title}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(blog.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminBlogs;
