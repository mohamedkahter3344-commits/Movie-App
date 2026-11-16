import type { ChangeEvent } from "react";
import { Label, Select } from "flowbite-react";
import { SlidersHorizontal } from "lucide-react";

interface CategoryOption {
  value: string;
  label: string;
}

interface CategoryFilterProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: CategoryOption[];
  id: string;
}

const CategoryFilter = ({
  value,
  onChange,
  label,
  options,
  id,
}: CategoryFilterProps) => {
  return (
    <div className="w-full lg:w-72">
      <Label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-sm font-semibold text-(--text-primary)"
      >
        <SlidersHorizontal size={16} className="text-red-500" />
        {label}
      </Label>

      <Select id={id} value={value} onChange={onChange} className="w-full">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <p className="mt-2 text-xs text-(--text-secondary)">
        Choose a category to explore
      </p>
    </div>
  );
};

export default CategoryFilter;
