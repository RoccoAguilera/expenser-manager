import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react"
import { useContextState } from "../hooks/Context"
import { toCurrency } from "../utils/tools"
import BarNavigation from "./component/BarNavigation"
import WidgetsData from "../components/WidgetsData"
import ButtonEmpty from "@ui-system/buttons/Border"
import Dots from "@assets/icons/Dots-vertical.svg?react"
import type { Route } from "@react-router-type/dashboard/manager/+types/index";

export default function Manager({ params }: Route.ComponentProps) {
  const { state: { profiles }, setState } = useContextState()
  const currentProfile = profiles.find(item => item.id == params.id)

  if (currentProfile == undefined) return "Loading"

  return (
    <>
      <BarNavigation currentProfile={currentProfile} setState={setState} />
      <span className="block mb-2 text-xs font-light text-gry-400">
        {new Date(currentProfile.date).toString()}
      </span>
      <div className="flex gap-4 p-4 rounded-lg border border-gry-200">

      <Dropdown>
          <ButtonEmpty behavior="onlyIcon">
            <Dots />
          </ButtonEmpty>
          <div className="absolute z-10 max-w-2xs w-full p-2 border border-gry-200 bg-white">
            hello
          </div>
        </Dropdown>

        <div className="flex-1 flex flex-wrap">
          <div className="flex-1">
            <WidgetsData
              hint="Current instance"
              value={currentProfile.name.length > 0 ? currentProfile.name : "Anonymous"}
            />
            <p className="text-sm">
              {currentProfile.description.length > 0 ? currentProfile.description : "You do not have description"}
            </p>
          </div>
          <WidgetsData
            hint="Your budget"
            value={toCurrency(currentProfile.budget)}
          />
        </div>

        

      </div>
    </>
  )
}

type Props = Omit<ComponentProps<"div">, "children"> & {
  children?: [ReactNode, ReactNode]
  gap?: number;
}

function Dropdown({ children, gap = 5, ...props }: Props) {
  // const [toggle, setToggle] = useState(false)
  const reference = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { current } = reference
    if (current) {
      const firstCall = () => { assingPosition(current) }
      firstCall()
      window.addEventListener("resize", firstCall)
      return () => {
        window.removeEventListener('resize', firstCall)
      }
    }
  }, [])

  const assingPosition = (element: HTMLElement) => {
    const { firstElementChild, lastElementChild } = element

    if (firstElementChild && lastElementChild) {
      const { positionx, left, right } = getParentClientRect(firstElementChild, lastElementChild)
      if (positionx == "right") {
        lastElementChild.setAttribute("style", `right: ${right}px`)
      } else if (positionx == "left") {
        lastElementChild.setAttribute("style", `left: ${left}px`)
      }
    }
  }

  return (
    <div ref={reference} {...props} > {children} </div>
  )
}

type PropsCheck = [firstChild: Element, lastChild: Element]
type Orientation = {
  positionx?: "left" | "right";
  left?: number;
  top?: number;
  right?: number;
}

function getParentClientRect(...[firstChild, lastChild]: PropsCheck) {
  let orientation: Orientation = { positionx: undefined }

  if (
    firstChild instanceof HTMLElement &&
    lastChild instanceof HTMLElement &&
    firstChild.offsetParent instanceof HTMLElement
  ) {
    const widthParent = firstChild.offsetParent.offsetWidth
    const firstClientRect = firstChild.getBoundingClientRect()
    const lastClientRect = lastChild.getBoundingClientRect()

    
    
    const offsetLeft = firstChild.offsetLeft
    // La suma del ancho del primer hijo con su offsetLeft
    const leftSpace = (offsetLeft + firstClientRect.width)
    const offsetRight = widthParent - leftSpace

    const limitLeft = leftSpace - lastClientRect.width

    // Calcula el espacio del primer hijo con respecto al ancho que ocupa el ultimo hijo
    // para saber si la posicion es izquierda o derecha.
    // if (widthParent - (firstSpaceLeft + lastClientRect.width) > 0) {
    //   orientation = {
    //     position: "left",
    //     left: firstSpaceLeft
    //   }
    // } else if (offsetLeft - lastClientRect.width > 0) {
    //   orientation = {
    //     position: "right",
    //     right: widthParent - (firstClientRect.width + firstSpaceLeft)
    //   }
    // } else 

    if (offsetLeft > offsetRight) {
      orientation = {
        positionx: "right",
        right: limitLeft >= 0 ? offsetRight : 0
      }
    } else {
      orientation = {
        positionx: "left",
        left: offsetLeft
      }
    }
  }

  return orientation
}