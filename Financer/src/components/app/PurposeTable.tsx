import { useMutation } from "@tanstack/react-query";
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
import type { Purpose } from "../../types/AdminSchemas/Purpose";
import PurposeController from "../../api/PurposeController";
import type React from "react";

interface PurposeTableProp {
  purposes: Purpose[];
  setPurposes: React.Dispatch<React.SetStateAction<Purpose[]>>;
}

export const PurposeBoard = ({ purposes, setPurposes }: PurposeTableProp) => {
  const deleteMutation = useMutation({
    mutationFn: PurposeController.DeletePurpose,
    onSuccess: (data) => {
      setPurposes((prev) => prev.filter((p) => p.id !== data.id));
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
        Purposes saved on database
      </TableCaption>
      <TableHeader>
        <TableRow className="font-bold text-amber-50 text-center">
          <TableHead className="w-[200px] font-bold">Purpose</TableHead>
          <TableHead className="text-center font-bold">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purposes && purposes.length > 0 ? (
          purposes.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="text-amber-50 text-left">
                {p.name}
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <Button
                  variant="outline"
                  className="text-amber-50 bg-red-700 hover:bg-red-900 hover:cursor-pointer"
                  onClick={() => handleDelete(p.id.toString())}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <motion.div className="flex-1 items-center justify-center py-12">
            <p className="text-2xl font-bold text-amber-50 text-center">
              No Purposes in db found.
            </p>
          </motion.div>
        )}
      </TableBody>
    </Table>
  );
};
