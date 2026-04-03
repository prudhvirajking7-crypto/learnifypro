import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Star, Users, Clock, BookOpen, Globe, Award, Play, CheckCircle, ChevronDown, Lock } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import EnrollButton from "@/components/courses/enroll-button";

async function getCourse(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/courses/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | LearnifyPro`,
    description: course.shortDescription || course.description?.slice(0, 160),
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const course = await getCourse(params.slug);
  if (!course) notFound();

  const discountPercent = course.discountPrice && course.price > 0
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;

  const totalLectures = course.sections?.reduce((sum: number, s: any) => sum + s.lectures.length, 0) || 0;

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            {course.category && (
              <span className="text-purple-400 text-sm font-medium mb-3 block">{course.category.name}</span>
            )}
            <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
            {course.shortDescription && (
              <p className="text-gray-300 text-lg mb-4">{course.shortDescription}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 font-bold">{(course.averageRating || 0).toFixed(1)}</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.round(course.averageRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">({course._count?.reviews || 0} ratings)</span>
              </div>
              <span className="flex items-center gap-1 text-gray-300 text-sm">
                <Users className="w-4 h-4" /> {(course._count?.enrollments || 0).toLocaleString()} students
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>Created by <span className="text-purple-400 font-medium">{course.instructor?.name}</span></span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {course.language}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formatDuration(course.totalDuration)}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {totalLectures} lectures</span>
              <span className="capitalize px-2 py-0.5 bg-slate-700 rounded text-xs">{course.level.toLowerCase().replace("_", " ")}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            {course.objectives?.length > 0 && (
              <section className="border border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.objectives.map((obj: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requirements */}
            {course.requirements?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements.map((req: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-1">•</span> {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="text-gray-700 text-sm leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Course Curriculum</h2>
              <p className="text-gray-500 text-sm mb-4">
                {course.sections?.length || 0} sections • {totalLectures} lectures • {formatDuration(course.totalDuration)} total length
              </p>
              <div className="space-y-2">
                {course.sections?.map((section: any) => (
                  <details key={section.id} className="border border-gray-200 rounded-xl overflow-hidden" open={section.order === 1}>
                    <summary className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors list-none">
                      <div className="flex items-center gap-3">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">{section.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{section.lectures.length} lectures</span>
                    </summary>
                    <div className="divide-y divide-gray-100">
                      {section.lectures.map((lecture: any) => (
                        <div key={lecture.id} className="flex items-center justify-between p-4 hover:bg-purple-50 transition-colors">
                          <div className="flex items-center gap-3">
                            {lecture.isFree ? (
                              <Play className="w-4 h-4 text-purple-600" />
                            ) : (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-700">{lecture.title}</span>
                            {lecture.isFree && (
                              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Preview</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">{formatDuration(lecture.duration)}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section className="border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Instructor</h2>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {(course.instructor?.name || "I")[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{course.instructor?.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{course.instructor?.bio || "An experienced instructor passionate about teaching."}</p>
                </div>
              </div>
            </section>

            {/* Reviews */}
            {course.reviews?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Student Reviews <span className="text-gray-500 font-normal text-base">({course._count?.reviews})</span>
                </h2>
                <div className="space-y-4">
                  {course.reviews.map((review: any) => (
                    <div key={review.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {(review.user?.name || "U")[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">{review.user?.name}</span>
                          <div className="flex">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={`w-3 h-3 ${i <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                        {review.comment && <p className="text-sm text-gray-600">{review.comment}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Video preview or thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-indigo-100">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-purple-300" />
                    </div>
                  )}
                  {course.previewVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 text-purple-600 ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="mb-4">
                    {course.discountPrice ? (
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-gray-900">{formatPrice(course.discountPrice, course.currency)}</span>
                        <span className="text-lg text-gray-400 line-through">{formatPrice(course.price, course.currency)}</span>
                        <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">{discountPercent}% off</span>
                      </div>
                    ) : course.price === 0 ? (
                      <span className="text-3xl font-bold text-green-600">Free</span>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">{formatPrice(course.price, course.currency)}</span>
                    )}
                    {course.discountPrice && (
                      <p className="text-sm text-red-500 font-medium mt-1">&#x23F1;&#xFE0F; 2 days left at this price!</p>
                    )}
                  </div>

                  <EnrollButton course={course} session={session} />

                  <p className="text-xs text-gray-500 text-center mt-3">30-Day Money-Back Guarantee</p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">This course includes:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex gap-2"><BookOpen className="w-4 h-4 text-purple-600 shrink-0" />{totalLectures} on-demand lectures</li>
                      <li className="flex gap-2"><Clock className="w-4 h-4 text-purple-600 shrink-0" />{formatDuration(course.totalDuration)} of video content</li>
                      <li className="flex gap-2"><Award className="w-4 h-4 text-purple-600 shrink-0" />Certificate of completion</li>
                      <li className="flex gap-2"><Globe className="w-4 h-4 text-purple-600 shrink-0" />Full lifetime access</li>
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />Access on all devices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
