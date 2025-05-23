"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { MediaSelector } from "@/components/admin/media-selector"
import type { Author } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  title: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  education: z.array(z.string()).optional(),
  socialLinks: z
    .object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  userId: z.string().optional(),
})

interface AuthorFormProps {
  author?: Author
}

export function AuthorForm({ author }: AuthorFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>(author?.image || "")
  const [expertiseInput, setExpertiseInput] = useState("")
  const [educationInput, setEducationInput] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: author?.name || "",
      email: author?.email || "",
      slug: author?.slug || "",
      title: author?.title || "",
      bio: author?.bio || "",
      image: author?.image || "",
      expertise: author?.expertise || [],
      education: author?.education || [],
      socialLinks: {
        twitter: author?.socialLinks?.twitter || "",
        linkedin: author?.socialLinks?.linkedin || "",
        email: author?.socialLinks?.email || "",
      },
      userId: author?.userId || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // In a real application, you would save the author to your database
    // and handle the user ID linking
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: author ? "Author updated" : "Author created",
        description: `"${values.name}" has been ${author ? "updated" : "created"} successfully.`,
      })

      router.push("/admin/authors")
    }, 1500)
  }

  function handleImageSelect(url: string) {
    setSelectedImage(url)
    form.setValue("image", url)
  }

  function handleImageDelete() {
    setSelectedImage("")
    form.setValue("image", "")
    toast({
      title: "Image removed",
      description: "The profile image has been removed.",
    })
  }

  function generateSlug(name: string) {
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    form.setValue("slug", slug)
  }

  function addExpertise() {
    if (expertiseInput.trim()) {
      const currentExpertise = form.getValues("expertise") || []
      form.setValue("expertise", [...currentExpertise, expertiseInput.trim()])
      setExpertiseInput("")
    }
  }

  function removeExpertise(index: number) {
    const currentExpertise = form.getValues("expertise") || []
    form.setValue(
      "expertise",
      currentExpertise.filter((_, i) => i !== index),
    )
  }

  function addEducation() {
    if (educationInput.trim()) {
      const currentEducation = form.getValues("education") || []
      form.setValue("education", [...currentEducation, educationInput.trim()])
      setEducationInput("")
    }
  }

  function removeEducation(index: number) {
    const currentEducation = form.getValues("education") || []
    form.setValue(
      "education",
      currentEducation.filter((_, i) => i !== index),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author name"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (!author && !form.getValues("slug")) {
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input placeholder="author@example.com" type="email" {...field} />
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
                    <Input placeholder="author-name" {...field} />
                  </FormControl>
                  <FormDescription>The URL-friendly version of the name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Constitutional Law Professor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Author biography and background"
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="User ID (optional)" {...field} />
                  </FormControl>
                  <FormDescription>Link this author to a user account (optional).</FormDescription>
                  <FormMessage />
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
                  <FormLabel>Profile Image (optional)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2">
                        <MediaSelector onSelect={handleImageSelect} selectedImage={selectedImage} />
                        {selectedImage && (
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={handleImageDelete}
                              className="flex items-center gap-1"
                            >
                              <Trash className="h-4 w-4" />
                              <span>Remove Image</span>
                            </Button>
                          </div>
                        )}
                      </div>
                      <Input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Upload a profile image for the author (optional).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="font-medium text-sm">Areas of Expertise (optional)</div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add area of expertise"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                />
                <Button type="button" onClick={addExpertise} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.getValues("expertise")?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeExpertise(index)}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-medium text-sm">Education (optional)</div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add education"
                  value={educationInput}
                  onChange={(e) => setEducationInput(e.target.value)}
                />
                <Button type="button" onClick={addEducation} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.getValues("education")?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-medium text-sm">Social Links (optional)</div>

              <FormField
                control={form.control}
                name="socialLinks.twitter"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Twitter</div>
                      <FormControl>
                        <Input placeholder="https://twitter.com/username" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLinks.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">LinkedIn</div>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLinks.email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Email</div>
                      <FormControl>
                        <Input placeholder="public@example.com" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/authors")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {author ? "Update" : "Create"} Author
          </Button>
        </div>
      </form>
    </Form>
  )
}
