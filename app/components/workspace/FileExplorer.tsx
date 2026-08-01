"use client";

import {
  Folder,
  FolderOpen,
  FileCode2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

type FileItem = {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
};

const files: FileItem[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "page.tsx",
            type: "file",
          },
          {
            name: "layout.tsx",
            type: "file",
          },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "Navbar.tsx",
            type: "file",
          },
          {
            name: "Hero.tsx",
            type: "file",
          },
          {
            name: "Footer.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      {
        name: "logo.png",
        type: "file",
      },
    ],
  },
];

function Tree({
  item,
  level = 0,
}: {
  item: FileItem;
  level?: number;
}) {
  const [open, setOpen] = useState(true);

  if (item.type === "file") {
    return (
      <div
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-slate-300 transition hover:bg-slate-800"
        style={{
          paddingLeft: level * 18,
        }}
      >
        <FileCode2
          size={16}
          className="text-cyan-400"
        />

        <span>{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-slate-200 transition hover:bg-slate-800"
        style={{
          paddingLeft: level * 18,
        }}
      >
        {open ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )}

        {open ? (
          <FolderOpen
            size={18}
            className="text-yellow-400"
          />
        ) : (
          <Folder
            size={18}
            className="text-yellow-400"
          />
        )}

        {item.name}
      </button>

      {open &&
        item.children?.map((child) => (
          <Tree
            key={child.name}
            item={child}
            level={level + 1}
          />
        ))}
    </div>
  );
}

export default function FileExplorer() {
  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl">

      <h2 className="mb-5 text-xl font-bold text-white">
        File Explorer
      </h2>

      <div className="space-y-1">

        {files.map((item) => (
          <Tree
            key={item.name}
            item={item}
          />
        ))}

      </div>

    </section>
  );
}