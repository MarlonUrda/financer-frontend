import { useEffect, useState } from "react";
import { InputDialog } from "../../components/app/InputDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { PaymentTypesController } from "../../api/PaymentTypesController";
import type { PaymentType } from "../../types/AdminSchemas/PaymentTypes";
import { PaymentTypeBoard } from "../../components/app/PaymentTable";

export const PayTypesScreen = () => {
  const inp = {
    label: "New Type",
    placeholder: "Enter payment type",
    id: "type",
  };

  // const [data, setData] = useState<{ [key: string]: string } | null>(null);
  const [types, setTypes] = useState<PaymentType[]>([]);

  const fetchTypes = useMutation({
    mutationFn: PaymentTypesController.getAllTypes,
    onSuccess: (data) => {
      setTypes(data);
    },
    onError: (error) => {
      console.error("Error fetching payment types:", error);
    },
  });

  const sendTypetoAPI = useMutation({
    mutationFn: PaymentTypesController.newType,
    onSuccess: (data) => {
      console.log("New payment type created:", data);
    },
    onError: (error) => {
      console.error("Error creating new payment type:", error);
    },
  });

  useEffect(() => {
    fetchTypes.mutate();
  }, []);

  const handleData = (val: { [key: string]: string }) => {
    console.log("Input Value from Parent:", JSON.stringify(val));

    const newType = val.type.trim();

    const tempType: PaymentType = {
      id: 2,
      type: newType,
    };

    setTypes((prev) => [...prev, tempType]);

    try {
      sendTypetoAPI.mutate({ type: newType });
    } catch (error) {
      console.error("Error sending payment type to API:", error);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen"
    >
      <Card className="bg-gray-900 border-gray-800 backdrop-blur-sm shadow-2xl w-[100%]">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-amber-50 text-center">
            Admin Payment Types
          </CardTitle>
          <CardDescription className="text-sm text-gray-400 text-center">
            Manage and configure the payment types of the app
          </CardDescription>
          <CardContent>
            <motion.div className="flex flex-col items-center justify-center pt-4 gap-6">
              <InputDialog
                triggerText="Add Payment Type"
                title="New Payment Type"
                inputParam={inp}
                OnSubmit={handleData}
              />
              <PaymentTypeBoard paymentTypes={types} />
            </motion.div>
          </CardContent>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
