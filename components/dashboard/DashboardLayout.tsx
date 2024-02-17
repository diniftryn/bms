"use client";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] bg-pink-100">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <section className="bg-slate-100">{children}</section>;
}

function Header() {
  return (
    <header className="bg-blue-100">
      <span>logo hamburger icon</span>
      <span>search avatar</span>
    </header>
  );
}

function Sidebar() {
  return (
    <nav className="bg-purple-100 hidden md:block ">
      <ul>
        <SidebarItems name="Class" path="/class" icon="" />
      </ul>
    </nav>
  );
}

type SidebarItemsProps = {
  name: string;
  path: string;
  icon: string;
};

function SidebarItems({ name, path, icon }: SidebarItemsProps) {
  return (
    <li>
      {icon}
      {name}
      {path}
    </li>
  );
}
