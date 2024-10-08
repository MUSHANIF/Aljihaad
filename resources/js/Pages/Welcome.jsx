import { Link, Head } from "@inertiajs/react";
import Header from "@/Layouts/Home/Header";
import Hero from "@/Layouts/Home/Hero";
import About from "@/Layouts/Home/About";
import React, { useRef } from "react";
import Aktivitas from "@/Layouts/Home/Aktivitas";
import Event from "@/Layouts/Home/Event";
import Artikel from "@/Layouts/Home/Artikel";
import Blog from "@/Layouts/Home/Blog";
import Pengurus from "@/Layouts/Home/Pengurus";
import Footer from "@/Layouts/Home/Footer";

export default function Welcome({
  auth,
  blog,
  kajianUstad,
  status,
  waktu,
  fajr,
  Sunrise,
  Dhuhr,
  Asr,
  Maghrib,
  Isha,
  event,
  pengurus,
}) {
  const targetRef = useRef(null);

  const handleScrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header
        auth={auth}
        mustVerifyEmail={false}
        status={status}
        waktu={waktu}
        fajr={fajr}
        Sunrise={Sunrise}
        Dhuhr={Dhuhr}
        Asr={Asr}
        Maghrib={Maghrib}
        Isha={Isha}
      />

      <Hero
        handleScrollToTarget={handleScrollToTarget}
        kajianUstad={kajianUstad}
      />
      <About />
      <Aktivitas />
      <Event ref={targetRef} event={event} />
      {/* <Artikel /> */}
      <Blog blog={blog} />
      <Pengurus pengurus={pengurus} />
      <Footer />
      <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
    </>
  );
}
