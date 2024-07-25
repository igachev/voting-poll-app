import CarouselComponent from "@/components/CarouselComponent/CarouselComponent";

export default function Home() {

  return (
    <div className="w-full min-h-[800px] bg-stone-700">
      <h1 className="text-xl sm:text-4xl text-center text-white p-2">Home</h1>

      <section className="w-4/6 mx-auto bg-stone-400 rounded-xl">
      <h3 className="text-lg sm:text-3xl text-center text-white p-2">Welcome to our voting application!</h3>
       <CarouselComponent />
      </section>

    </div>
  );
  
}

