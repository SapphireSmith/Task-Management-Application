
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    deadline: string; // ISO date string
  }
  