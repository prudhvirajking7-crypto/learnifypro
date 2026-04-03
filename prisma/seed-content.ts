// Load .env.local before Prisma initialises
import fs from "fs";
import path from "path";
const envFile = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.trim().match(/^([A-Z_][A-Z0-9_]*)=["']?(.+?)["']?$/);
    if (m) process.env[m[1]] = m[2];
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Thumbnail images (Unsplash) ──────────────────────────────────────────────
const THUMBNAILS: Record<string, string> = {
  "complete-web-development-bootcamp-2024":
    "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&q=80",
  "python-data-science-machine-learning-bootcamp":
    "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&q=80",
  "ui-ux-design-masterclass-beginner-to-pro":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "react-complete-guide-2024":
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
  "complete-digital-marketing-course":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "aws-certified-solutions-architect-associate-2024":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  // extra courses added via seed-more-courses.ts
  "complete-flutter-dart-mobile-dev-2024":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  "nodejs-express-mongodb-backend-bootcamp":
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
  "complete-sql-databases-bootcamp":
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
  "stock-market-investing-beginners-2024":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "complete-business-plan-masterclass":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "kubernetes-docker-complete-guide":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
};

// ─── Free courses data ────────────────────────────────────────────────────────
const FREE_COURSES = [
  {
    slug: "html-css-for-absolute-beginners",
    thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
    title: "HTML & CSS for Absolute Beginners",
    shortDescription: "Learn the building blocks of the web. Build your first website with HTML5 and CSS3 — completely free!",
    description: `<p>Start your web development journey with the two most fundamental technologies of the internet — <strong>HTML</strong> and <strong>CSS</strong>.</p>
<p>This completely free course takes you from zero to building real, responsive web pages.</p>
<h3>What you'll learn</h3>
<ul>
<li>Structure web pages with HTML5 semantic elements</li>
<li>Style with CSS3 — colours, fonts, spacing, layouts</li>
<li>Build responsive pages using Flexbox and CSS Grid</li>
<li>Add animations, transitions, and hover effects</li>
<li>Deploy a personal portfolio page online</li>
</ul>
<p>All resources, cheat-sheets and PDF guides are included free of charge.</p>`,
    price: 0,
    level: "BEGINNER" as const,
    language: "English",
    status: "PUBLISHED" as const,
    featured: true,
    totalDuration: 14400, // 4 hours
    totalLectures: 28,
    requirements: ["A computer with internet", "No prior experience needed", "Any text editor (VS Code recommended — free)"],
    objectives: [
      "Build a complete web page from scratch",
      "Understand HTML5 semantic structure",
      "Style websites with CSS3",
      "Create responsive layouts with Flexbox & Grid",
      "Deploy your first website online",
    ],
    tags: ["html", "css", "web development", "beginner", "free"],
    categorySlug: "web-development",
    instructorEmail: "john.smith@learnifypro.com",
    sections: [
      {
        title: "Getting Started with HTML",
        lectures: [
          { title: "Welcome! What You Will Build", duration: 180, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "How the Web Works — Quick Overview", duration: 300, isFree: true, type: "VIDEO" as const, resources: [] },
          {
            title: "HTML Basics Cheat-Sheet (PDF)",
            duration: 60,
            isFree: true,
            type: "ARTICLE" as const,
            description: "Download the HTML5 quick-reference PDF. Covers all common tags, attributes and best practices.",
            resources: ["https://htmlcheatsheet.com/HTML5-mega-cheat-sheet.pdf"],
          },
          { title: "Your First HTML Page", duration: 720, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "HTML5 Semantic Elements Explained", duration: 900, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Forms, Inputs & Buttons", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Tables & Lists", duration: 600, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "HTML5 Elements Reference (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Full reference guide covering every HTML5 element with examples and usage notes.",
            resources: ["https://www.w3.org/TR/2011/WD-html5-20110525/Overview.pdf"],
          },
        ],
      },
      {
        title: "Styling with CSS3",
        lectures: [
          { title: "Introduction to CSS — Selectors & Properties", duration: 900, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Colors, Backgrounds & Typography", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "CSS Properties Cheat-Sheet (PDF)",
            duration: 60,
            isFree: true,
            type: "ARTICLE" as const,
            description: "Comprehensive CSS3 property reference — download and keep alongside you while coding.",
            resources: ["https://websitesetup.org/wp-content/uploads/2019/11/wsu-css-cheat-sheet-gdocs.pdf"],
          },
          { title: "Box Model: Margin, Padding & Borders", duration: 780, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Positioning & Z-index", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "CSS Transitions & Animations", duration: 960, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "CSS Variables & Custom Properties", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
      {
        title: "Layouts: Flexbox & CSS Grid",
        lectures: [
          { title: "Flexbox Fundamentals", duration: 1200, isFree: true, type: "VIDEO" as const, resources: [] },
          {
            title: "Flexbox Visual Cheat-Sheet (PDF)",
            duration: 60,
            isFree: true,
            type: "ARTICLE" as const,
            description: "Visual guide to all Flexbox properties with diagrams for each property value.",
            resources: ["https://css-tricks.com/wp-content/uploads/2022/02/css-flexbox-poster.png"],
          },
          { title: "CSS Grid Layout Crash Course", duration: 1380, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Building a Responsive Navigation Bar", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Responsive Design with Media Queries", duration: 1020, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "Responsive Design Guide (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Best practices for responsive web design including breakpoints, fluid layouts and images.",
            resources: ["https://www.smashingmagazine.com/provide/eBooks/responsive-web-design.pdf"],
          },
          { title: "Final Project: Build a Portfolio Page", duration: 2400, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
    ],
  },

  {
    slug: "python-fundamentals-zero-to-hero",
    thumbnail: "https://images.unsplash.com/photo-1649180556628-9248aa7e1bd3?w=800&q=80",
    title: "Python Fundamentals: Zero to Hero",
    shortDescription: "Master Python from scratch — variables, loops, functions, OOP and file handling. 100% free with downloadable notes.",
    description: `<p>Python is the world's most popular programming language — used in web development, data science, AI, automation and more.</p>
<p>This free course gets you fully productive with Python from absolute zero.</p>
<h3>What you'll learn</h3>
<ul>
<li>Python syntax, data types, operators and expressions</li>
<li>Control flow: if/else, loops (for & while)</li>
<li>Functions, modules and packages</li>
<li>Lists, tuples, dictionaries and sets</li>
<li>Object-Oriented Programming (OOP)</li>
<li>File I/O and exception handling</li>
</ul>
<p>Every section includes a downloadable PDF cheat-sheet and practice exercises.</p>`,
    price: 0,
    level: "BEGINNER" as const,
    language: "English",
    status: "PUBLISHED" as const,
    featured: true,
    totalDuration: 18000, // 5 hours
    totalLectures: 32,
    requirements: ["A computer (Mac, Windows or Linux)", "Python 3 installed (free from python.org)", "No prior programming experience required"],
    objectives: [
      "Write Python programs with confidence",
      "Use Python data structures effectively",
      "Build functions and reusable modules",
      "Understand OOP principles in Python",
      "Handle files and exceptions",
      "Write clean, Pythonic code",
    ],
    tags: ["python", "programming", "beginner", "free", "oop"],
    categorySlug: "data-science",
    instructorEmail: "priya.kapoor@learnifypro.com",
    sections: [
      {
        title: "Python Basics",
        lectures: [
          { title: "Installing Python & VS Code", duration: 480, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Your First Python Program", duration: 360, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Variables, Data Types & Operators", duration: 1200, isFree: true, type: "VIDEO" as const, resources: [] },
          {
            title: "Python Basics Cheat-Sheet (PDF)",
            duration: 60,
            isFree: true,
            type: "ARTICLE" as const,
            description: "Download the Python 3 quick-reference covering syntax, data types, operators and string methods.",
            resources: ["https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf"],
          },
          { title: "Strings & String Methods", duration: 960, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "User Input & Type Conversion", duration: 600, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "if / elif / else Statements", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "for & while Loops", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
      {
        title: "Data Structures",
        lectures: [
          { title: "Lists — Creating, Slicing & Methods", duration: 1200, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Tuples & Sets", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Dictionaries — The Key to Python", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "Data Structures Reference (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Visual comparison of Python data structures — when to use list vs tuple vs dict vs set.",
            resources: ["https://gto76.github.io/python-cheatsheet/"],
          },
          { title: "List Comprehensions", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Practice Exercise: Data Structures", duration: 600, isFree: false, type: "ASSIGNMENT" as const, resources: [] },
        ],
      },
      {
        title: "Functions, OOP & File Handling",
        lectures: [
          { title: "Defining & Calling Functions", duration: 960, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Args, Kwargs & Default Parameters", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Lambda Functions & Map/Filter", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Modules & pip Packages", duration: 780, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "OOP — Classes & Objects", duration: 1500, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Inheritance & Polymorphism", duration: 1200, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "OOP in Python — Guide (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Concise guide to Python OOP concepts: classes, inheritance, encapsulation and magic methods.",
            resources: ["https://www.pythoncheatsheet.org/"],
          },
          { title: "Reading & Writing Files", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Exception Handling (try/except)", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Final Project: Build a CLI To-Do App", duration: 1800, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
    ],
  },

  {
    slug: "git-github-complete-beginners-guide",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
    title: "Git & GitHub: Complete Beginner's Guide",
    shortDescription: "Learn version control with Git and collaborate on GitHub. Essential skill for every developer — free course.",
    description: `<p><strong>Git</strong> is the most widely used version control system in the world. Every professional developer uses it daily.</p>
<p>This free course teaches you everything from your very first commit to branching strategies and open-source collaboration on GitHub.</p>
<h3>What you'll learn</h3>
<ul>
<li>Core Git concepts: repositories, commits, branches</li>
<li>Staging, committing and viewing history</li>
<li>Branching, merging and resolving conflicts</li>
<li>Working with remote repositories on GitHub</li>
<li>Pull requests and the open-source workflow</li>
<li>Git best practices and common commands</li>
</ul>`,
    price: 0,
    level: "BEGINNER" as const,
    language: "English",
    status: "PUBLISHED" as const,
    featured: false,
    totalDuration: 10800, // 3 hours
    totalLectures: 22,
    requirements: ["A computer with internet", "Command line basics helpful but not required", "Free GitHub account (sign up at github.com)"],
    objectives: [
      "Understand version control and why it matters",
      "Use Git for everyday development tasks",
      "Create and manage GitHub repositories",
      "Collaborate with others using pull requests",
      "Understand branching strategies",
      "Contribute to open-source projects",
    ],
    tags: ["git", "github", "version control", "beginner", "free"],
    categorySlug: "it-software",
    instructorEmail: "john.smith@learnifypro.com",
    sections: [
      {
        title: "Git Fundamentals",
        lectures: [
          { title: "What is Version Control & Why You Need It", duration: 300, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Installing Git & First-Time Setup", duration: 480, isFree: true, type: "VIDEO" as const, resources: [] },
          {
            title: "Git Command Cheat-Sheet (PDF)",
            duration: 60,
            isFree: true,
            type: "ARTICLE" as const,
            description: "The essential Git commands cheat-sheet — init, add, commit, status, log, diff and more.",
            resources: ["https://education.github.com/git-cheat-sheet-education.pdf"],
          },
          { title: "git init, git add & git commit", duration: 720, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "git status, git log & git diff", duration: 660, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Undoing Changes: reset, revert & restore", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: ".gitignore Files Explained", duration: 480, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
      {
        title: "Branching & Merging",
        lectures: [
          { title: "What are Branches & Why Use Them", duration: 420, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Creating, Switching & Deleting Branches", duration: 660, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Merging Branches & Resolving Conflicts", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "git rebase — What & When", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "Git Branching Strategies Guide (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Overview of popular branching models: Git Flow, GitHub Flow, and Trunk-Based Development.",
            resources: ["https://nvie.com/files/Git-branching-model.pdf"],
          },
        ],
      },
      {
        title: "GitHub & Collaboration",
        lectures: [
          { title: "Creating Your First GitHub Repository", duration: 480, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "git push, pull & clone", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Forking Repos & Pull Requests", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Code Reviews on GitHub", duration: 600, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "GitHub Issues & Project Boards", duration: 540, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "Pro Git Book — Chapters 1-3 (Free PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "The first three chapters of the official Pro Git book — free, covers all fundamentals in depth.",
            resources: ["https://git-scm.com/book/en/v2"],
          },
          { title: "GitHub Pages — Deploy a Site for Free", duration: 600, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Final Challenge: Contribute to a Sample Repo", duration: 900, isFree: false, type: "ASSIGNMENT" as const, resources: [] },
        ],
      },
    ],
  },

  {
    slug: "javascript-essentials-beginners",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    title: "JavaScript Essentials for Beginners",
    shortDescription: "Learn JavaScript from scratch — the language of the web. Variables, functions, DOM, events and async JS — all free.",
    description: `<p><strong>JavaScript</strong> makes websites interactive. It runs in every browser and is the only programming language native to the web.</p>
<p>This free course gives you a rock-solid foundation in modern JavaScript (ES6+).</p>
<h3>What you'll learn</h3>
<ul>
<li>Variables (let, const), data types and operators</li>
<li>Functions, arrow functions and scope</li>
<li>Arrays and objects in depth</li>
<li>DOM manipulation and event handling</li>
<li>Asynchronous JS: callbacks, Promises and async/await</li>
<li>Fetch API and working with JSON</li>
</ul>
<p>Includes downloadable PDF cheat-sheets for every section.</p>`,
    price: 0,
    level: "BEGINNER" as const,
    language: "English",
    status: "PUBLISHED" as const,
    featured: true,
    totalDuration: 16200, // 4.5 hours
    totalLectures: 30,
    requirements: ["Basic HTML & CSS knowledge recommended", "A web browser (Chrome or Firefox)", "VS Code or any text editor"],
    objectives: [
      "Understand JavaScript syntax and core concepts",
      "Manipulate the DOM to create interactive web pages",
      "Handle events like clicks, inputs and form submissions",
      "Work with arrays and objects confidently",
      "Write asynchronous JavaScript using Promises & async/await",
      "Fetch data from APIs and display it on a webpage",
    ],
    tags: ["javascript", "es6", "dom", "async", "beginner", "free"],
    categorySlug: "web-development",
    instructorEmail: "john.smith@learnifypro.com",
    sections: [
      {
        title: "JavaScript Basics",
        lectures: [
          { title: "Introduction: What is JavaScript?", duration: 240, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Variables: var, let & const", duration: 720, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Data Types, Operators & Type Coercion", duration: 960, isFree: true, type: "VIDEO" as const, resources: [] },
          {
            title: "JavaScript Cheat-Sheet ES6+ (PDF)",
            duration: 60,
            isFree: true,
            type: "ARTICLE" as const,
            description: "Comprehensive ES6+ cheat-sheet — arrow functions, destructuring, spread, template literals and more.",
            resources: ["https://ilovecoding.org/blog/js-cheatsheet"],
          },
          { title: "Conditionals: if/else & switch", duration: 780, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Loops: for, while & forEach", duration: 840, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Functions & Arrow Functions", duration: 1020, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Scope, Hoisting & Closures", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
      {
        title: "Arrays, Objects & ES6+",
        lectures: [
          { title: "Arrays — Methods Deep Dive", duration: 1200, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Objects — Properties, Methods & this", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Destructuring, Spread & Rest", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Template Literals & Optional Chaining", duration: 600, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "Arrays & Objects Reference (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Reference sheet for all Array methods (map, filter, reduce, find, etc.) with examples.",
            resources: ["https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-arrays/cheatsheet"],
          },
          { title: "ES6 Classes & Prototypes", duration: 960, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Modules: import & export", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
      {
        title: "DOM, Events & Async JavaScript",
        lectures: [
          { title: "The DOM — Selecting & Manipulating Elements", duration: 1200, isFree: true, type: "VIDEO" as const, resources: [] },
          { title: "Event Listeners & Event Object", duration: 960, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Forms: Validation & Submission", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Callbacks & Callback Hell", duration: 720, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Promises — then, catch & finally", duration: 960, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "async / await Explained Simply", duration: 900, isFree: false, type: "VIDEO" as const, resources: [] },
          { title: "Fetch API & Working with JSON", duration: 1080, isFree: false, type: "VIDEO" as const, resources: [] },
          {
            title: "Async JavaScript Guide (PDF)",
            duration: 60,
            isFree: false,
            type: "ARTICLE" as const,
            description: "Visual guide to asynchronous JavaScript: event loop, call stack, promises and async/await flow diagrams.",
            resources: ["https://eloquentjavascript.net/Eloquent_JavaScript.pdf"],
          },
          { title: "Mini-Project: Build a Weather App using an API", duration: 2400, isFree: false, type: "VIDEO" as const, resources: [] },
        ],
      },
    ],
  },
];

async function main() {
  console.log("🖼️  Adding thumbnails to existing courses...");

  for (const [slug, thumbnail] of Object.entries(THUMBNAILS)) {
    const updated = await prisma.course.updateMany({
      where: { slug },
      data: { thumbnail },
    });
    if (updated.count > 0) {
      console.log(`  ✅ Thumbnail set: ${slug}`);
    }
  }

  console.log("\n🆓 Creating free courses...");

  for (const courseData of FREE_COURSES) {
    const existing = await prisma.course.findUnique({ where: { slug: courseData.slug } });
    if (existing) {
      console.log(`  ⏩ Already exists: ${courseData.slug}`);
      continue;
    }

    // Resolve instructor and category
    const instructor = await prisma.user.findUnique({ where: { email: courseData.instructorEmail } });
    if (!instructor) { console.log(`  ❌ Instructor not found: ${courseData.instructorEmail}`); continue; }

    const category = await prisma.category.findUnique({ where: { slug: courseData.categorySlug } });
    if (!category) { console.log(`  ❌ Category not found: ${courseData.categorySlug}`); continue; }

    const course = await prisma.course.create({
      data: {
        slug: courseData.slug,
        thumbnail: courseData.thumbnail,
        title: courseData.title,
        shortDescription: courseData.shortDescription,
        description: courseData.description,
        price: courseData.price,
        discountPrice: null,
        currency: "INR",
        level: courseData.level,
        language: courseData.language,
        status: courseData.status,
        featured: courseData.featured,
        totalDuration: courseData.totalDuration,
        totalLectures: courseData.totalLectures,
        requirements: courseData.requirements,
        objectives: courseData.objectives,
        tags: courseData.tags,
        instructorId: instructor.id,
        categoryId: category.id,
      },
    });

    let sectionOrder = 1;
    for (const sectionData of courseData.sections) {
      const section = await prisma.section.create({
        data: { title: sectionData.title, order: sectionOrder++, courseId: course.id },
      });

      let lectureOrder = 1;
      for (const lec of sectionData.lectures) {
        await prisma.lecture.create({
          data: {
            title: lec.title,
            description: (lec as any).description ?? null,
            duration: lec.duration,
            order: lectureOrder++,
            isFree: lec.isFree,
            type: lec.type,
            resources: lec.resources,
            sectionId: section.id,
          },
        });
      }
    }

    console.log(`  ✅ Created free course: ${course.title}`);
  }

  console.log("\n✅ Content seeding complete!");
}

main()
  .catch((e) => { console.error("❌ Error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
