import { cn } from "@/lib/utils";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  type?: string;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  inputClassNames?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  label,
  placeholder,
  inputClassNames,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);

  return (
    <div>
      {label && <label className="block text-sm">{label}</label>}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id)}
        className={cn(
          "w-full p-3 my-2 outline-none rounded-md disabled:opacity-75 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700",
          errors[id] && "border-rose-400",
          inputClassNames
        )}
      />
      {message && <span className="text-sm text-red-400">{message}</span>}
    </div>
  );
};

export default FormField;
