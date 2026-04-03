import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "web-development" },
      update: {},
      create: { name: "Web Development", slug: "web-development", icon: "💻", description: "HTML, CSS, JavaScript, React, Node.js and more" },
    }),
    prisma.category.upsert({
      where: { slug: "data-science" },
      update: {},
      create: { name: "Data Science", slug: "data-science", icon: "📊", description: "Python, Machine Learning, AI, Deep Learning" },
    }),
    prisma.category.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: { name: "Mobile Development", slug: "mobile-development", icon: "📱", description: "iOS, Android, React Native, Flutter" },
    }),
    prisma.category.upsert({
      where: { slug: "design" },
      update: {},
      create: { name: "Design", slug: "design", icon: "🎨", description: "UI/UX, Figma, Photoshop, Illustrator" },
    }),
    prisma.category.upsert({
      where: { slug: "business" },
      update: {},
      create: { name: "Business", slug: "business", icon: "💼", description: "Entrepreneurship, Management, Strategy" },
    }),
    prisma.category.upsert({
      where: { slug: "marketing" },
      update: {},
      create: { name: "Marketing", slug: "marketing", icon: "📣", description: "Digital Marketing, SEO, Social Media" },
    }),
    prisma.category.upsert({
      where: { slug: "it-software" },
      update: {},
      create: { name: "IT & Software", slug: "it-software", icon: "🔧", description: "DevOps, Cloud, Cybersecurity, Networking" },
    }),
    prisma.category.upsert({
      where: { slug: "finance" },
      update: {},
      create: { name: "Finance", slug: "finance", icon: "💰", description: "Stock Market, Accounting, Investment" },
    }),
  ]);

  // Admin user
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@learnifypro.com" },
    update: {},
    create: {
      name: "LearnifyPro Admin",
      email: "admin@learnifypro.com",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  // Instructor users
  const instructorPassword = await bcrypt.hash("Instructor@123", 12);
  const instructor1 = await prisma.user.upsert({
    where: { email: "john.smith@learnifypro.com" },
    update: {},
    create: {
      name: "John Smith",
      email: "john.smith@learnifypro.com",
      password: instructorPassword,
      role: "INSTRUCTOR",
      emailVerified: new Date(),
      bio: "Senior Full Stack Developer with 10+ years of experience in web technologies. Has worked at Google, Microsoft and now teaches full-time.",
    },
  });

  const instructor2 = await prisma.user.upsert({
    where: { email: "priya.kapoor@learnifypro.com" },
    update: {},
    create: {
      name: "Priya Kapoor",
      email: "priya.kapoor@learnifypro.com",
      password: instructorPassword,
      role: "INSTRUCTOR",
      emailVerified: new Date(),
      bio: "Data Scientist and ML Engineer with expertise in Python, TensorFlow, and PyTorch. Former AI researcher at IIT Delhi.",
    },
  });

  const instructor3 = await prisma.user.upsert({
    where: { email: "arjun.mehta@learnifypro.com" },
    update: {},
    create: {
      name: "Arjun Mehta",
      email: "arjun.mehta@learnifypro.com",
      password: instructorPassword,
      role: "INSTRUCTOR",
      emailVerified: new Date(),
      bio: "UX Design Lead with 8+ years in product design. Has designed products used by millions worldwide.",
    },
  });

  // Courses
  const courses = [
    {
      title: "The Complete Web Development Bootcamp 2024",
      slug: "complete-web-development-bootcamp-2024",
      description: `<p>Become a full-stack web developer with just ONE course. This is the most comprehensive web development course available online.</p>
<p>Whether you want to build websites, applications, or become a professional developer, this course has everything you need.</p>
<h3>What makes this course special?</h3>
<ul>
<li>Updated for 2024 with the latest technologies</li>
<li>Build 25+ real-world projects</li>
<li>Learn from a Google-certified instructor</li>
<li>Includes lifetime access and certificate</li>
</ul>`,
      shortDescription: "Become a full-stack web developer. Learn HTML, CSS, JavaScript, React, Node.js, MongoDB, and more!",
      thumbnail: "https://img-c.udemyassets.com/course/480x270/625204_436a_3.jpg",
      price: 3999,
      discountPrice: 499,
      currency: "INR",
      level: "ALL_LEVELS" as const,
      language: "English",
      status: "PUBLISHED" as const,
      featured: true,
      totalDuration: 72000,
      totalLectures: 374,
      requirements: [
        "No programming experience needed",
        "A computer (Mac, Windows, or Linux)",
        "Internet connection",
      ],
      objectives: [
        "Build 25 websites and apps for your portfolio",
        "Learn the latest technologies including ES6, React, Node",
        "Build fully-fledged websites and web apps for your startup or business",
        "Master frontend development with React",
        "Master backend development with Node.js",
        "Learn professional developer best practices",
      ],
      tags: ["html", "css", "javascript", "react", "nodejs", "mongodb"],
      instructorId: instructor1.id,
      categoryId: categories[0].id,
    },
    {
      title: "Python for Data Science and Machine Learning Bootcamp",
      slug: "python-data-science-machine-learning-bootcamp",
      description: `<p>Learn Python for Data Science, NumPy, Pandas, Matplotlib, Seaborn, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!</p>
<p>This course covers everything from Python basics to advanced machine learning algorithms.</p>`,
      shortDescription: "Learn Python, Pandas, NumPy, Matplotlib, Scikit-Learn, Machine Learning and Deep Learning!",
      thumbnail: "https://img-c.udemyassets.com/course/480x270/903744_8eb2.jpg",
      price: 4499,
      discountPrice: 649,
      currency: "INR",
      level: "INTERMEDIATE" as const,
      language: "English",
      status: "PUBLISHED" as const,
      featured: true,
      totalDuration: 82800,
      totalLectures: 165,
      requirements: [
        "Basic understanding of math and statistics",
        "Some prior programming experience helpful",
        "Python 3 (free and easy to install)",
      ],
      objectives: [
        "Use Python for Data Science and Machine Learning",
        "Implement Machine Learning algorithms",
        "Use Pandas for data manipulation",
        "Create visualizations with Matplotlib and Seaborn",
        "Build and train Neural Networks with TensorFlow",
        "Work with real-world datasets",
      ],
      tags: ["python", "machine learning", "data science", "tensorflow", "pandas"],
      instructorId: instructor2.id,
      categoryId: categories[1].id,
    },
    {
      title: "UI/UX Design Masterclass: From Beginner to Pro",
      slug: "ui-ux-design-masterclass-beginner-to-pro",
      description: `<p>Master UI/UX design from scratch. Learn Figma, design principles, user research, wireframing, prototyping, and more.</p>
<p>This course takes you from zero to a professional UI/UX designer with a complete portfolio.</p>`,
      shortDescription: "Master UI/UX Design with Figma. Create stunning designs, build your portfolio and land your dream design job!",
      thumbnail: "https://img-c.udemyassets.com/course/480x270/1643044_f4fc_2.jpg",
      price: 3499,
      discountPrice: 549,
      currency: "INR",
      level: "BEGINNER" as const,
      language: "English",
      status: "PUBLISHED" as const,
      featured: true,
      totalDuration: 54000,
      totalLectures: 121,
      requirements: [
        "No design experience required",
        "A computer with internet connection",
        "Figma (free version is fine)",
      ],
      objectives: [
        "Master Figma from scratch to advanced level",
        "Understand UI/UX design principles",
        "Conduct user research and create personas",
        "Build wireframes and interactive prototypes",
        "Design a complete app from scratch",
        "Build a professional design portfolio",
      ],
      tags: ["ui", "ux", "figma", "design", "wireframing", "prototyping"],
      instructorId: instructor3.id,
      categoryId: categories[3].id,
    },
    {
      title: "React - The Complete Guide 2024 (including React Router & Redux)",
      slug: "react-complete-guide-2024",
      description: `<p>Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Router, Next.js, Best Practices and way more!</p>`,
      shortDescription: "Dive in and learn React.js from scratch! Hooks, Redux, React Router, Next.js and much more!",
      price: 3999,
      discountPrice: 499,
      currency: "INR",
      level: "ALL_LEVELS" as const,
      language: "English",
      status: "PUBLISHED" as const,
      featured: true,
      totalDuration: 68400,
      totalLectures: 692,
      requirements: ["Basic JavaScript knowledge", "HTML & CSS basics"],
      objectives: [
        "Build powerful, fast, user-friendly and reactive web apps",
        "Provide amazing user experiences by leveraging the power of JavaScript with React",
        "Apply for high-paid jobs or work as a freelancer in one of the most-demanded areas",
        "Use React Hooks and React Components",
        "Learn Redux and Redux Toolkit",
      ],
      tags: ["react", "redux", "javascript", "hooks", "nextjs"],
      instructorId: instructor1.id,
      categoryId: categories[0].id,
    },
    {
      title: "The Complete Digital Marketing Course - 12 Courses in 1",
      slug: "complete-digital-marketing-course",
      description: `<p>Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!</p>`,
      shortDescription: "Master Digital Marketing: Social Media, SEO, YouTube, Email Marketing, Facebook Ads, Google Ads and Analytics.",
      price: 2999,
      discountPrice: 399,
      currency: "INR",
      level: "BEGINNER" as const,
      language: "English",
      status: "PUBLISHED" as const,
      featured: false,
      totalDuration: 43200,
      totalLectures: 218,
      requirements: ["No experience needed - we'll teach you everything you need to know"],
      objectives: [
        "Grow a business online from scratch",
        "Create a profitable Facebook Ad campaigns",
        "Use Google Analytics to make data-driven decisions",
        "Master SEO and rank websites in Google",
        "Build an Email list & use Email Marketing",
      ],
      tags: ["digital marketing", "seo", "social media", "facebook ads", "google ads"],
      instructorId: instructor3.id,
      categoryId: categories[5].id,
    },
    {
      title: "AWS Certified Solutions Architect - Associate 2024",
      slug: "aws-certified-solutions-architect-associate-2024",
      description: `<p>Want to pass the AWS Certified Solutions Architect - Associate exam? Want to become Amazon Web Services Certified? Do you want to get into Cloud computing?</p>`,
      shortDescription: "Pass the AWS Certified Solutions Architect Associate exam! Learn Amazon Web Services hands-on.",
      price: 4999,
      discountPrice: 699,
      currency: "INR",
      level: "INTERMEDIATE" as const,
      language: "English",
      status: "PUBLISHED" as const,
      featured: false,
      totalDuration: 64800,
      totalLectures: 437,
      requirements: ["Basic IT knowledge", "No prior AWS experience required"],
      objectives: [
        "Pass the AWS Certified Solutions Architect Associate Exam",
        "Use the right AWS services for the right use cases",
        "Deploy highly available and fault tolerant systems on AWS",
        "Launch and configure auto-scaling groups",
        "Understand the AWS shared responsibility model",
      ],
      tags: ["aws", "cloud", "devops", "solutions architect", "amazon"],
      instructorId: instructor1.id,
      categoryId: categories[6].id,
    },
  ];

  for (const courseData of courses) {
    const existing = await prisma.course.findUnique({
      where: { slug: courseData.slug },
    });

    if (!existing) {
      const course = await prisma.course.create({ data: courseData });

      // Add curriculum sections and lectures
      const section1 = await prisma.section.create({
        data: { title: "Introduction & Getting Started", order: 1, courseId: course.id },
      });

      await prisma.lecture.createMany({
        data: [
          { title: "Welcome to the Course!", duration: 180, order: 1, isFree: true, type: "VIDEO", sectionId: section1.id, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
          { title: "Course Overview & Roadmap", duration: 420, order: 2, isFree: true, type: "VIDEO", sectionId: section1.id },
          { title: "Setting Up Your Development Environment", duration: 780, order: 3, isFree: false, type: "VIDEO", sectionId: section1.id },
          { title: "How to Get the Most Out of This Course", duration: 240, order: 4, isFree: false, type: "ARTICLE", sectionId: section1.id },
        ],
      });

      const section2 = await prisma.section.create({
        data: { title: "Core Concepts", order: 2, courseId: course.id },
      });

      await prisma.lecture.createMany({
        data: [
          { title: "Understanding the Fundamentals", duration: 1200, order: 1, isFree: false, type: "VIDEO", sectionId: section2.id },
          { title: "Deep Dive into Key Topics", duration: 1800, order: 2, isFree: false, type: "VIDEO", sectionId: section2.id },
          { title: "Hands-On Practice Exercise", duration: 900, order: 3, isFree: false, type: "VIDEO", sectionId: section2.id },
          { title: "Quiz: Test Your Knowledge", duration: 300, order: 4, isFree: false, type: "QUIZ", sectionId: section2.id },
        ],
      });

      const section3 = await prisma.section.create({
        data: { title: "Advanced Topics", order: 3, courseId: course.id },
      });

      await prisma.lecture.createMany({
        data: [
          { title: "Advanced Concepts Explained", duration: 2400, order: 1, isFree: false, type: "VIDEO", sectionId: section3.id },
          { title: "Real-World Project Walkthrough", duration: 3600, order: 2, isFree: false, type: "VIDEO", sectionId: section3.id },
          { title: "Best Practices & Tips", duration: 1500, order: 3, isFree: false, type: "VIDEO", sectionId: section3.id },
          { title: "Section Summary & Resources", duration: 600, order: 4, isFree: false, type: "ARTICLE", sectionId: section3.id },
        ],
      });

      console.log(`✅ Created course: ${course.title}`);
    }
  }

  console.log("✅ Seeding completed!");
  console.log("\n📋 Default credentials:");
  console.log("Admin:      admin@learnifypro.com / Admin@123");
  console.log("Instructor: john.smith@learnifypro.com / Instructor@123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
