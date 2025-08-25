const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 border-b border-gray-700 py-2">
    <span className="text-gray-400">{icon}</span>
    <span className="font-semibold">{label}:</span>
    <span className="ml-1">{value}</span>
  </div>
);

export default InfoRow;
