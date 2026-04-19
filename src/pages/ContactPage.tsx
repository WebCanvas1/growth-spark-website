import {
  ArrowLeft,
  Mail,
  Phone,
  CheckCircle2,
  Globe,
  MonitorSmartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(30,41,59,0.88)_18%,rgba(248,250,252,1)_18%,rgba(248,250,252,1)_100%)]">
          <div className="absolute inset-x-0 top-24 h-[340px] bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_38%),radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_32%)]" />

          <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 lg:px-12">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur">
                  Let’s build something that grows your business
                </span>

                <p className="max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                  Enquire about a new business website, redesign, landing page,
                  or monthly hosting. We’ll help you choose the right setup for
                  your business.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
              <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold md:text-3xl">
                      Ways to reach us
                    </h2>
                    <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                      Prefer email or a quick call? Reach out directly and we’ll
                      guide you on website design, hosting, or the best plan for
                      your business.
                    </p>
                  </div>

                  <div className="hidden rounded-2xl bg-blue-50 p-3 md:block">
                    <Globe className="h-7 w-7 text-blue-600" />
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <Mail className="h-5 w-5" />
                    </div>

                    <h3 className="text-xl font-bold">Email us</h3>
                    <p className="mt-3 text-slate-600">
                      Best for quotes, redesign requests, general questions, and
                      new website enquiries.
                    </p>

                    <a
                      href="mailto:pharelrohit1992@gmail.com"
                      className="mt-5 inline-block whitespace-nowrap text-base font-semibold text-blue-600 hover:underline sm:text-lg"
                    >
                      pharelrohit1992@gmail.com
                    </a>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <Phone className="h-5 w-5" />
                    </div>

                    <h3 className="text-xl font-bold">Call us</h3>
                    <p className="mt-3 text-slate-600">
                      Great if you want to talk through pricing, timelines, or
                      the right website package.
                    </p>

                    <a
                      href="tel:0422931252"
                      className="mt-5 inline-block text-lg font-semibold text-blue-600 hover:underline"
                    >
                      0422931252
                    </a>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                      <MonitorSmartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        What we can help with
                      </h3>
                      <p className="text-slate-600">
                        Popular requests from small businesses
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "New business websites",
                      "Website redesigns",
                      "Monthly hosting plans",
                      "Lead generation landing pages",
                      "Mobile-friendly website upgrades",
                      "Pricing and turnaround questions",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:p-10">
                <div className="mb-8">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                    Contact form
                  </span>

                  <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                    Tell us about your project
                  </h2>

                  <p className="mt-4 text-lg leading-7 text-slate-600">
                    Fill in the form and we’ll get back to you with the next
                    steps, pricing guidance, or a tailored recommendation.
                  </p>
                </div>

                <form
                  action="https://formsubmit.co/pharelrohit1992@gmail.com"
                  method="POST"
                  className="space-y-6"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="New website enquiry from WebStarter"
                  />
                  <input
                    type="hidden"
                    name="_next"
                    value="https://webcanvas1.github.io/growth-spark-website/#/contact"
                  />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-600 focus:bg-white"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-600 focus:bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-600 focus:bg-white"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="enquiry_subject"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-600 focus:bg-white"
                      placeholder="Website design, hosting, redesign..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Comment
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-600 focus:bg-white"
                      placeholder="Tell us about your business, your goals, and what kind of website you need..."
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm leading-6 text-slate-500">
                      We usually reply with the next steps, pricing guidance, or
                      a suggested plan.
                    </p>

                    <button
                      type="submit"
                      className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
