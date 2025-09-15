import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { useCallback, useState } from "react";
import { set } from "react-hook-form";

interface InputParam {
  label: string;
  placeholder?: string;
  id: string;
}

interface InputDialogProps {
  triggerText: string;
  title: string;
  inputParam: InputParam | InputParam[];
  OnSubmit?: (values: { [key: string]: string }) => void;
}

export const InputDialog = ({
  triggerText,
  title,
  inputParam,
  OnSubmit,
}: InputDialogProps) => {
  const initialValues = Array.isArray(inputParam)
    ? inputParam.reduce((acc, param) => ({ ...acc, [param.id]: "" }), {})
    : { [inputParam.id]: "" };

  const [val, setVal] = useState<{ [key: string]: string }>(initialValues);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = useCallback((id: string, value: string) => {
    setVal((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const pure = Object.values(val).filter((v) => v.trim() !== "");
      console.log("Filtered Value:", pure);
      setOpen(false);
      OnSubmit?.(val);
    },
    [val, OnSubmit]
  );

  const resetForm = useCallback(() => {
    setVal(initialValues);
  }, [initialValues]);

  return (
    <motion.div>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-amber-50 hover:cursor-pointer"
          >
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black">
          <DialogHeader>
            <DialogTitle className="text-amber-50 text-center font-bold">
              {title}
            </DialogTitle>
          </DialogHeader>
          <motion.form onSubmit={handleSubmit}>
            <motion.div className="grid gap-4 py-4">
              {Array.isArray(inputParam) ? (
                inputParam.map((param) => (
                  <motion.div
                    className="grid gap-3 text-amber-50"
                    key={param.id}
                  >
                    <Label htmlFor={param.id}>{param.label}</Label>
                    <Input
                      id={param.id}
                      name={param.id}
                      placeholder={param.placeholder}
                      className=" focus:border-amber-500 focus:ring-amber-500"
                      value={val[param.id]}
                      onChange={(e) => handleChange(param.id, e.target.value)}
                      required
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div className="grid gap-3 text-amber-50">
                  <Label htmlFor={inputParam.id}>{inputParam.label}</Label>
                  <Input
                    id={inputParam.id}
                    name={inputParam.id}
                    placeholder={inputParam.placeholder || ""}
                    className=" focus:border-amber-500 focus:ring-amber-500"
                    onChange={(e) =>
                      handleChange(inputParam.id, e.target.value)
                    }
                    value={val[inputParam.id]}
                    required
                  />
                </motion.div>
              )}
            </motion.div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="text-amber-50 hover:cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="text-amber-50 hover:cursor-pointer"
              >
                Create Type
              </Button>
            </DialogFooter>
          </motion.form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
