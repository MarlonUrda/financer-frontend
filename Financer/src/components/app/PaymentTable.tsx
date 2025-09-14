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

interface PaymentTypeBoardProps {
  paymentTypes: PaymentType[];
}

export const PaymentTypeBoard = ({ paymentTypes }: PaymentTypeBoardProps) => {
  const deleteMutation = useMutation({
    mutationFn: PaymentTypesController.deleteType,
    onSuccess: (data) => {
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
    <Table className="bg-gray-800">
      <TableCaption className="text-gray-400 font-bold pt-5">
        Payment Types saved on database
      </TableCaption>
      <TableHeader>
        <TableRow className="font-bold text-amber-50 text-center">
          <TableHead className="w-[200px] font-bold">Payment Type</TableHead>
          <TableHead className="text-center font-bold">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paymentTypes && paymentTypes.length > 0 ? (
          paymentTypes.map((pt) => (
            <TableRow key={pt.id}>
              <TableCell className="text-amber-50 text-left">
                {pt.type}
              </TableCell>
              <TableCell>
                <motion.div className="flex flex-row justify-between gap-4">
                  <Button
                    variant="outline"
                    className="text-amber-50 bg-red-700 hover:bg-red-900 hover:cursor-pointer"
                    onClick={() => handleDelete(pt.id.toString())}
                  >
                    Delete
                  </Button>
                </motion.div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <motion.div className="flex-1 items-center justify-center py-12">
            <p className="text-2xl font-bold text-amber-50 text-center">
              No payment types found.
            </p>
          </motion.div>
        )}
      </TableBody>
    </Table>
  );
};
