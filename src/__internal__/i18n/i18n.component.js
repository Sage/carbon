import PropTypes from "prop-types";
import useTranslation from "../../hooks/__internal__/useTranslation";

const I18n = ({ params }) => {
  const t = useTranslation();

  return t(...params);
};

I18n.propTypes = {
  params: PropTypes.array.isRequired,
};

export default I18n;
