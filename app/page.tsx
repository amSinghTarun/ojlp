import type { Metadata } from "next"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { getLatestIssue, getArticlesByIssue } from "@/lib/journal-data"
import { constructMetadata } from "@/lib/metadata"
import Image from "next/image"

export const metadata: Metadata = constructMetadata({
  title: "Open Journal of Law & Policy - Law and Constitution Blog",
  description: "Expert analysis and commentary on legal developments, constitutional law, and judicial decisions.",
  pathname: "/",
})

export default function Home() {
  // Get the latest journal issue
  const latestIssue = getLatestIssue()
  // Get articles from the latest issue
  const latestIssueArticles = getArticlesByIssue(latestIssue.volume, latestIssue.issue)

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="container px-4 pt-10 pb-5 md:px-6">
          {/* <ScrollReveal threshold={0.2} delay={200}> */}
            <div className="">
              <div className="flex items-center justify-center flex-col">
                <Image
                  src="/logo.png"
                  alt="Open Journal of Law & Policy"
                  height={120}
                  width={120}
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <div className="font-heading font-semibold text-2xl tracking-tight">Open Journal of Law & Policy</div>
                <DecorativeHeading>A Peer-Reviewed Forum for Critical Legal Scholarship and Interdisciplinary Dialogue</DecorativeHeading>
              </div>
            </div>
          {/* </ScrollReveal> */}
        </section>

        {/* Journal Description Section */}
        <section className="container px-4 ">
          <ScrollReveal threshold={0.2} delay={300}>
            <div className="max-w-4xl mx-auto">
              <div className=" p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-6 text-gray-800 leading-relaxed">
                  <p className="text-justify">
                    <strong>Open Journal of Law & Policy (OJLP)</strong> is an independent, peer-reviewed, open-access journal 
                    dedicated to publishing rigorous and interdisciplinary scholarship on contemporary issues in law, 
                    governance, and public policy. The journal aims to foster dialogue across legal academia, policy 
                    research, and practice by providing a platform for work that is analytically strong, accessible, and 
                    socially relevant.
                  </p>

                  <p className="text-justify">
                    OJLP welcomes contributions from scholars, practitioners, and students across a broad range of 
                    themes, including but not limited to constitutional reform, technology regulation, digital rights, 
                    environmental governance, administrative law, and global policy frameworks.
                  </p>

                  <p className="text-justify">
                    The journal is committed to open access, transparent editorial practices, and timely peer review. All 
                    accepted articles will be freely available to readers worldwide.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-2 flex flex-col">
                    <span className="text-justify">
                      <strong>Please note:</strong> Our full website is currently under development and will be launched soon. In the 
                      meantime, basic submission and contact information will be provided through this temporary page. 
                      We appreciate your interest and support.
                    </span>
                  </div>

                  <p className="text-center"><strong> Kindly write to us at: <a className="underline" href="mailto:editor@ojlp.in">editor@ojlp.in</a></strong></p>
                  {/* Call to Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Link 
                      href="https://drive.google.com/file/d/1azI-bx3Q2CxkLQishC1gG81roGkPOQ6R/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
                        Call For Paper
                      </button>
                    </Link>

                    <Link 
                      href="https://forms.gle/wLLxP57eGbV27NUF6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
                        Paper Submission
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>
    </div>
  )
}