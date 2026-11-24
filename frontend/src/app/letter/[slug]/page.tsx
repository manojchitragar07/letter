import { Metadata } from "next";
import { fetchLetterBySlug } from "@/lib/api";
import { EnvelopeOpening } from "@/components/delivery/EnvelopeOpening";
import Link from "next/link";
import { MailQuestion, ArrowLeft } from "lucide-react";

interface LetterPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: LetterPageProps): Promise<Metadata> {
  const letter = await fetchLetterBySlug(params.slug);
  if (!letter) {
    return {
      title: "Letter Not Found | Dearly",
      description: "This letter does not exist or has expired.",
    };
  }

  return {
    title: `A personal letter for ${letter.recipientName} | Dearly`,
    description: `A handwritten digital letter sent with care by ${letter.senderName}. Open your envelope to read it.`,
    openGraph: {
      title: `A letter for ${letter.recipientName} from ${letter.senderName}`,
      description: "Turn your thoughts into beautiful letters. Write, design, and send something that stays.",
      type: "article",
    },
  };
}

export default async function LetterPage({ params }: LetterPageProps) {
  const letter = await fetchLetterBySlug(params.slug);

  if (!letter) {
    return (
      <div className="min-h-screen bg-[#EDE7DD] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-200/70 text-stone-600 flex items-center justify-center mb-4">
          <MailQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-800">
          Letter Not Found
        </h1>
        <p className="text-sm text-stone-500 max-w-sm mt-2 mb-6">
          This letter may have been expired, deleted by the sender, or the link might be misspelled.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dearly Home</span>
        </Link>
      </div>
    );
  }

  return <EnvelopeOpening letter={letter} />;
}
