import { CompositeDecorator } from "draft-js";
import linkDecorator from "./link-decorator";

export default new CompositeDecorator([linkDecorator]);
