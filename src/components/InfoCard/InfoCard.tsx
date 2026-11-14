 const InfoCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => {
  return (
    <div className="group rounded-2xl border border-(--border-color) bg-(--bg-secondary) p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-xl">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/10 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
        {icon}
      </div>

      <p className="mb-2 text-sm text-(--text-secondary)">
        {title}
      </p>

      <h3 className="wrap-break-word text-lg font-bold text-(--text-primary)">
        {value}
      </h3>
    </div>
  );
};

export default InfoCard;