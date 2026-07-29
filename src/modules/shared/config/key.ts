import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYS_DIR = path.resolve(__dirname, "../../../keys");

export const privateKey = fs.readFileSync(path.join(KEYS_DIR, "private.pem"), "utf-8");
export const publicKey = fs.readFileSync(path.join(KEYS_DIR, "public.pem"), "utf-8");