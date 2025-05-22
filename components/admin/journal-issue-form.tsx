"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast"
import { MediaSelector } from "@/components/admin/media-selector"
import { articles } from "@/lib/data"
import { Checkbox } from "@/components/ui/checkbox"
import type { JournalIssue } from "@/lib/types"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  volume: z.coerce.number().min(1, {
    message: "Volume must be at least 1.",
  }),
  issue: z.coerce.number().min(1, {
    message: "Issue must be at least 1.",
  }),
  year: z.coerce.number().min(2000, {
    message: "Year must be at least 2000.",
  }),
  publishDate: z.date({
    required_error: "Please select a publication date.",
  }),
  coverImage: z.string().min(1, {
    message: "Please select a cover image.",
  }),
  articles: z.array(z.string()).min(1, {
    message: "Please select at least one article.",
  }),
})

interface JournalIssueFormProps {
  issue?: JournalIssue
}

export function JournalIssueForm({ issue }: JournalIssueFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>(issue?.coverImage || "")

  // Filter articles that are of type "journal"
  const journalArticles = articles.filter((article) => article.type === "journal")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
      volume: issue?.volume || 1,
      issue: issue?.issue || 1,
      year: issue?.year || new Date().getFullYear(),
      publishDate: issue?.publishDate ? new Date(issue.publishDate) : new Date(),
      coverImage: issue?.coverImage || "",
      articles: issue?.articles || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // In a real application, you would save the journal issue to your database
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: issue ? "Journal issue updated" : "Journal issue created",
        description: `"${values.title}" has been ${issue ? "updated" : "created"} successfully.`,
      })

      router.push("/admin/journals")
    }, 1500)
  }

  function handleImageSelect(url: string) {
    setSelectedImage(url)
    form.setValue("coverImage", url)
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
                    <Input placeholder="Enter issue title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the issue" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" min={2000} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="publishDate"
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
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <MediaSelector onSelect={handleImageSelect} selectedImage={selectedImage} />
                      <Input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Select a cover image for the journal issue.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="articles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Articles</FormLabel>
                <FormDescription>Select the articles to include in this journal issue.</FormDescription>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {journalArticles.map((article) => (
                  <FormField
                    key={article.slug}
                    control={form.control}
                    name="articles"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={article.slug}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(article.slug)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, article.slug])
                                  : field.onChange(field.value?.filter((value) => value !== article.slug))
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">{article.title}</FormLabel>
                            <FormDescription>
                              By {article.author} • {article.date}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/journals")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {issue ? "Update" : "Create"} Journal Issue
          </Button>
        </div>
      </form>
    </Form>
  )
}
