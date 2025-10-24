import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Link } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";

export const TestPanel = () => {
  // const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-center items-center space-x-2 mb-8 mt-8">
        <div className="bg-zinc-200 p-2 rounded-lg">
          <DollarSign size={24} className="text-zinc-700" />
        </div>
        <span className="text-3xl tracking-tight font-bold text-zinc-900">
          Financer
        </span>

      </div>
      <p className="text-center">Testing panel for admin users. (Temporal)</p>
      <motion.div layout className="grid grid-cols-2 gap-4 p-4 w-full">
        <Button
          variant="outline"
          className="bg-blue-50 hover:bg-blue-100 hover:cursor-pointer transition-colors duration-100 ease-in"
        >
          <Link to="/admin/payment-types" className="text-blue-500">
            Payment Types
          </Link>
        </Button>
        <Button
          variant="outline"
          className="bg-green-50 hover:bg-green-100 hover:cursor-pointer transition-colors duration-100 ease-in"
        >
          <Link to="/admin/purpose" className="text-green-500">
            Purpose
          </Link>
        </Button>
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100 hover:cursor-pointer transition-colors duration-100 ease-in"
        >
          <Link to="/admin/currencies" className="text-red-500">
            Currency
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};
