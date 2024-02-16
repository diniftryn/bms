import Link from "next/link";

export default function ClassLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/">Back</Link>
      {children}
    </div>
  );
}
