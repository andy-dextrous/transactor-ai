"use client"

import canUseDOM from "@/utilities/canUseDOM"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

import { CustomBounce } from "gsap/CustomBounce"
import { CustomEase } from "gsap/CustomEase"

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { Flip } from "gsap/Flip"
import { GSDevTools } from "gsap/GSDevTools"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"

// Import effects to register them
import "./effects"

/****************************************************
 * Setup GSAP Plugins and Defaults
 ****************************************************/

if (canUseDOM) {
  gsap.registerPlugin(
    useGSAP,
    DrawSVGPlugin,
    Flip,
    MotionPathPlugin,
    MorphSVGPlugin,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin,
    CustomEase,
    CustomBounce,
    GSDevTools
  )
  gsap.defaults({
    ease: "power2.inOut",
    duration: 0.3,
  })
}

export { Draggable } from "gsap/Draggable"
export { EaselPlugin } from "gsap/EaselPlugin"
export { EasePack } from "gsap/EasePack"
export { Flip } from "gsap/Flip"
export { GSDevTools } from "gsap/GSDevTools"
export { InertiaPlugin } from "gsap/InertiaPlugin"
export { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
export { MotionPathPlugin } from "gsap/MotionPathPlugin"
export { Observer } from "gsap/Observer"
export { PixiPlugin } from "gsap/PixiPlugin"
export { ScrollSmoother } from "gsap/ScrollSmoother"
export { ScrollToPlugin } from "gsap/ScrollToPlugin"
export { ScrollTrigger } from "gsap/ScrollTrigger"
export { TextPlugin } from "gsap/TextPlugin"

export * from "@gsap/react"
export * from "gsap"
