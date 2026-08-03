import SectionCard from "../../../../components/ui/SectionCard";
import { Field } from "../../../../components/ui/Field";
import TextInput from "../../../../components/ui/TextInput";
import Select from "../../../../components/ui/Select";

import { Package } from "lucide-react";

const InventorySection = ({
  formData,
  handleChange,
  units = [],
  isLoading,
}) => {
  return (
    <SectionCard
      title="Inventory"
      icon={<Package size={18} />}
    >
      <div className="grid md:grid-cols-3 gap-4">

        {/* Initial Stock */}

        <Field
          label="Initial Stock"
          required
        >
          <TextInput
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            type="number"
          />
        </Field>

        {/* Unit */}

        <Field label="Unit" required>
          <Select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">
              {isLoading
                ? "Loading Units..."
                : "Select Unit"}
            </option>

            {units.map((unit) => (
              <option
                key={unit._id}
                value={unit._id}
              >
                {unit.name}
              </option>
            ))}
          </Select>
        </Field>

        {/* Reorder Level */}

        <Field label="Reorder Level">
          <TextInput
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={handleChange}
            type="number"
          />
        </Field>

        {/* Warehouse */}

        <Field
          label="Location / Warehouse"
          className="md:col-span-2"
        >
          <Select disabled>
            <option>
              Select warehouse
            </option>
          </Select>
        </Field>

        {/* Track Stock */}

        <div className="flex items-end">
          <label className="flex gap-2 items-center">

            <input
              type="checkbox"
              defaultChecked
            />

            <span>Track stock</span>

          </label>
        </div>

      </div>
    </SectionCard>
  );
};

export default InventorySection;