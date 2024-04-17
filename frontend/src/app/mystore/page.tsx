"use client";
import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import getSingleCarProvider from "@/libs/getSingleCarProvider";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import CarProviderCard from "@/components/CarProviderCard";
import getCarForOneProvider from "@/libs/getCarForOneProvider";
import Image from "next/image";
const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const [providerData, setproviderData] = useState<CarProvider>();
  const [userProfile, setUserProfile] = useState();
  const [carArray, setCarArray] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const fetchData = async () => {
      const providerJson = await getSingleCarProvider('661ab63321e76c1e4ac6848a');
      setproviderData(providerJson.data)
    };
    const fetchCarForProvider = async ()=>{
        const cars = await getCarForOneProvider('661ab63321e76c1e4ac6848a');
        setCarArray(cars.data);
    }
    fetchData();
    fetchCarForProvider();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [providerData]);

  if (!session || !session.user.token) {
    router.push("/sign-in");
    return null;
  }
   console.log(carArray)
  return (
    <main>
      <NavBar
        stickyState={false}
        showSignIn={false}
        session={session ? true : false}
      />
      ;
      <div className="flex flex-col items-center">
        <div className="bg-[#17191C] rounded-xl w-[90vw] h-[72vh] flex flex-row justify-evenly items-center">
          <div className=" w-[25%] h-[100%] flex flex-col relative justify-center items-center">
            <div className=" w-full h-[80%]  flex flex-col relative">
              <CarProviderCard 
              name={providerData?.name}
              address={providerData?.address}
              telephone={providerData?.telephone}/>
            </div>
          </div>
          <div className="bg-white rounded-xl w-[3px] h-[85%]"></div>

          <div className=" w-[65%] h-[100%] flex flex-col relative overflow-y-scroll overflow-x-hidden">
            <div className=" w-fit h-fit flex flex-col space-y-3 pt-9 pl-6">
              <h1 className="text-2xl font-kiona text-white">Provider Name</h1>
              <h1 className="text-5xl font-poppins text-white">
                {providerData?.name ?? ""}
              </h1>
            </div>
            <div className=" w-fit h-fit flex flex-col space-y-3 pt-9 pl-6">
              <h1 className="text-2xl font-kiona text-white">Location</h1>
              <h1 className="text-4xl font-poppins text-white">
                {providerData?.address ?? ""}
              </h1>
            </div>
            <div className=" w-fit h-fit flex flex-col space-y-3 pt-9 pl-6">
              <h1 className="text-2xl font-kiona text-white">Phone</h1>
              <h1 className="text-4xl font-poppins text-white">
                {providerData?.telephone ?? ""}
              </h1>
            </div>

            <div className="w-full h-[1px] flex flex-col items-center mt-10">
              <div className="bg-white w-[95%] h-full"></div>
            </div>
            <div className="flex flex-col w-full h-fit p-6 justify-center">
              <div className="flex flex-row w-full h-fit justify-end">
                <h1 className="text-4xl font-kiona text-white">
                  Avaliable Car
                </h1>
              </div>

              <div className="grid grid-cols-2 pt-5 w-full h-full gap-10 mt-10">
                {carArray? carArray.map((carItem:CarItem)=>
                //  <AvaliableCarCard _id={carItem._id} src={carItem.src} model={carItem.model} brand={carItem.brand} price={carItem.price} carProvider={carItem.carProvider}/>
                    <Link href='/[cid]'>
                      <div className="w-[25vw] h-[40vh] bg-white  rounded-2xl ">
                          <Image src={carItem.src} alt="carpic" width={300} height={100} className="w-full h-52 rounded-t-2xl"/>
                          <div>{carItem.model}</div>
                          <div>{carItem.brand}</div>
                          <div>{carItem.price}</div>
                      </div>
                    </Link>
                ):""}
                <div className="w-[25vw] h-[40vh] rounded-2xl border-white border">
                  <Link href='/add'>
                    <div className="flex justify-center mt-[40%]"><Image src="/img/plus_sign.svg" alt="plus" width={50} height={50} /></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;