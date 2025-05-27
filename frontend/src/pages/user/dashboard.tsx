import { Corousel } from "../../components/dashboard/corousel";
import { Footer } from "../../components/layout/Footer";
import { HeroSection } from "../../components/layout/heroSection";
import { Information } from "../../components/layout/information";
import { Navbar } from "../../components/layout/Navbar";

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9f0] text-black">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold leading-relaxed">
            Eat better with Aai's Kitchen
          </h1>
          <h6 className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
            Trusted by students and professionals,<br />
            delivering homely, healthy meals — simply and reliably.
          </h6>
          <Corousel />
          <HeroSection/>
          
        </div>
       

        
      </div>
      <Information/>
      {/* Footer */}
      <Footer />
    </div>
  );
};