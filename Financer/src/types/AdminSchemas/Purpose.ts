import { z } from "zod";

export const PurposeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export interface Purpose {
  id: number;
  name: string;
}

export const getAllPurposesResponseSchema = z.object({
  message: z.string(),
  purposes: z.array(PurposeSchema),
});

export type getAllPurposesResponse = z.infer<
  typeof getAllPurposesResponseSchema
>;

export const getSinglePurposeResponseSchema = z.object({
  purpose: PurposeSchema,
  success: z.boolean(),
});

export type getSinglePurposeResponse = z.infer<
  typeof getSinglePurposeResponseSchema
>;

export interface AddPurposeRequest {
  name: string;
}

export const NewPurposeResponseSchema = z.object({
  message: z.string(),
  purpose: PurposeSchema,
});

export type NewPurposeResponse = z.infer<typeof NewPurposeResponseSchema>;

export const DeletePurposeResponseSchema = z.object({
  message: z.string(),
  id: z.preprocess((val) => Number(val), z.number()),
});

export type DeletePurposeResponse = z.infer<typeof DeletePurposeResponseSchema>;
