"use client";

import { ChartGender } from '@/components/ui/chart-gender';
import { ChartAge } from '@/components/ui/chart-age';
import HeroHome from '@/components/ui/heroHome';
import { TableCustomers } from '@/components/ui/tableCustomers';

export default function Home() {
  return (
    <>
      <HeroHome />
      <div className='p-[3%]'>
        <div className='flex justify-center items-center gap-10'>
          <ChartGender />
          <ChartAge />
        </div>
        <TableCustomers />
      </div>
    </>
  );
}
