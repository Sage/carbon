import React from "react";
import styled from "styled-components";
import Markdown from "react-markdown";

interface TranslationDataItem {
  name: string;
  type: string;
  description: string;
  returnType: string;
}

interface TranslationKeysTableProps {
  translationData: TranslationDataItem[];
}

const TranslationKeysTable = ({
  translationData,
}: TranslationKeysTableProps) => {
  return (
    <StyledTable className="docblock-argstable sb-unstyled">
      <thead className="docblock-argstable-head">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody className="docblock-argstable-body">
        {translationData.map((item, index) => (
          <tr key={index}>
            <td>
              <strong>{item.name}</strong>
            </td>
            <td>
              <Markdown components={{ p: "span" }}>{item.description}</Markdown>
            </td>
            <td>
              <div>
                <span>
                  <strong>{item.type}</strong>
                </span>
              </div>
              <div>
                <span>expects {item.returnType} to be returned</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  border-spacing: 0;
  color: #2e3438;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  width: 100%;
  margin: 25px 1px 40px;

  tbody {
    -webkit-filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));

    & > tr:first-of-type > td:first-of-type {
      border-top-left-radius: 4px;
    }
    & > tr:first-of-type > td:last-of-type {
      border-top-right-radius: 4px;
    }
    & > tr:last-of-type > td:first-of-type {
      border-bottom-left-radius: 4px;
    }
    & > tr:last-of-type > td:last-of-type {
      border-bottom-right-radius: 4px;
    }

    & > tr:last-of-type > * {
      border-block-end: 1px solid hsla(203, 50%, 30%, 0.15);
    }

    & > tr > *:first-of-type {
      border-inline-start: 1px solid hsla(203, 50%, 30%, 0.15);
    }

    & > tr:first-of-type > * {
      border-block-start: 1px solid hsla(203, 50%, 30%, 0.15);
    }

    & > tr > * {
      background: #ffffff;
      border-top: 1px solid hsla(203, 50%, 30%, 0.15);
    }
  }

  td,
  th {
    border: none;
    vertical-align: top;
    text-overflow: ellipsis;
  }

  th:first-of-type,
  td:first-of-type {
    padding-left: 20px;
    width: 25%;
  }

  td {
    padding: 10px 15px;
  }

  th {
    color: rgba(46, 52, 56, 0.75);
    padding: 10px 15px;
  }
`;

export default TranslationKeysTable;
