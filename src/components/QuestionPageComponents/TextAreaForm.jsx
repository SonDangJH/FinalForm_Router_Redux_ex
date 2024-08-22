import { MetaError } from "./MetaError";
export const TextAreaForm = ({ input, meta }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <label className="font-medium">Answer</label>
        <textarea
          {...input}
          placeholder="Type your answer ..."
          rows="13"
          cols="50"
          style={{ resize: "none" }}
          className="border-1 border-black rounded p-3 shadow text-base w-full"
        />
      </div>
      <MetaError error={meta.error} touched={meta.touched} />
    </div>
  );
};
