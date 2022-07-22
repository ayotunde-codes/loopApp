export type Difficulty = "easy" | "normal" | "hard";

export type SequenceType = "exercise" | "stretch" | "break";

export interface Workout {
  slug: string;
  name: string;
  duration: number;
  difficulty: Difficulty;
  sequence: Array<ExerciseSequenceItem>;
}

export interface ExerciseSequenceItem {
  slug: string;
  name: string;
  duration: number;
  type: SequenceType;
  reps?: number;
}
