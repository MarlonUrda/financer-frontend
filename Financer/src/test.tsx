import { motion } from "framer-motion"
import { Button } from "./components/ui/button"
import { Link, useRouter } from "@tanstack/react-router"

export const TestPanel = () => {

  const router = useRouter()

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div layout className="grid grid-cols-1 gap-4 p-4 w-100">
        <Button variant="outline">
          <Link to="/admin/payment-types" className="text-amber-50">
            Payment Types
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}