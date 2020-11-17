import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { setup } from "./mock-match-media";

setup();
Enzyme.configure({ adapter: new Adapter() });
