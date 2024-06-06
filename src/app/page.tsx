import Image from "next/image";
import WordGuesser from "../../components/word-guesser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WordGuesser />
    </main>
  );
}
