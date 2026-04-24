/**
 * Hero
 * Landing page hero section with search.
 */
import Image from "next/image";
import { Search } from "lucide-react";
import { Input, Button } from "@/components/ui";

interface HeroProps {
  initialSearch?: string;
}

export default function Hero({ initialSearch = "" }: Readonly<HeroProps>) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
      {/* Left Text */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl md:text-6xl font-black text-stone-900 leading-[1.1] tracking-tight">
          ทุกเรื่องราวของ
          <br />
          สัตว์เลี้ยงที่คุณรัก
        </h1>
        <p className="text-stone-600 text-lg md:text-xl max-w-md leading-relaxed">
          เคล็ดลับการเลี้ยง อาหาร สุขภาพ และพฤติกรรมของสัตว์เลี้ยง
          โดยผู้เชี่ยวชาญ และคนรักสัตว์
        </p>

        {/* Search Form */}
        <form
          action="/"
          method="GET"
          className="flex flex-col sm:flex-row items-center gap-3 max-w-lg pt-4"
        >
          <div className="flex-1 relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 z-10"
              size={20}
            />
            <Input
              type="text"
              name="search"
              defaultValue={initialSearch}
              placeholder="ค้นหาบทความที่คุณสนใจ..."
              className="pl-12 h-14 rounded-2xl shadow-xl shadow-orange-500/5 border-orange-500/50 bg-white focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            ค้นหา
          </Button>
        </form>
      </div>

      {/* Right Image */}
      <div className="w-full md:flex-[1.5] flex items-center justify-center">
        <img
          src="/CatDog.svg"
          alt="Pets"
          className="w-full h-auto rounded-3xl shadow-xl shadow-orange-500/20"
        />
      </div>
    </div>
  );
}
