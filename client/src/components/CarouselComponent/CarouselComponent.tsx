"use client"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import React from "react"

export default function CarouselComponent() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const textArray: string[] = ["Check Out Latest Polls","Vote For A Poll","Check Voting Results","Create Your Own Poll With Voting Options","Delete Your Polls When You No Longer Need Them"]
   
    React.useEffect(() => {
      if (!api) {
        return
      }
   
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
   
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])
   
    return (
      <div className="">
        <Carousel setApi={setApi} className="mx-auto max-w-xs border rounded-lg">
          <CarouselContent>
            {Array.from({ length: textArray.length }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-slate-700">
                    <span className="text-sm sm:text-xl font-semibold text-white text-center">{textArray[index]}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm sm:text-lg text-white">
          Slide {current} of {count}
        </div>
      </div>
    )
  }