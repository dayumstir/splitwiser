"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Users, DollarSign, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/groups", icon: Users, label: "Groups" },
  { href: "/add-expense", icon: PlusCircle, label: "Add" },
  { href: "/settle", icon: DollarSign, label: "Settle" },
  { href: "/profile", icon: User, label: "Profile" },
];
const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-background pb-safe fixed right-0 bottom-0 left-0 border-t">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex h-full w-full flex-col items-center justify-center ${
              (
                item.href === "/"
                  ? pathname === "/"
                  : pathname.includes(item.href)
              )
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="mt-1 text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export { BottomNav };
