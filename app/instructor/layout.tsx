import Link from "next/link";

export default function ClassLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/" className="border-b border-b-black">
        Back
      </Link>
      {children}
    </div>
  );
}
