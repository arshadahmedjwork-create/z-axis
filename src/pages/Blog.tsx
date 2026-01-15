import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import blogHeader from "@/assets/blog-header.png";
import logo from "@/assets/logo-transparent.png";

type Blog = Database["public"]["Tables"]["blogs"]["Row"];

const Blog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("published", true)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setBlogs(data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <AppShell>
            {/* Header */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    src={blogHeader}
                    alt="Blog"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                        Our Blog
                    </h1>
                </div>
            </div>

            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No articles found. Check back soon!
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <Link key={blog.id} to={`/blog/${blog.slug}`} className="group h-full">
                                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                                        <div className="h-48 overflow-hidden bg-muted flex items-center justify-center">
                                            <img
                                                src={blog.image_url || logo}
                                                alt={blog.title}
                                                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${!blog.image_url ? "object-contain p-8 opacity-50" : ""}`}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = logo;
                                                    target.className = "w-full h-full object-contain p-8 opacity-50 group-hover:scale-105 transition-transform duration-300";
                                                }}
                                            />
                                        </div>
                                        <CardHeader className="p-4 md:p-6 pb-2">
                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                        </CardHeader>
                                        <CardContent className="p-4 md:p-6 pt-0 flex-grow">
                                            <p className="text-muted-foreground line-clamp-3">
                                                {stripHtml(blog.content).substring(0, 150)}...
                                            </p>
                                        </CardContent>
                                        <CardFooter className="p-4 md:p-6 pt-0 text-sm text-muted-foreground flex items-center gap-4 mt-auto">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                Admin
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppShell>
    );
};

export default Blog;
