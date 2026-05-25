import { useState } from "react";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatarColor: string;
  social: SocialLinks;
}

const TEAM: TeamMember[] = [
  {
    name: "Mara Okonkwo",
    role: "CEO & Co-founder",
    bio: "Mara spent a decade at Stripe building payments infrastructure before starting Acme to make great software accessible to every team.",
    initials: "MO",
    avatarColor: "bg-amber-100 text-amber-700",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Daniel Park",
    role: "CTO & Co-founder",
    bio: "Daniel led platform engineering at Vercel and holds a deep obsession with developer experience, performance, and shipping fast.",
    initials: "DP",
    avatarColor: "bg-orange-100 text-orange-700",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Sofia Reyes",
    role: "Head of Design",
    bio: "Sofia brings 12 years of product design across Figma and Linear, and believes every pixel should earn its place on the screen.",
    initials: "SR",
    avatarColor: "bg-rose-100 text-rose-700",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "James Whitfield",
    role: "Lead Engineer",
    bio: "James is the reason the app is fast — an infrastructure geek who has never met a query he couldn't optimize by at least 40%.",
    initials: "JW",
    avatarColor: "bg-stone-200 text-stone-700",
    social: { linkedin: "#" },
  },
  {
    name: "Priya Mehta",
    role: "Head of Marketing",
    bio: "Priya grew Notion's self-serve motion from zero to millions and now brings that same community-first approach to Acme's growth.",
    initials: "PM",
    avatarColor: "bg-amber-200 text-amber-800",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Leo Carvalho",
    role: "Customer Success",
    bio: "Leo's mantra is that support is a product — he makes sure every team feels seen, unblocked, and genuinely delighted to be a customer.",
    initials: "LC",
    avatarColor: "bg-orange-200 text-orange-800",
    social: { twitter: "#", linkedin: "#" },
  },
];

function TwitterIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface TeamSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  members?: TeamMember[];
  hiringUrl?: string;
}

function TeamSection({
  eyebrow = "Meet the team",
  heading = "Built by people who care",
  subheading = "We're a small, focused team that ships fast, listens closely, and genuinely loves what we build. Remote-first, async-friendly, and always hiring.",
  members = TEAM,
  hiringUrl = "#",
}: TeamSectionProps) {
  return (
    <section className="py-24 px-5 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">
            {eyebrow}
          </span>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">{heading}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">{subheading}</p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-stone-200 rounded-2xl p-7 flex flex-col gap-4 hover:border-amber-300 hover:shadow-md transition-all duration-200"
            >
              {/* Avatar */}
              <div
                className={`w-14 h-14 rounded-2xl ${member.avatarColor} flex items-center justify-center text-lg font-bold flex-shrink-0`}
              >
                {member.initials}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-stone-900 text-base">{member.name}</p>
                <p className="text-sm text-amber-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{member.bio}</p>
              </div>

              {/* Social links */}
              <div className="flex gap-3 pt-1">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className="text-stone-400 hover:text-amber-500 transition-colors"
                    aria-label={`${member.name} on X`}
                  >
                    <TwitterIcon />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="text-stone-400 hover:text-amber-500 transition-colors"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* We're hiring CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-2xl mb-1">We're hiring</p>
            <p className="text-amber-100 text-base">
              Love great software and small teams that move fast? We'd love to hear from you.
            </p>
          </div>
          <a
            href={hiringUrl}
            className="flex-shrink-0 inline-block bg-white text-amber-600 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors shadow-sm"
          >
            View open roles →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function TeamSectionDemo() {
  return (
    <div className="bg-stone-50">
      <TeamSection />
    </div>
  );
}
