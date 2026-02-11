interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-[#6B9AC4] mt-2">{value}</p>
  </div>
);

export default StatCard;
