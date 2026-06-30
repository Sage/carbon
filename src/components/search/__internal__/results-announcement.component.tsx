import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import visuallyHiddenStyles from "../../../style/utils/visually-hidden";
import useDebounce from "../../../hooks/__internal__/useDebounce";

const ResultsAnnouncementContainer = styled.div`
  ${visuallyHiddenStyles}
`;

export type ResultsAnnouncementProps = {
  announcement?: string;
  searchValue?: string;
  delay?: number;
};

const ResultsAnnouncement = ({
  announcement,
  searchValue,
  delay = 1500,
}: ResultsAnnouncementProps) => {
  const [content, setContent] = useState("");
  const [useFirstLiveRegion, setUseFirstLiveRegion] = useState(false);
  const hasCommittedAnnouncement = useRef(false);

  const updateAnnouncement = useDebounce((nextAnnouncement: string) => {
    setContent(nextAnnouncement);
    setUseFirstLiveRegion((previousValue) => !previousValue);
  }, delay);

  useEffect(() => {
    if (!announcement) {
      updateAnnouncement.cancel();
      setContent("");
      hasCommittedAnnouncement.current = false;
      return;
    }

    if (!hasCommittedAnnouncement.current) {
      setContent(announcement);
      setUseFirstLiveRegion((previousValue) => !previousValue);
      hasCommittedAnnouncement.current = true;
      return;
    }

    updateAnnouncement(announcement);
  }, [announcement, searchValue, updateAnnouncement]);

  return (
    <ResultsAnnouncementContainer>
      <div role="status" aria-live="polite" aria-atomic="true">
        {useFirstLiveRegion ? content : ""}
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {!useFirstLiveRegion ? content : ""}
      </div>
    </ResultsAnnouncementContainer>
  );
};

export default ResultsAnnouncement;
