// src/data/courses.js
// Anonymized, topic-based teaching content. No student names, schedules, or private links —
// only distilled topic/category framing, per the site's teaching-section privacy rules.

const courses = [
  {
    id: "pythonFundamentals",
    icon: "Code2",
    label: "Python",
    sublabel: "Fundamentals",
    title: "Python Fundamentals",
    duration: "4-6 weeks",
    level: "Beginner",
    description:
      "Core Python programming concepts for learners starting from scratch: variables, control flow, data structures, and functions.",
    features: [
      "Variables, data types, and operators",
      "Control flow: loops and conditionals",
      "Core data structures: lists, dicts, tuples",
      "Functions and modular programming",
      "Basic error handling",
    ],
    projects: ["Simple calculator", "Text-based games", "Mini command-line tools"],
  },
  {
    id: "dataStructuresFunctional",
    icon: "Code2",
    label: "Python",
    sublabel: "Functional",
    title: "Data Structures & Functional Python",
    duration: "4-6 weeks",
    level: "Intermediate",
    description:
      "Deeper Python: sets and comprehensions, functional-style tools, and writing robust, error-resistant code.",
    features: [
      "Sets and comprehensions",
      "Lambda, map, and filter",
      "Error handling and debugging patterns",
      "Writing cleaner, more idiomatic Python",
    ],
    projects: ["File-based data processing scripts", "Small utility libraries"],
  },
  {
    id: "gui",
    icon: "LayoutGrid",
    label: "Tkinter",
    sublabel: "GUI Apps",
    title: "GUI Development",
    duration: "4-6 weeks",
    level: "Beginner to Intermediate",
    description:
      "Building interactive desktop applications with Tkinter — from simple widgets to complete small apps.",
    features: [
      "Tkinter widgets and layout",
      "Event handling and callbacks",
      "Integrating Python logic with a GUI",
    ],
    projects: ["Calculator", "Note-taking app", "Shopping list app", "Paint app", "Weather app"],
  },
  {
    id: "gameDev",
    icon: "Gamepad2",
    label: "Pygame",
    sublabel: "Game Dev",
    title: "Game Development",
    duration: "6-10 weeks",
    level: "Beginner to Intermediate",
    description:
      "Pygame projects used as an engaging way to practice programming fundamentals — game loops, state, and real-time input.",
    features: [
      "Game loop and state management",
      "Sprites, collisions, and scoring",
      "User input and event handling",
    ],
    projects: ["Catch-the-fruits style game", "Space-shooter style game", "Flappy-bird style game"],
  },
  {
    id: "dataScienceIntroML",
    icon: "BarChart3",
    label: "Data",
    sublabel: "Science & ML",
    title: "Data Science & Intro ML",
    duration: "6-10 weeks",
    level: "Intermediate",
    description:
      "Data wrangling and an introduction to machine learning fundamentals, from a single perceptron to basic image classification.",
    features: [
      "Data wrangling with Pandas",
      "Perceptron and linear regression from first principles",
      "Basics of cat/dog and image classification",
    ],
    projects: ["Exploratory data analysis on real datasets", "Simple image classifier"],
  },
  {
    id: "advancedDeepLearning",
    icon: "Bot",
    label: "Deep",
    sublabel: "Learning",
    title: "Advanced / Deep Learning Track",
    duration: "10-14 weeks",
    level: "Advanced",
    description:
      "For longer-running, advanced students: convolutional networks, autoencoders, and applied machine learning pipelines.",
    features: [
      "Convolutional Neural Networks (CNNs)",
      "Autoencoders",
      "End-to-end applied ML pipelines",
    ],
    projects: ["Image classification with CNNs", "Autoencoder-based project"],
  },
];

export default courses;
