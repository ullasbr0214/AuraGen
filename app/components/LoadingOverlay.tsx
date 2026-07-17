"use client";

import { Loader2 } from "lucide-react";

export default function LoadingOverlay({

  loading,

}:{

  loading:boolean;

}){

  if(!loading) return null;

  return(

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="rounded-2xl bg-slate-900 p-8 shadow-2xl">

        <Loader2
          size={45}
          className="mx-auto animate-spin text-cyan-400"
        />

        <p className="mt-4 text-center text-white">

          Aura AI is generating your UI...

        </p>

      </div>

    </div>

  );

}