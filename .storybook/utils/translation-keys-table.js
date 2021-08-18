import React from "react";
import PropTypes from "prop-types";
import { ArgsTable } from "@storybook/components";

const generateTranslationRows = (translationData) => {
  return translationData.map(({ name, description, type, returnType }) => ({
    name: name,
    description,
    type: {
      summary: type,
      detail: `expects ${returnType} to be returned`,
    },
  }));
};

const TranslationKeysTable = ({ translationData }) => (
  <ArgsTable rows={generateTranslationRows(translationData)} />
);

TranslationKeysTable.propTypes = {
  translationData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      returnType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TranslationKeysTable;
