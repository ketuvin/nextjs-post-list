"use client";

import Image from "next/image";
import { Bungee_Spice } from "next/font/google";

const bungeeSpice = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <nav className="bg-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/images/profile.png"
            alt="Kevin Fuentes"
            width={40}
            height={40}
            className="w-full h-full object-cover object-top"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <h1 className={`${bungeeSpice.className} text-2xl text-white`}>
          Kevin Fuentes
        </h1>
      </div>
    </nav>
  );
}
