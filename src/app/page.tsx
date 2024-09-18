import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Link className= "border-2 rounded-md p-2 bg-white text-black hover:bg-gray-300" 
        href="/attack">calculadora de dano
      </Link>
    </div>
  );
}
