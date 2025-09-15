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
import type { Purpose } from "../../types/AdminSchemas/Purpose";
import PurposeController from "../../api/PurposeController";
import { PurposeBoard } from "../../components/app/PurposeTable";

export const PurposesScreen = () => {
  const inp = {
    label: "New Purpose",
    placeholder: "Groseries...",
    id: "name",
  };

  // const [data, setData] = useState<{ [key: string]: string } | null>(null);
  const [purposes, setPurposes] = useState<Purpose[]>([]);

  const fetchPurposes = useMutation({
    mutationFn: PurposeController.getAllPurposes,
    onSuccess: (data) => {
      setPurposes(data.purposes);
    },
    onError: (error) => {
      console.error("Error fetching purposes from db:", error);
    },
  });

  const sendPurposetoAPI = useMutation({
    mutationFn: PurposeController.AddNewPurpose,
    onSuccess: (data) => {
      console.log("New purpose saved:", data);
    },
    onError: (error) => {
      console.error("Error adding new purpose:", error);
    },
  });

  useEffect(() => {
    fetchPurposes.mutate();
  }, []);

  const handleData = (val: { [key: string]: string }) => {
    console.log("Input Value from Parent:", JSON.stringify(val));

    const newPurpose = val.name.trim();

    const tempPurpose: Purpose = {
      id: 2,
      name: newPurpose,
    };

    console.log("NEW PURPOSE: ", tempPurpose);

    setPurposes((prev) => [...prev, tempPurpose]);

    try {
      sendPurposetoAPI.mutate({ name: newPurpose });
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
            Admin Purposes
          </CardTitle>
          <CardDescription className="text-sm text-gray-400 text-center">
            Manage and configure the payment purposes of the app
          </CardDescription>
          <CardContent>
            <motion.div className="flex flex-col items-center justify-center pt-4 gap-6">
              <InputDialog
                triggerText="Add New Purpose"
                title="New Purpose"
                inputParam={inp}
                OnSubmit={handleData}
              />
              <PurposeBoard purposes={purposes} setPurposes={setPurposes} />
            </motion.div>
          </CardContent>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
