import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";

authTables;

const schema = defineSchema({
  ...authTables,
});

export default schema;
