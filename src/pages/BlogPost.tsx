import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import logo from "@/assets/logo-transparent.png";

type Blog = Database["public"]["Tables"]["blogs"]["Row"];

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchBlog(slug);
        }
    }, [slug]);

    const fetchBlog = async (slug: string) => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("slug", slug)
                .single();

            if (error) throw error;
            setBlog(data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AppShell>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </AppShell>
        );
    }

    if (!blog) {
        return (
            <AppShell>
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
                    <Link to="/blog">
                        <Button>Back to Blog</Button>
                    </Link>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            {/* Header */}
            <div className="relative h-[400px] w-full overflow-hidden">
// Header image logic moved to implementation
                <img
                    src={blog.image_url || logo}
                    alt={blog.title}
                    className={`w-full h-full object-cover ${!blog.image_url ? "object-contain p-12 opacity-20 bg-muted" : ""}`}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = logo;
                        target.className = "w-full h-full object-contain p-12 opacity-20 bg-muted";
                    }}
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide max-w-4xl">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-2 text-white/80 mt-4">
                        <Calendar className="h-5 w-5" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <article className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </Link>

                    <div
                        className="prose prose-lg prose-slate max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>
        </AppShell>
    );
};

export default BlogPost;
