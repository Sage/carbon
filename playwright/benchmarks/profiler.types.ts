export interface ProfileCommit {
  phase: "mount" | "update" | "nested-update";
  actualDurationMs: number;
  baseDurationMs: number;
  startTimeMs: number;
  commitTimeMs: number;
}

export interface ProfileSample {
  commitCount: number;
  actualDurationMs: number;
  commits: ProfileCommit[];
}
