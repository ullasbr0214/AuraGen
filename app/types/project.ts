export interface Project {
  id: string;

  title: string;

  prompt: string;

  code: string;

  framework?: "React" | "Next.js" | "HTML";

  language?: "TypeScript" | "JavaScript";

  createdAt: string;

  updatedAt?: string;

  favorite?: boolean;

  tags?: string[];

  previewImage?: string;

  aiModel?: string;
}