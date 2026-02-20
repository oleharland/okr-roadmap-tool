import { cn } from "@/lib/utils";

interface AvatarGroupProps {
  names: string[];
  max?: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-primary-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function AvatarGroup({ names, max = 3 }: AvatarGroupProps) {
  const visible = names.slice(0, max);
  const overflow = names.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((name) => (
        <div
          key={name}
          title={name}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white ring-2 ring-white",
            colorForName(name)
          )}
        >
          {getInitials(name)}
        </div>
      ))}
      {overflow > 0 && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-neutral-600 bg-neutral-200 ring-2 ring-white">
          +{overflow}
        </div>
      )}
    </div>
  );
}
