import Label from "../authComponents/Label";

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  onChange,
  error,
  className = "",
  id = "password",
  name = "password",
}) => {
  return (
    <div>
      <Label elem={id}>Password</Label>
      <input
        type="password"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
          error ? "border-red-500 border-2" : ""
        } ${className}`}
      />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default InputPassword;
