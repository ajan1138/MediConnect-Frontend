export default function Button({ children }: { children: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-green-400 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      {children}
    </button>
  );
}
