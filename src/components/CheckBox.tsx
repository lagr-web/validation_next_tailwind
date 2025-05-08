// src/components/Checkbox.tsx
import { InputHTMLAttributes } from "react";

type CheckboxProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ label, ...props }: CheckboxProps) => {
    return (
        <div className="mb-5">
            <span className="inline-flex items-center space-x-2">
                <input
                    type="checkbox"
                    {...props}
                    className="h-4 w-4"
                />
                <span className="text-sm text-gray-700">{label}</span>
            </span>

        </div>
    );
};

export default Checkbox;
