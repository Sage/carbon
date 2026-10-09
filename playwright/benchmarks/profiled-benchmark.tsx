import React, { Profiler, useRef } from "react";
import type { ProfileCommit } from "./profiler.types";

/** DOM attributes bridge the browser collector to the Node-side runner. */
const ProfiledBenchmark = ({ children }: { children: React.ReactNode }) => {
  const resultRef = useRef<HTMLOutputElement>(null);
  // React's Profiler callback has six positional parameters.
  const onRender: React.ProfilerOnRenderCallback = (
    _id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    // eslint-disable-next-line max-params
  ) => {
    const result = resultRef.current;
    if (!result) return;
    result.dataset.ready = "true";
    if (result.dataset.active !== "true") return;

    const commits: ProfileCommit[] = JSON.parse(result.dataset.commits ?? "[]");
    commits.push({
      phase,
      actualDurationMs: actualDuration,
      baseDurationMs: baseDuration,
      startTimeMs: startTime,
      commitTimeMs: commitTime,
    });
    result.dataset.commits = JSON.stringify(commits);
  };

  return (
    <>
      <output hidden ref={resultRef} data-benchmark-profile />
      <Profiler id="benchmark-fixture" onRender={onRender}>
        {children}
      </Profiler>
    </>
  );
};

export default ProfiledBenchmark;
