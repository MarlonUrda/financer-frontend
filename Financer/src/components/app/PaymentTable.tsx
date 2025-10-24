import { useMutation } from "@tanstack/react-query";
import type { PaymentType } from "../../types/AdminSchemas/PaymentTypes";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { motion } from "framer-motion";
import { PaymentTypesController } from "../../api/PaymentTypesController";
import type React from "react";

interface PaymentTypeBoardProps {
  paymentTypes: PaymentType[];
  setTypes: React.Dispatch<React.SetStateAction<PaymentType[]>>
}

export const PaymentTypeBoard = ({ paymentTypes, setTypes }: PaymentTypeBoardProps) => {
  const deleteMutation = useMutation({
    mutationFn: PaymentTypesController.deleteType,
    onSuccess: (data) => {
      setTypes(prev => prev.filter(pt => pt.id !== data.id))
      console.log(data.message);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <Table className="bg-zinc-100 rounded-lg w-full">
      <TableCaption className="text-gray-400 font-bold pt-5">
        Payment Types saved on database
      </TableCaption>
      <TableHeader>
        <TableRow className="font-bold text-zinc-800 text-center">
          <TableHead className="w-[200px] font-bold text-center">Payment Type</TableHead>
          <TableHead className="text-center font-bold">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paymentTypes && paymentTypes.length > 0 ? (
          paymentTypes.map((pt) => (
            <TableRow key={pt.id}>
              <TableCell className="text-zinc-700 text-center">
                {pt.type}
              </TableCell>
              <TableCell className="flex justify-center items-center">
                  <Button
                    variant="outline"
                    className="text-red-500 bg-red-50 hover:bg-red-100 hover:cursor-pointer transition-colors duration-100 ease-in"
                    onClick={() => handleDelete(pt.id.toString())}
                  >
                    Delete
                  </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <motion.div className="flex items-center justify-center py-12">
            <p className="text-2xl font-bold text-zinc-900 text-center">
              No payment types found.
            </p>
          </motion.div>
        )}
      </TableBody>
    </Table>
  );
};
