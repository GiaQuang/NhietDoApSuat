"use client";
import { RiHomeLine } from "react-icons/ri";
import { FaTemperatureHalf } from "react-icons/fa6";
import { IoMdSpeedometer } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { IoMdDocument } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import Image from "next/image";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import { usePathname } from "next/navigation";

const list_url = [
  "all_page/trang_chu",
  "all_page/nhiet_do",
  "all_page/ap_suat",
  "all_page/cai_dat",
  "all_page/bao_cao",
  "all_page/lien_he",
  "all_page/thong_tin_khac",
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <div className="fixed flex flex-col w-[180px] min-w-[180px] border-r min-h-screen mb-2 text-5xl rounded-none select-none">
      <div className="grow">
        <Command>
          <CommandList>
            <CommandGroup
              heading={
                <Image
                  src="/images/test_jpg.jpg"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              }
            >
              <CommandSeparator />
              <Link href="/all_page/trang_chu" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[0]) ? `` : `opacity-30`
                  }`}
                >
                  <RiHomeLine
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    TRANG CHỦ
                  </span>
                </CommandItem>
              </Link>
              <Link href="/all_page/nhiet_do" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[1]) ? `` : `opacity-30`
                  }`}
                >
                  <FaTemperatureHalf
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    NHIỆT ĐỘ
                  </span>
                </CommandItem>
              </Link>
              <Link href="/all_page/ap_suat" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[2]) ? `` : `opacity-30`
                  }`}
                >
                  <IoMdSpeedometer
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    ÁP SUẤT
                  </span>
                </CommandItem>
              </Link>
              <Link href="/all_page/cai_dat" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[3]) ? `` : `opacity-30`
                  }`}
                >
                  <FiSettings
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    CÀI ĐẶT
                  </span>
                </CommandItem>
              </Link>
              <Link href="/all_page/bao_cao" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[4]) ? `` : `opacity-30`
                  }`}
                >
                  <IoMdDocument
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    BÁO CÁO
                  </span>
                </CommandItem>
              </Link>
              <Link href="/all_page/lien_he" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[5]) ? `` : `opacity-30`
                  }`}
                >
                  <FaPhone
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    LIÊN HỆ
                  </span>
                </CommandItem>
              </Link>
              <Link href="/all_page/thong_tin_khac" passHref>
                <CommandItem
                  className={`font-bold cursor-pointer ${
                    path.includes(list_url[5]) ? `` : `opacity-30`
                  }`}
                >
                  <BsInfoCircleFill
                    style={{ marginRight: "8px" }}
                    className="text-[18px]"
                  />
                  <span
                    style={{ position: "relative", top: "1px" }}
                    className="font-bold text-[15px]"
                  >
                    THÔNG TIN KHÁC
                  </span>
                </CommandItem>
              </Link>
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
