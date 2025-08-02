import { z } from "zod";
import "../src";

/**
 * These schemas are used to demonstrate the functionality of zod-to-d2.
 * They are not part of the core library and can be modified or replaced as needed.
 * They are used on the README.md file to show how to use the library.
 */

export const userSchema = z
  .object({
    id: z.string().primaryKey(), //<-- marks the 'id' property as a PK
    name: z.string().notes("The name of the user"), //<-- includes comments on this property on the output diagram
    email: z.string(),
  })
  .tableName("users");

export const postSchema = z
  .object({
    id: z.string().primaryKey(),
    authorId: z.string().foreignKey(userSchema, "id"), //<- creates a FK relationship to the 'id' property of the 'userSchema'
    content: z.string(),
  })
  .tableName("posts");
