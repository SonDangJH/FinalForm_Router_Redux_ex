export const RadioComponent = ({
  label,
  input,
  value,
  defaultChecked,
  checked,
}) => {
  return (
    <div className="flex flex-row gap-3">
      <label className="font-medium">{label}</label>
      <input
        {...input}
        type="radio"
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
      />
    </div>
  );
};
