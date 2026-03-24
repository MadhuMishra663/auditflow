// components/policies/PoliciesByCategory.tsx

interface Category {
  name: string;
  count: number;
  active: number;
}

const defaultCategories: Category[] = [
  { name: "Security",   count: 2, active: 1 },
  { name: "Privacy",    count: 1, active: 1 },
  { name: "Finance",    count: 0, active: 0 },
  { name: "Operations", count: 0, active: 0 },
  { name: "HR",         count: 0, active: 0 },
  { name: "IT",         count: 0, active: 0 },
];

interface PoliciesByCategoryProps {
  categories?: Category[];
}

export default function PoliciesByCategory({
  categories = defaultCategories,
}: PoliciesByCategoryProps) {
  return (
    <div
      className="w-full rounded-2xl p-6"
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E0DBF8"}}
    >
      <h2 className="text-base font-medium text-gray-800 mb-5">
        Policies by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-xl px-5 py-4 flex flex-col gap-4"
            style={{ border: "1.5px solid #B7ACF5" }}
          >
            {/* Top row: name + badge */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-gray-800">
                {cat.name}
              </span>
              <span
                className="text-sm font-medium text-white rounded-full w-8 h-8 flex items-center justify-center"
                style={{ backgroundColor: "#9D8FF0" }}
              >
                {cat.count}
              </span>
            </div>

            {/* Active count */}
            <p className="text-sm" style={{ color: "#6F7275" }}>
              {cat.active} active
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}