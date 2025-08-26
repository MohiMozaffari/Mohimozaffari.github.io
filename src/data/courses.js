// src/data/courses.js

// Keep this file pure data (no React/lucide imports here)
// Icons are referenced by key and mapped inside the component.

const courses = [
  {
    id: "pythonFundamentals",
    icon: "Code2",
    label: "Python",
    sublabel: "Fundamentals",
    title: "Python Fundamentals",
    duration: "4-6 weeks",
    level: "Beginner",
    price: "Contact for pricing",
    description:
      "Learn the core concepts of Python programming, including loops, conditionals, functions, and basic programming logic.",
    features: [
      "Variables, data types, and operators",
      "Loops and conditionals",
      "Functions and modular programming",
      "Basic error handling",
      "Introduction to libraries",
    ],
    projects: ["Simple calculator", "Text-based games", "Mini command-line tools"],
  },
  {
    id: "pythonAdvanced",
    icon: "Code2",
    label: "Python",
    sublabel: "Advanced",
    title: "Advanced Python",
    duration: "6-10 weeks",
    level: "Intermediate to Advanced",
    price: "Contact for pricing",
    description:
      "Master advanced Python topics including object-oriented programming, lambda functions, filters, file handling, and robust error handling.",
    features: [
      "OOP: classes, inheritance, polymorphism",
      "Lambda, map, filter, reduce",
      "File handling and I/O",
      "Advanced error handling and debugging",
      "Best practices and code optimization",
    ],
    projects: [
      "Mini library management system",
      "File-based data processing scripts",
      "Object-oriented simulation projects",
    ],
  },
  {
    id: "tkinter",
    icon: "LayoutGrid",
    label: "Tkinter",
    sublabel: "GUI Apps",
    title: "GUI Programming with Tkinter",
    duration: "4-6 weeks",
    level: "Beginner to Intermediate",
    price: "Contact for pricing",
    description:
      "Build interactive GUI applications using Python and Tkinter. Learn event handling, layouts, and real-time interactivity.",
    features: [
      "Tkinter widgets and layout",
      "Event handling and callbacks",
      "GUI application design",
      "Integrating Python logic with GUI",
      "Simple game and interactive apps",
    ],
    projects: ["Catch the fruit game", "Weather application", "Mini quiz app"],
  },
  {
    id: "pygame",
    icon: "Gamepad2",
    label: "Pygame",
    sublabel: "Game Dev",
    title: "Game Development with Pygame",
    duration: "6-12 weeks",
    level: "Beginner to Intermediate",
    price: "Contact for pricing",
    description:
      "Learn Python game development using Pygame. Build fun and interactive games while mastering game loops, graphics, and controls.",
    features: [
      "Game loop and state management",
      "Sprites, animations, and physics",
      "Collision detection and scoring",
      "Sound effects and background music",
      "User input and event handling",
    ],
    projects: ["Jumper game", "Shooting gallery", "Spaceship war game"],
  },
  {
    id: "dataAnalysis",
    icon: "BarChart3",
    label: "Data",
    sublabel: "Analysis & Viz",
    title: "Data Analysis & Visualization",
    duration: "6-10 weeks",
    level: "Intermediate",
    price: "Contact for pricing",
    description:
      "Analyze and visualize data using Python libraries like NumPy, Pandas, Seaborn, and Plotly. Learn to extract insights and create interactive visualizations.",
    features: [
      "Data manipulation with Pandas and NumPy",
      "Exploratory data analysis",
      "Visualization with Seaborn and Plotly",
      "Statistical summaries and correlations",
      "Project-based hands-on analysis",
    ],
    projects: [
      "Analyze real-world datasets",
      "Interactive dashboards and plots",
      "Data-driven insights reports",
    ],
  },
  {
    id: "machineLearning",
    icon: "Cpu",
    label: "ML",
    sublabel: "Scikit-Learn",
    title: "Machine Learning with Scikit-Learn",
    duration: "8-12 weeks",
    level: "Intermediate to Advanced",
    price: "Contact for pricing",
    description:
      "Learn core machine learning algorithms using Scikit-Learn, including regression, classification, clustering, and model evaluation.",
    features: [
      "Supervised and unsupervised learning",
      "Regression, classification, clustering",
      "Feature engineering and preprocessing",
      "Model evaluation and metrics",
      "Hands-on projects with real datasets",
    ],
    projects: ["Predict house prices", "Spam classifier", "Customer segmentation"],
  },
  {
    id: "ai",
    icon: "Bot",
    label: "AI",
    sublabel: "PyTorch",
    title: "AI with PyTorch",
    duration: "10-14 weeks",
    level: "Advanced",
    price: "Contact for pricing",
    description:
      "Dive into AI with PyTorch. Learn neural networks, CNNs, and training workflows through practical projects.",
    features: [
      "Build neural networks from scratch",
      "Convolutional Neural Networks (CNNs)",
      "Data preprocessing and augmentation",
      "Training, evaluation, optimization",
      "Deploying AI models",
    ],
    projects: ["Image classification (CNN)", "Neural network mini-projects", "Small AI apps"],
  },
];

export default courses;
