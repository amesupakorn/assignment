export interface Transformed {
    [department: string]: {
      male: number;
      female: number;
      ageRange: string;
      hair: Record<string, number>;
      addressUser: Record<string, string>;
    };
  }