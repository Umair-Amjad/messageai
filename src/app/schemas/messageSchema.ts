import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(
      10,
      { message: "content must be min 6 character" })
      .max(300, {
        message: "content must be 300 charaacter",
      })
});
