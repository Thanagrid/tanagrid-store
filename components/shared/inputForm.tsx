import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface inputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    id: string,
    required?: boolean
}

const InputForm = ({label, id, required=false, ...props}: inputFormProps) => {
  return (
    <div className="flex flex-col gap-y-2">
        <Label>{label}{required && <span className="text-red-500">*</span>}</Label>
        <Input id={id} name={id} {...props} />
    </div>
  )
}

export default InputForm
