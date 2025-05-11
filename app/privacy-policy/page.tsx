import { Navigation } from "@/components/navigation"
import { DecorativeHeading } from "@/components/decorative-heading"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <DecorativeHeading level="h1" className="text-3xl md:text-4xl mb-8">
          Privacy Policy
        </DecorativeHeading>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            This Privacy Policy page is under construction. Please check back later for our complete privacy policy.
          </p>
        </div>
      </div>
    </>
  )
}
