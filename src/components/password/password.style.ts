import styled from "styled-components";
import { PasswordProps } from "./password.component";
import Textbox from "../textbox";
import visuallyHiddenStyles from "../../style/utils/visually-hidden";

const StyledPassword = styled(Textbox)<PasswordProps>``;

const HiddenAriaLive = styled.p`
  ${visuallyHiddenStyles}
`;

export { StyledPassword, HiddenAriaLive };
