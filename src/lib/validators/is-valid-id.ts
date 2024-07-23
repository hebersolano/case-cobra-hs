import { isCuid } from "@paralleldrive/cuid2";

export default function isValidId(id: string): boolean {
  return isCuid(id);
}
