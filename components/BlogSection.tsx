interface Author {
  name: string;
  initials: string;
  avatarColor: string;
}

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  coverGradient: string;
  author: Author;
  date: string;
  readTime: string;
  href: string;
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Product",
    title: "How we cut our deploy time from 22 minutes to 4",
    excerpt:
      "A behind-the-scenes look at the caching strategy, parallelization tricks, and one embarrassing config bug that was slowing every build for two years.",
    coverGradient: "from-amber-400 to-orange-500",
    author: { name: "Daniel Park", initials: "DP", avatarColor: "bg-orange-100 text-orange-700" },
    date: "May 18, 2026",
    readTime: "6 min read",
    href: "#",
  },
  {
    id: 2,
    category: "Design",
    title: "The case for boring design systems",
    excerpt:
      "Predictability, not novelty, is what makes a design system stick. Here's why we stopped chasing trends and started obsessing over consistency.",
    coverGradient: "from-rose-400 to-pink-500",
    author: { name: "Sofia Reyes", initials: "SR", avatarColor: "bg-rose-100 text-rose-700" },
    date: "May 11, 2026",
    readTime: "5 min read",
    href: "#",
  },
  {
    id: 3,
    category: "Growth",
    title: "What 10,000 signups taught us about onboarding",
    excerpt:
      "We analyzed every drop-off point across our first ten thousand users and rebuilt our onboarding from scratch. Here's what actually moved the needle.",
    coverGradient: "from-violet-400 to-indigo-500",
    author: { name: "Priya Mehta", initials: "PM", avatarColor: "bg-amber-100 text-amber-700" },
    date: "Apr 29, 2026",
    readTime: "8 min read",
    href: "#",
  },
  {
    id: 4,
    category: "Engineering",
    title: "Why we migrated off Postgres (and then back again)",
    excerpt:
      "A two-year saga of distributed databases, painful migrations, and a humbling realization that boring technology is usually the right technology.",
    coverGradient: "from-teal-400 to-cyan-500",
    author: { name: "James Whitfield", initials: "JW", avatarColor: "bg-stone-200 text-stone-700" },
    date: "Apr 14, 2026",
    readTime: "10 min read",
    href: "#",
  },
  {
    id: 5,
    category: "Customer Story",
    title: "How Lumen Cut their reporting time by 70%",
    excerpt:
      "The Lumen team was spending half their Mondays on manual reports. Here's how they automated the whole process in a single afternoon with Acme.",
    coverGradient: "from-amber-300 to-yellow-400",
    author: { name: "Leo Carvalho", initials: "LC", avatarColor: "bg-orange-100 text-orange-700" },
    date: "Mar 31, 2026",
    readTime: "4 min read",
    href: "#",
  },
  {
    id: 6,
    category: "Culture",
    title: "Running a remote team across 12 time zones",
    excerpt:
      "Async-first sounds great until you're waiting 18 hours for a code review. Here are the rituals, tools, and norms that actually work for us.",
    coverGradient: "from-stone-400 to-stone-600",
    author: { name: "Mara Okonkwo", initials: "MO", avatarColor: "bg-amber-100 text-amber-700" },
    date: "Mar 19, 2026",
    readTime: "7 min read",
    href: "#",
  },
];

interface BlogSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  posts?: BlogPost[];
  allPostsHref?: string;
}

function BlogSection({
  eyebrow = "From the blog",
  heading = "Ideas worth sharing",
  subheading = "Product thinking, engineering deep-dives, and real stories from teams who ship. No fluff.",
  posts = POSTS,
  allPostsHref = "#",
}: BlogSectionProps) {
  return (
    <section className="py-24 px-5 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">
              {eyebrow}
            </span>
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-2">{heading}</h2>
            <p className="text-lg text-stone-600 max-w-xl leading-relaxed">{subheading}</p>
          </div>
          <a
            href={allPostsHref}
            className="flex-shrink-0 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            View all posts →
          </a>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Cover */}
              <div className={`h-40 bg-gradient-to-br ${post.coverGradient} flex-shrink-0`} />

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                {/* Category */}
                <span className="inline-flex self-start items-center text-[11px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="font-semibold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full ${post.author.avatarColor} flex items-center justify-center text-[10px] font-bold flex-shrink-0`}
                    >
                      {post.author.initials}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-900 leading-none">{post.author.name}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {post.date} · {post.readTime}
                      </p>
                    </div>
                  </div>
                  <a
                    href={post.href}
                    className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors flex-shrink-0"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogSectionDemo() {
  return (
    <div className="bg-white">
      <BlogSection />
    </div>
  );
}
