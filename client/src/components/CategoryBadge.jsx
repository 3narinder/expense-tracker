import { lucideIconByName } from "../utils/icons.js";

const dimensionMap = {
  sm: { box: "h-8 w-8", icon: 14 },
  md: { box: "h-9 w-9", icon: 16 },
  lg: { box: "h-12 w-12", icon: 22 },
};

const CategoryBadge = ({ name, icon, color, size = "md" }) => {
  const Icon = lucideIconByName(icon);
  const { box, icon: iconSize } = dimensionMap[size];
  const baseColor = color || "#71717a";

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={`${box} rounded-lg flex items-center justify-center shrink-0 transition-colors`}
        style={{
          backgroundColor: baseColor + "15",
          borderColor: baseColor + "20",
        }}
      >
        <Icon size={iconSize} style={{ color: baseColor }} strokeWidth={1.75} />
      </div>
      {name && (
        <span className="font-medium text-sm text-(--color-text-main) truncate">
          {name}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
