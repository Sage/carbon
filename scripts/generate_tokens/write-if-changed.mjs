import fs from "node:fs";
import path from "node:path";

export default function writeIfChanged(file, contents) {
  try {
    if (fs.readFileSync(file, "utf8") === contents) return;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}
