export interface AIResponse {
  code: string;

  explanation: string;

  files?: {
    name: string;
    content: string;
  }[];
}