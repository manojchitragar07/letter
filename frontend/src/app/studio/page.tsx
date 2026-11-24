import React, { Suspense } from "react";
import { LetterStudio } from "@/components/studio/LetterStudio";

interface StudioPageProps {
  searchParams: {
    template?: string;
    recipient?: string;
    salutation?: string;
  };
}

export const metadata = {
  title: "Letter Studio | Dearly",
  description: "Design your bespoke digital letter with vintage stationery, stickers, typography, and wax seals.",
};

export default function StudioPage({ searchParams }: StudioPageProps) {
  const initialTemplate = searchParams?.template || "vintage-parchment";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EDE7DD] flex items-center justify-center">
          <div className="text-stone-600 font-serif text-sm animate-pulse">
            Opening your writing desk...
          </div>
        </div>
      }
    >
      <LetterStudio initialTemplateId={initialTemplate} />
    </Suspense>
  );
}
