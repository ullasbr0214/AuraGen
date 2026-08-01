"use client";

import { useState } from "react";

import {
  FileCode2,
  Copy,
  Download,
  Star,
  Trash2,
  Eye,
  Check,
} from "lucide-react";

interface GeneratedFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

const initialFiles: GeneratedFile[] = [
  {
    id: "1",
    name: "Navbar.tsx",
    language: "TypeScript",
    content: "<Navbar />",
  },
  {
    id: "2",
    name: "Hero.tsx",
    language: "TypeScript",
    content: "<Hero />",
  },
  {
    id: "3",
    name: "Footer.tsx",
    language: "TypeScript",
    content: "<Footer />",
  },
  {
    id: "4",
    name: "globals.css",
    language: "CSS",
    content: "body{}",
  },
];

export default function GeneratedFiles() {
  const [files, setFiles] = useState(initialFiles);
  const [copied, setCopied] = useState("");

  const copyFile = async (file: GeneratedFile) => {
    await navigator.clipboard.writeText(file.content);

    setCopied(file.id);

    setTimeout(() => setCopied(""), 1500);
  };

  const downloadFile = (file: GeneratedFile) => {
    const blob = new Blob([file.content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = file.name;

    a.click();

    URL.revokeObjectURL(url);
  };

  const deleteFile = (id: string) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Generated Files
          </h2>

          <p className="text-slate-400">
            AI generated project structure
          </p>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          {files.length} Files
        </div>

      </div>

      <div className="space-y-4">

        {files.map((file) => (

          <div
            key={file.id}
            className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <FileCode2
                  size={22}
                  className="text-cyan-400"
                />

                <div>

                  <h3 className="font-semibold text-white">
                    {file.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {file.language}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <button className="rounded-xl p-2 hover:bg-slate-700">
                  <Eye
                    size={18}
                    className="text-cyan-300"
                  />
                </button>

                <button
                  onClick={() => copyFile(file)}
                  className="rounded-xl p-2 hover:bg-slate-700"
                >
                  {copied === file.id ? (
                    <Check
                      size={18}
                      className="text-green-400"
                    />
                  ) : (
                    <Copy
                      size={18}
                      className="text-slate-300"
                    />
                  )}
                </button>

                <button
                  onClick={() => downloadFile(file)}
                  className="rounded-xl p-2 hover:bg-slate-700"
                >
                  <Download
                    size={18}
                    className="text-green-400"
                  />
                </button>

                <button className="rounded-xl p-2 hover:bg-slate-700">
                  <Star
                    size={18}
                    className="text-yellow-400"
                  />
                </button>

                <button
                  onClick={() =>
                    deleteFile(file.id)
                  }
                  className="rounded-xl p-2 hover:bg-slate-700"
                >
                  <Trash2
                    size={18}
                    className="text-red-400"
                  />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}