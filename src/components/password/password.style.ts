import styled from "styled-components";
import { PasswordProps } from "./password.component";
import TextInput from "../text-input";
import visuallyHiddenStyles from "../../style/utils/visually-hidden";

const StyledPassword = styled(TextInput)<PasswordProps>``;

const HiddenAriaLive = styled.p`
  ${visuallyHiddenStyles}
`;

export { StyledPassword, HiddenAriaLive };
