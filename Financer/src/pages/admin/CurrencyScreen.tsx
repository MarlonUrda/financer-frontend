import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useEffect, useState } from "react";
import type { Currency } from "../../types/AdminSchemas/Currency";
import { useMutation } from "@tanstack/react-query";
import CurrencyController from "../../api/CurrencyController";
import { InputDialog } from "../../components/app/InputDialog";
import { CurrencyTable } from "../../components/app/CurrencyTable";

export const CurrencyScreen = () => {
  const inp = [
    {
      label: "Currency Name",
      placeholder: "Dollars",
      id: "coin",
    },
    {
      label: "Currency Code",
      placeholder: "USD",
      id: "code",
    },
    {
      label: "Currency Symbol",
      placeholder: "$",
      id: "symbol",
    },
  ];

  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const fetchCurrencies = useMutation({
    mutationFn: CurrencyController.getAllCurrencies,
    onSuccess: (data) => {
      setCurrencies(data.currencies);
    },
    onError: (error) => {
      console.error("Error fetching currencies:", error);
    },
  });

  const sendCurrencyToAPI = useMutation({
    mutationFn: CurrencyController.NewCurrency,
    onSuccess: (data) => {
      console.log("Currency created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating currency:", error);
    },
  });

  const handleDataSubmit = (val: { [key: string]: string }) => {
    console.log(val);

    const tempCurrency: Currency = {
      id: Date.now(),
      coin: val.coin,
      code: val.code,
      symbol: val.symbol,
    };

    setCurrencies((prev) => [...prev, tempCurrency]);

    try {
      sendCurrencyToAPI.mutate({
        coin: val.coin,
        code: val.code,
        symbol: val.symbol,
      });
    } catch (error) {
      console.error("Error creating currency:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies.mutate();
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="flex items-center justify-center min-h-screen"
    >
      <Card className="bg-white backdrop-blur-sm shadow-2xl w-[100%]">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-zinc-900 text-center">
            Currencies
          </CardTitle>
          <CardDescription className="text-sm text-zinc-600 text-center">
            Manage your currencies efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div className="flex flex-col items-center justify-center pt-4 gap-6">
            <InputDialog
              triggerText="Add Currency"
              title="New Currency"
              inputParam={inp}
              OnSubmit={handleDataSubmit}
            />

            <CurrencyTable
              currencies={currencies}
              setCurrency={setCurrencies}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
