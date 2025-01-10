import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold p-8 mt-12">We Are Shifitng Our Things.....</h1>

      <div>
<Link href='/login'>
        <button >Login </button>
        </Link>
      </div>
    </div>
  );
}
