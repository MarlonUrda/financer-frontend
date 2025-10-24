import type React from "react";
import type { Currency } from "../../types/AdminSchemas/Currency";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import CurrencyController from "../../api/CurrencyController";

interface CurrencyTableProps {
  currencies: Currency[];
  setCurrency: React.Dispatch<React.SetStateAction<Currency[]>>;
}

export const CurrencyTable = ({
  currencies,
  setCurrency,
}: CurrencyTableProps) => {
  const deleteMutation = useMutation({
    mutationFn: CurrencyController.DeleteCurrency,
    onSuccess: (data) => {
      setCurrency((prev) => prev.filter((c) => c.id !== data.currency));
      console.log("Currency deleted:", data.currency);
    },
    onError: (error) => {
      console.error("Error deleting currency:", error);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <Table className="bg-zinc-100 rounded-lg w-full">
      <TableCaption className="text-gray-400 font-bold pt-5">
        Currencies saved on the database
      </TableCaption>
      <TableHeader>
        <TableRow className="font-bold text-gray-800">
          <TableHead className="text-center font-bold">Coin</TableHead>
          <TableHead className="text-center font-bold">Code</TableHead>
          <TableHead className="text-center font-bold">Symbol</TableHead>
          <TableHead className="text-center font-bold">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currencies && currencies.length > 0 ? (
          currencies.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="text-zinc-700 text-center">
                {c.coin}
              </TableCell>
              <TableCell className="text-zinc-700 text-center">
                {c.code}
              </TableCell>
              <TableCell className="text-zinc-700 text-center">
                {c.symbol}
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <Button
                  variant="outline"
                  className="text-red-500 bg-red-50 hover:bg-red-100 hover:cursor-pointer transition-colors duration-100 ease-in"
                  onClick={() => handleDelete(c.id.toString())}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <motion.div className="flex items-center justify-center py-12">
            <p className="text-2xl font-bold text-zinc-900 text-center">
              No currencies found on db.
            </p>
          </motion.div>
        )}
      </TableBody>
    </Table>
  );
};
