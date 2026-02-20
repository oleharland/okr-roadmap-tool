"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Layers, Settings } from "lucide-react";
import { useProductStore } from "@/stores/useProductStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/alignment", label: "Alignment", icon: Layers },
];

const PRODUCT_COLORS: Record<string, string> = {
  blue: "bg-primary-500",
  green: "bg-green-500",
  purple: "bg-violet-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

export default function Sidebar() {
  const pathname = usePathname();
  const products = useProductStore((s) => s.products);

  return (
    <aside className="w-60 bg-neutral-950 text-neutral-300 flex flex-col h-screen shrink-0">
      <div className="p-4 border-b border-neutral-800">
        <h1 className="text-lg font-bold text-white tracking-tight">
          OKR Roadmap
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <div className="px-3 mb-1">
          <span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
            Company
          </span>
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-neutral-800 text-white"
                  : "hover:bg-neutral-800/50 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="px-3 mt-5 mb-1">
          <span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
            Products
          </span>
        </div>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
              pathname === `/products/${product.id}`
                ? "bg-neutral-800 text-white"
                : "hover:bg-neutral-800/50 hover:text-white"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                PRODUCT_COLORS[product.color] || "bg-neutral-500"
              )}
            />
            {product.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-neutral-800 p-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors",
            pathname === "/settings"
              ? "bg-neutral-800 text-white"
              : "hover:bg-neutral-800/50 hover:text-white"
          )}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
