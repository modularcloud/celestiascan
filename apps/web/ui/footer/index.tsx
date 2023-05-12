import Link from "next/link";

const footer_links = [
  { title: "About", id: "about", href: "/" },
  { title: "Terms", id: "terms", href: "/" },
  { title: "Privacy", id: "privacy", href: "/" },
];

export function Footer() {
  return (
    <footer className="flex flex-col justify-evenly text-center bottom-0 border-t h-1/6 p-2">
      <span className="text-slate-900">
        &copy; Copyright {new Date().getFullYear()}. All rights reserved.
      </span>
      {/* <div className="flex flex-row justify-around">
        {footer_links.map(({ title, id, href }) => (
          <Link key={id} href={href}>
            <span className="text-night">{title}</span>
          </Link>
        ))}
      </div> */}
    </footer>
  );
}
