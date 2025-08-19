interface ProfileHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  icon,
  title,
  subtitle,
  onBack,
}) => (
  <div className="flex justify-between items-start mb-8">
    <h1 className="text-4xl font-bold flex items-center gap-4">
      {icon}
      <div>
        <div>{title}</div>
        {subtitle && <p className="text-blue-400">{subtitle}</p>}
      </div>
    </h1>
    <button
      onClick={onBack}
      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
    >
      Back
    </button>
  </div>
);

export default ProfileHeader;
