import mcr from "monocart-coverage-reports";
import { coverageOptions } from "./helpers/base-test.js";

export default async () => {
  await mcr(coverageOptions).generate();
};
