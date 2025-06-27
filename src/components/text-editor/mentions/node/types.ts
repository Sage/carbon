import type { Spread } from "lexical";

import { SerializedTextNode } from "lexical";

export type SerializedMentionNode = Spread<
  {
    mentionName: string;
    type: "mention";
    version: 1;
  },
  SerializedTextNode
>;
