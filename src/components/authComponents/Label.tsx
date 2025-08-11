type Props = {
  children: string;
  elem: string;
};

export default function Label({ children, elem }: Props) {
  return (
    <label htmlFor={elem} className="block mb-1 font-semibold">
      {children}
    </label>
  );
}
