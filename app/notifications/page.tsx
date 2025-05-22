import Link from "next/link"
import { Scale } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notifications } from "@/lib/notifications"
import { Footer } from "@/components/footer"
import { NotificationCard } from "@/components/notification-card"

export default function NotificationsPage() {
  // Group notifications by type
  const callForPapers = notifications.filter((n) => n.type === "call-for-papers")
  const studentCompetitions = notifications.filter((n) => n.type === "student-competition")
  const editorialVacancies = notifications.filter((n) => n.type === "editorial-vacancy")
  const specialIssues = notifications.filter((n) => n.type === "special-issue")
  const otherNotifications = notifications.filter(
    (n) => !["call-for-papers", "student-competition", "editorial-vacancy", "special-issue"].includes(n.type),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8 animate-slide-up">
            <DecorativeHeading level={1}>Notifications</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Stay updated with the latest events, calls for papers, and announcements.
            </p>
          </div>

          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cfp">Call for Papers</TabsTrigger>
              <TabsTrigger value="competitions">Student Competitions</TabsTrigger>
              <TabsTrigger value="vacancies">Editorial Vacancies</TabsTrigger>
              <TabsTrigger value="special">Special Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {callForPapers.length > 0 && (
                <ScrollReveal>
                  <div className="space-y-4">
                    <div className="border-t border-border my-4"></div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {callForPapers.map((notification, index) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          index={index}
                          unread={!notification.read}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {studentCompetitions.length > 0 && (
                <ScrollReveal>
                  <div className="space-y-4">
                    <div className="border-t border-border my-4"></div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {studentCompetitions.map((notification, index) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          index={index}
                          unread={!notification.read}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {editorialVacancies.length > 0 && (
                <ScrollReveal>
                  <div className="space-y-4">
                    <div className="border-t border-border my-4"></div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {editorialVacancies.map((notification, index) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          index={index}
                          unread={!notification.read}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {specialIssues.length > 0 && (
                <ScrollReveal>
                  <div className="space-y-4">
                    <div className="border-t border-border my-4"></div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {specialIssues.map((notification, index) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          index={index}
                          unread={!notification.read}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {otherNotifications.length > 0 && (
                <ScrollReveal>
                  <div className="space-y-4">
                    <div className="border-t border-border my-4"></div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {otherNotifications.map((notification, index) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          index={index}
                          unread={!notification.read}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </TabsContent>

            <TabsContent value="cfp" className="space-y-4">
              <div className="border-t border-border my-4"></div>
              {callForPapers.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {callForPapers.map((notification, index) => (
                    <ScrollReveal key={notification.id} delay={index * 100}>
                      <NotificationCard notification={notification} index={index} unread={!notification.read} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No call for papers at this time.</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="competitions" className="space-y-4">
              <div className="border-t border-border my-4"></div>
              {studentCompetitions.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {studentCompetitions.map((notification, index) => (
                    <ScrollReveal key={notification.id} delay={index * 100}>
                      <NotificationCard notification={notification} index={index} unread={!notification.read} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No student competitions at this time.</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="vacancies" className="space-y-4">
              <div className="border-t border-border my-4"></div>
              {editorialVacancies.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {editorialVacancies.map((notification, index) => (
                    <ScrollReveal key={notification.id} delay={index * 100}>
                      <NotificationCard notification={notification} index={index} unread={!notification.read} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No editorial vacancies at this time.</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="special" className="space-y-4">
              <div className="border-t border-border my-4"></div>
              {specialIssues.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {specialIssues.map((notification, index) => (
                    <ScrollReveal key={notification.id} delay={index * 100}>
                      <NotificationCard notification={notification} index={index} unread={!notification.read} />
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No special issues or symposia at this time.</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
