import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBarItem({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const actualPage = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`hover:text-[#1A56DB] font-bold  ${
          actualPage === href ? "text-[#1A56DB] underline" : "text-[#64748b]"
        }`}
      >
        {title}
      </Link>
    </li>
  );
}
