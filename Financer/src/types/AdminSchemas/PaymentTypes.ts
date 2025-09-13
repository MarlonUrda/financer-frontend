import { z } from "zod";

export const PaymentTypeSchema = z.object({
  id: z.number(),
  type: z.string()
});

export interface PaymentType {
  id: number
  type: string;
}

export const AllTypesResponseSchema = z.array(PaymentTypeSchema)

export type AllTypesResponse = z.infer<typeof AllTypesResponseSchema>;

export const SingleTypeResponseSchema = z.object({
  type: PaymentTypeSchema
})

export type SingleTypeResponse = z.infer<typeof SingleTypeResponseSchema>;

export interface NewPaymentTypeRequest {
  type: string;
}

export const NewPaymentResponseSchema = z.object({
  message: z.string(),
  success: z.boolean()
})

export type NewPaymentResponse = z.infer<typeof NewPaymentResponseSchema>

export const DeletePaymentTypeResponseSchema = z.object({
  message: z.string(),
  success: z.boolean()
})

export type DeletePaymentTypeResponse = z.infer<typeof DeletePaymentTypeResponseSchema>
