import { Field } from "react-final-form";
import { MetaError } from "./MetaError";
export const InputForm = ({ name, validate, label, placeholder }) => {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 justify-center items-center">
            <label className="font-medium">{label}</label>
            <input
              {...input}
              type="text"
              placeholder={placeholder}
              className="border-1 border-black rounded p-3 shadow text-base w-full"
            />
          </div>
          <MetaError error={meta.error} touched={meta.touched} />
        </div>
      )}
    </Field>
  );
};
