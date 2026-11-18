import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives the file input's polite live region. Announcing the same message
 * twice in a row clears the region first and refills it two frames later,
 * so screen readers treat the repeat as a new announcement. A message stays
 * until the next announcement or `clearStatusAnnouncement`.
 */
export default function useStatusAnnouncement(): {
  statusAnnouncement: string;
  announceStatus: (message: string) => void;
  clearStatusAnnouncement: () => void;
} {
  const [statusAnnouncement, setStatusAnnouncement] = useState("");
  const lastMessageRef = useRef("");
  const frameRef = useRef<number>();

  const cancelPendingFrame = useCallback(() => {
    if (frameRef.current !== undefined) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }
  }, []);

  const clearStatusAnnouncement = useCallback(() => {
    cancelPendingFrame();
    lastMessageRef.current = "";
    setStatusAnnouncement("");
  }, [cancelPendingFrame]);

  const announceStatus = useCallback(
    (message: string) => {
      cancelPendingFrame();

      if (lastMessageRef.current !== message) {
        lastMessageRef.current = message;
        setStatusAnnouncement(message);
        return;
      }

      setStatusAnnouncement("");
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = requestAnimationFrame(() => {
          setStatusAnnouncement(message);
          frameRef.current = undefined;
        });
      });
    },
    [cancelPendingFrame],
  );

  useEffect(() => cancelPendingFrame, [cancelPendingFrame]);

  return { statusAnnouncement, announceStatus, clearStatusAnnouncement };
}
