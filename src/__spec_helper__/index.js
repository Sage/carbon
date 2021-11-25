import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { setup } from "./mock-match-media";
import setupResizeObserverMock from "./mock-resize-observer";

require("jest-fetch-mock").enableMocks();

setupResizeObserverMock();
setup();
Enzyme.configure({ adapter: new Adapter() });
