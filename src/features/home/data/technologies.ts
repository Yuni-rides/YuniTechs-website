export type TechItem = {
  name: string;
  /** Lucide icon name — see icon map in KeyTechnologies. Swap for real logos later. */
  icon: string;
};

export type TechGroup = {
  title: string;
  items: TechItem[];
};

export type TechCategory = {
  id: string;
  label: string;
  groups: TechGroup[];
};

export const techCategories: TechCategory[] = [
  {
    id: "mobile-apps",
    label: "Mobile Apps",
    groups: [
      {
        title: "iOS",
        items: [
          { name: "Swift", icon: "Bird" },
          { name: "Combine", icon: "Workflow" },
          { name: "Core Data", icon: "Database" },
          { name: "UI Kit", icon: "LayoutTemplate" },
          { name: "MVVM", icon: "Shuffle" },
          { name: "Rx Swift", icon: "RefreshCw" },
          { name: "Alamofire", icon: "Flame" },
        ],
      },
      {
        title: "Android",
        items: [
          { name: "Kotlin", icon: "Triangle" },
          { name: "Java", icon: "Coffee" },
          { name: "Jetpack", icon: "Rocket" },
          { name: "MVVM", icon: "Shuffle" },
          { name: "Retrofit", icon: "Plug" },
          { name: "Rx Java", icon: "RefreshCw" },
        ],
      },
    ],
  },
  {
    id: "web-platforms",
    label: "Web Platforms",
    groups: [
      {
        title: "Frontend",
        items: [
          { name: "React", icon: "Atom" },
          { name: "Next.js", icon: "Zap" },
          { name: "Vue.js", icon: "Layers" },
          { name: "Angular", icon: "Shield" },
          { name: "TypeScript", icon: "Code2" },
          { name: "Tailwind CSS", icon: "Wind" },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: "Node.js", icon: "Hexagon" },
          { name: "Laravel", icon: "Box" },
          { name: "Django", icon: "Server" },
          { name: "GraphQL", icon: "Share2" },
          { name: "REST APIs", icon: "Plug" },
        ],
      },
    ],
  },
  {
    id: "cross-platforms",
    label: "Cross Platforms",
    groups: [
      {
        title: "Frameworks",
        items: [
          { name: "React Native", icon: "Atom" },
          { name: "Flutter", icon: "Feather" },
          { name: "Expo", icon: "Rocket" },
          { name: "Ionic", icon: "Smartphone" },
        ],
      },
    ],
  },
  {
    id: "games",
    label: "Games",
    groups: [
      {
        title: "Engines",
        items: [
          { name: "Unity", icon: "Box" },
          { name: "Unreal", icon: "Gamepad2" },
          { name: "Godot", icon: "Bot" },
          { name: "Three.js", icon: "Cuboid" },
        ],
      },
    ],
  },
  {
    id: "database",
    label: "Data Base",
    groups: [
      {
        title: "SQL",
        items: [
          { name: "PostgreSQL", icon: "Database" },
          { name: "MySQL", icon: "Database" },
          { name: "SQLite", icon: "HardDrive" },
        ],
      },
      {
        title: "NoSQL",
        items: [
          { name: "MongoDB", icon: "Leaf" },
          { name: "Redis", icon: "Zap" },
          { name: "Firebase", icon: "Flame" },
        ],
      },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    groups: [
      {
        title: "Cloud",
        items: [
          { name: "AWS", icon: "Cloud" },
          { name: "Google Cloud", icon: "CloudCog" },
          { name: "Azure", icon: "CloudLightning" },
          { name: "Vercel", icon: "Triangle" },
        ],
      },
      {
        title: "DevOps",
        items: [
          { name: "Docker", icon: "Container" },
          { name: "Kubernetes", icon: "Ship" },
          { name: "GitHub Actions", icon: "GitBranch" },
          { name: "Terraform", icon: "Layers" },
        ],
      },
    ],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    groups: [
      {
        title: "Tooling",
        items: [
          { name: "Python", icon: "Code2" },
          { name: "TensorFlow", icon: "Brain" },
          { name: "PyTorch", icon: "Flame" },
          { name: "OpenAI", icon: "Sparkles" },
        ],
      },
    ],
  },
];
