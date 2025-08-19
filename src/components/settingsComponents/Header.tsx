export default function Header({
  children,
  headerTitle,
}: {
  children?: string;
  headerTitle?: string;
}) {
  return (
    <div className="bg-gray-700 px-8 py-6 border-b border-gray-600">
      <h1 className="text-3xl font-bold">{headerTitle}</h1>
      <p className="text-gray-300 mt-2">
        {children || "Manage your settings and preferences here."}
      </p>
    </div>
  );
}
