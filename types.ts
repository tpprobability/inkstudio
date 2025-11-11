export interface GeneratedCode {
  fileName: string;
  language: string;
  code: string;
}

export interface BotConfig {
  platform: string;
  language: string;
  description: string;
  features: string;
}

export interface BotBuild {
    id: string;
    userId: string;
    config: BotConfig;
    files: GeneratedCode[];
    createdAt: string;
}