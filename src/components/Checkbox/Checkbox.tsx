function Checkbox({
  label,
  name,
  id,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="checkbox_label" form={id}>
      {label}
      <input
        type="checkbox"
        className="checkbox_input"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}

export default Checkbox;
