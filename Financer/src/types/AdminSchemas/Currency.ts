import { z } from "zod";

export const CurrencySchema = z.object({
  id: z.number(),
  coin: z.string(),
  code: z.string(),
  symbol: z.string(),
});

export interface Currency {
  id: number;
  coin: string;
  code: string;
  symbol: string;
}

export const getAllCurrencies = z.object({
  currencies: z.array(CurrencySchema),
});

export type GetAllCurrencies = z.infer<typeof getAllCurrencies>;

export interface CreateCurrency {
  coin: string;
  code: string;
  symbol: string;
}

export const CreateCurrencyResponseSchema = z.object({
  message: z.string(),
  currency: z.boolean(),
});

export type CreateCurrencyResponse = z.infer<
  typeof CreateCurrencyResponseSchema
>;

export const DeleteCurrencyResponseSchema = z.object({
  message: z.string(),
  currency: z.number(),
});

export type DeleteCurrencyResponse = z.infer<
  typeof DeleteCurrencyResponseSchema
>;
