import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BlogEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditing = !!id && id !== "new";

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        image_url: "",
        content: "",
        published: false,
    });

    useEffect(() => {
        if (isEditing) {
            fetchBlog(id);
        }
    }, [id, isEditing]);

    const fetchBlog = async (blogId: string) => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("id", blogId)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    image_url: data.image_url,
                    content: data.content,
                    published: data.published,
                });
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
            toast({
                title: "Error",
                description: "Failed to load blog post",
                variant: "destructive",
            });
            navigate("/admin/blogs");
        } finally {
            setInitialLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        // Only auto-update slug if creating new
        if (!isEditing && !formData.slug) {
            setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
        } else {
            setFormData(prev => ({ ...prev, title }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from("blogs")
                    .update(formData)
                    .eq("id", id);

                if (error) throw error;
                toast({ title: "Success", description: "Blog post updated successfully" });
            } else {
                const { error } = await supabase
                    .from("blogs")
                    .insert([formData]);

                if (error) throw error;
                toast({ title: "Success", description: "Blog post created successfully" });
                navigate("/admin/blogs");
            }
        } catch (error: any) {
            console.error("Error saving blog:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to save blog post",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/blogs">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">
                    {isEditing ? "Edit Blog Post" : "Create New Post"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 rounded-lg border">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="enter-blog-slug"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image_url">Header Image URL</Label>
                        <div className="flex gap-2">
                            <Input
                                id="image_url"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        {formData.image_url && (
                            <div className="mt-2 h-40 w-full overflow-hidden rounded-md border text-center">
                                <img src={formData.image_url} alt="Preview" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog content here..."
                            className="min-h-[300px] font-mono"
                            required
                        />
                        <p className="text-sm text-muted-foreground">Markdown formatting is supported (basic).</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="published"
                            checked={formData.published}
                            onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
                        />
                        <Label htmlFor="published">Publish this post</Label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link to="/admin/blogs">
                        <Button variant="ghost" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? "Update Post" : "Create Post"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BlogEditor;
