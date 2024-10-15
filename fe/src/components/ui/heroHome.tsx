import React from 'react'

import Image from 'next/image';
import LogoHigo from '@/assets/higo-gif.gif'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const HeroHome = () => {
  return (
    <div className="flex gap-48 justify-center items-center bg-primarywhite dark:bg-gray-900">
      <div>
        <Image
          src={LogoHigo}
          alt="Deskripsi Gambar"
          width={500}
          height={300}
        />
      </div>
      <div className="flex flex-col justify-center h-[40rem] w-[30%]">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
          Solusi Menyeluruh Pemasaran Digital dengan WiFi & Customer Insight!
        </p>
        <TextGenerateEffect
          words={`HIGO hadir membawa dampak signifikan melalui WiFi dan Insights di masa kini dan nanti.`}
          className="text-4xl text-justify xl:text-5xl text-primarypink transition-colors font-bold "
          duration={0.5}
        />
        <div className="flex flex-col mt-10 md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button className="w-40 h-10 rounded-xl bg-primaryblue hover:bg-secondaryblue border border-transparent text-white text-sm">
            Lihat data customers
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroHome