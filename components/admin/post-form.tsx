"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { MediaSelector } from "@/components/admin/media-selector"
import { AuthorSelector } from "@/components/admin/author-selector"
import type { Article, Author } from "@/lib/types"
import Image from "next/image"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  slug: z
    .string()
    .min(5, {
      message: "Slug must be at least 5 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  excerpt: z
    .string()
    .min(10, {
      message: "Excerpt must be at least 10 characters.",
    })
    .max(200, {
      message: "Excerpt must not exceed 200 characters.",
    }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  // Remove single author field and add authors array
  authors: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        slug: z.string(),
        email: z.string().email(),
      }),
    )
    .min(1, {
      message: "At least one author is required.",
    }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  readTime: z.coerce.number().min(1, {
    message: "Read time must be at least 1 minute.",
  }),
  image: z.string().min(1, {
    message: "Please select a featured image.",
  }),
  images: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
})

interface PostFormProps {
  post?: Article
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>(post?.image || "")
  const [articleImages, setArticleImages] = useState<string[]>(post?.images || [])
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>(
    post?.authors || (post?.author ? [{ name: post.author, slug: post.authorSlug || "", email: "" }] : []),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      authors: post?.authors || (post?.author ? [{ name: post.author, slug: post.authorSlug || "", email: "" }] : []),
      category: "constitutional-law", // Default category
      date: post?.date ? new Date(post.date) : new Date(),
      readTime: post?.readTime || 5,
      image: post?.image || "",
      draft: false,
      images: post?.images || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // In a real application, you would save the post to your database
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: post ? "Post updated" : "Post created",
        description: `"${values.title}" has been ${post ? "updated" : "created"} successfully.`,
      })

      router.push("/admin/posts")
    }, 1500)
  }

  function handleImageSelect(url: string) {
    setSelectedImage(url)
    form.setValue("image", url)
  }

  function generateSlug(title: string) {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    form.setValue("slug", slug)
  }

  function handleContentImageInsert(url: string) {
    if (!articleImages.includes(url)) {
      const newImages = [...articleImages, url]
      setArticleImages(newImages)
      form.setValue("images", newImages)
    }
  }

  function handleAddAuthor(author: Author) {
    // Check if author already exists in the list
    if (!selectedAuthors.some((a) => a.slug === author.slug)) {
      const newAuthors = [...selectedAuthors, author]
      setSelectedAuthors(newAuthors)
      form.setValue("authors", newAuthors)
    }
  }

  function handleRemoveAuthor(authorSlug: string) {
    const newAuthors = selectedAuthors.filter((author) => author.slug !== authorSlug)
    setSelectedAuthors(newAuthors)
    form.setValue("authors", newAuthors)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (!post && !form.getValues("slug")) {
                          generateSlug(e.target.value)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-post-slug" {...field} />
                  </FormControl>
                  <FormDescription>The URL-friendly version of the title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary of the post" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>A short summary that appears in post listings.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authors"
              render={() => (
                <FormItem>
                  <FormLabel>Authors</FormLabel>
                  <div className="space-y-4">
                    {/* Display selected authors */}
                    <div className="flex flex-wrap gap-2">
                      {selectedAuthors.map((author) => (
                        <div
                          key={author.slug}
                          className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                        >
                          <span>{author.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAuthor(author.slug)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Author selector */}
                    <div className="flex items-center gap-2">
                      <AuthorSelector onSelect={handleAddAuthor} selectedAuthor={null} />
                    </div>

                    <FormDescription>
                      Add one or more authors to this post. The first author will be considered the primary author for
                      citation purposes.
                    </FormDescription>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="constitutional-law">Constitutional Law</SelectItem>
                        <SelectItem value="case-studies">Case Studies</SelectItem>
                        <SelectItem value="legal-analysis">Legal Analysis</SelectItem>
                        <SelectItem value="judicial-decisions">Judicial Decisions</SelectItem>
                        <SelectItem value="legal-history">Legal History</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Publication Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="draft"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Save as Draft</FormLabel>
                    <FormDescription>This post will not be published until you uncheck this option.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <MediaSelector onSelect={handleImageSelect} selectedImage={selectedImage} />
                      <Input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <Tabs defaultValue="editor">
                <TabsList className="mb-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      onImageInsert={handleContentImageInsert}
                    />
                  </FormControl>
                </TabsContent>
                <TabsContent value="preview">
                  <Card>
                    <CardContent className="prose prose-slate dark:prose-invert max-w-none p-6">
                      <div dangerouslySetInnerHTML={{ __html: field.value }} className="article-preview" />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Article Images</h3>
          {articleImages.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {articleImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video relative overflow-hidden rounded-md border">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Article image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newImages = articleImages.filter((_, i) => i !== index)
                      setArticleImages(newImages)
                      form.setValue("images", newImages)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No additional images in this article. Insert images using the image button in the editor toolbar.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {post ? "Update" : "Create"} Post
          </Button>
        </div>
      </form>
    </Form>
  )
}
