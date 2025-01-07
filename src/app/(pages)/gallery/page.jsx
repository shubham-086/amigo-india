import PageHeader from "@/components/sections/PageHeader";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Gallery() {
  const images = [
    "classroom1",
    "classroom2",
    "classroom3",
    "classroom4",
    "classroom5",
    "classroom6",
    "classroom7",
    "classroom8",
    "classroom9",
    "classroom10",
    "event1",
    "event2",
    "event3",
    "event4",
    "event5",
    "event6",
    "event7",
    "event8",
    "event9",
    "event10",
    "event11",
    "event12",
    "event13",
    "event14",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pb-10">
        <PageHeader img="/gallery/classroom4.jpg" title="Gallery" />
        <div className="container mx-auto p-5 md:p-10">
          <div className="text-center">
            <div className="mb-4">
              <div className="bg-primary h-[2px] w-60 flex mx-auto -mb-3"></div>
              <h3 className="text-xl font-semibold text-primary bg-gray-100 inline-block px-5">
                GALLERY
              </h3>
              <div className="bg-primary h-[2px] w-80 flex mx-auto -mt-2"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-20 text-gray-800">
              A Glimpse of Our Moments!
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Image
                  src={`/gallery/${src}.jpg`}
                  alt={`Gallery Image ${index + 1}`}
                  className="object-cover w-full h-80 group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={400}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold text-lg">View Image</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
