import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, ExternalLink, HelpCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent } from "@/components/ui/card";

// Custom toolbar options
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
    ],
};

const BlogEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditing = !!id && id !== "new";

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);
    const [uploading, setUploading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

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

    const handleSlugBlur = () => {
        if (!formData.slug && formData.title) {
            setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setUploading(true);

        try {
            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
            toast({ title: "Success", description: "Image uploaded successfully" });
        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to upload image",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSave = {
                ...formData,
                slug: formData.slug || generateSlug(formData.title)
            };

            if (isEditing) {
                const { error } = await supabase
                    .from("blogs")
                    .update(dataToSave)
                    .eq("id", id);

                if (error) throw error;
                toast({ title: "Success", description: "Blog post updated successfully" });
            } else {
                const { error } = await supabase
                    .from("blogs")
                    .insert([dataToSave]);

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

    if (previewMode) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8 sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={() => setPreviewMode(false)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Editor
                        </Button>
                        <h2 className="text-xl font-bold text-muted-foreground">Preview Mode</h2>
                    </div>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Publish / Save
                    </Button>
                </div>

                <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
                    {/* Mock Header */}
                    <div className="relative h-[400px] w-full overflow-hidden">
                        <img
                            src={formData.image_url || '/placeholder.svg'}
                            alt={formData.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide max-w-4xl">
                                {formData.title || "Blog Title"}
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 max-w-3xl mx-auto">
                        <div
                            className="prose prose-lg prose-slate max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: formData.content }} // Safe here as it's from current user editor
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/admin/blogs">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isEditing ? "Edit Blog Post" : "Create New Post"}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setPreviewMode(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Save Post
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Editor */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-lg">Post Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Enter an engaging title..."
                                className="text-lg font-medium p-6"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <div className="prose-editor">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                    modules={modules}
                                    className="h-[500px] mb-12 bg-background"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Sidebar Settings */}
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Publishing</h3>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="published"
                                        checked={formData.published}
                                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
                                    />
                                    <Label htmlFor="published">Publish immediately</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h3 className="font-semibold text-lg">Post Settings</h3>

                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="slug">URL Slug</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-xs">The "slug" is the part of the URL that identifies this post. It's usually a lowercase version of the title with dashes. You can leave this blank to auto-generate it.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    onBlur={handleSlugBlur}
                                    placeholder="my-blog-post"
                                />
                                <p className="text-xs text-muted-foreground">Leave blank to auto-generate from title.</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image_url">Header Image</Label>

                                {formData.image_url ? (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-md border text-center group">
                                        <img src={formData.image_url} alt="Preview" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="secondary" size="sm" onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}>
                                                Remove Image
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 transition-colors">
                                        <ImageIcon className="h-8 w-8" />
                                        <span className="text-sm">No image selected</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mt-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <Label htmlFor="image-upload" className="w-full">
                                        <Button variant="outline" className="w-full" asChild disabled={uploading}>
                                            <span>
                                                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                                                {uploading ? "Uploading..." : "Upload Image"}
                                            </span>
                                        </Button>
                                    </Label>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">Or use URL</span>
                                    </div>
                                </div>
                                <Input
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
