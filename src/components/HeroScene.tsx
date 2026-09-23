import { useEffect, useRef } from "react"
import gsap from "gsap"
import { art } from "../assets/invite"

export function HeroScene() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const couple = root.querySelector<HTMLElement>(".couple")
    const title = root.querySelector<HTMLElement>(".title")
    const names = root.querySelector<HTMLElement>(".names")
    const cue = root.querySelector<HTMLElement>(".scroll-cue")
    const butterflies = gsap.utils.toArray<HTMLElement>(".butterfly", root)

    const ctx = gsap.context(() => {
      gsap.set(couple, { autoAlpha: 0, y: 28, scale: 0.96 })
      gsap.set([title, names, cue], { autoAlpha: 0, y: 24 })
      gsap.set(butterflies, { autoAlpha: 0, scale: 0.55 })

      const intro = gsap.timeline({ defaults: { ease: "power2.out" } })

      intro
        .to(couple, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          ease: "power3.out",
        })
        .to(names, { autoAlpha: 1, y: 0, duration: 1.05 }, "-=0.2")
        .to(title, { autoAlpha: 1, y: 0, duration: 0.85 }, "-=0.7")
        .to(
          butterflies,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.18,
            ease: "back.out(1.6)",
          },
          "-=0.45",
        )
        .to(cue, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.25")

      butterflies.forEach((el, index) => {
        const wing = el.querySelector<HTMLElement>(".wing")
        const path =
          index === 0
            ? [
                { x: 0, y: 0, rotation: 0 },
                { x: -18, y: -22, rotation: -12 },
                { x: 10, y: -38, rotation: 8 },
                { x: -8, y: -14, rotation: -6 },
                { x: 0, y: 0, rotation: 0 },
              ]
            : [
                { x: 0, y: 0, rotation: 0 },
                { x: 16, y: -18, rotation: 10 },
                { x: -12, y: -32, rotation: -8 },
                { x: 8, y: -10, rotation: 6 },
                { x: 0, y: 0, rotation: 0 },
              ]

        gsap.to(el, {
          keyframes: path.map((frame) => ({
            ...frame,
            duration: 2.1 + index * 0.25,
          })),
          ease: "sine.inOut",
          repeat: -1,
          delay: intro.duration() * 0.35 + index * 0.4,
        })

        if (wing) {
          gsap.to(wing, {
            scaleX: 0.55,
            transformOrigin: "50% 55%",
            duration: 0.18 + index * 0.04,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: intro.duration() * 0.35 + index * 0.2,
          })
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <header className="hero" ref={rootRef}>
      <img className="window" src={art.windowBg} alt="" />
      <img className="corner tl" src={art.cornerA} alt="" />
      <img className="corner tr" src={art.cornerB} alt="" />
      <img className="corner bl" src={art.cornerC} alt="" />
      <img className="corner br" src={art.cornerD} alt="" />
      <img className="bouquet left" src={art.bouquetA} alt="" />
      <img className="bouquet right" src={art.bouquetB} alt="" />
      <div className="couple-stage">
        <img
          className="couple"
          src={art.couple}
          alt="Alpha et Sérifat, en tenue de mariage"
        />
      </div>

      <span className="butterfly one" aria-hidden="true">
        <img className="wing" src={art.butterflyA} alt="" />
      </span>
      <span className="butterfly two" aria-hidden="true">
        <img className="wing" src={art.butterflyB} alt="" />
      </span>

      <div className="hero-copy">
        <img
          className="title"
          src={art.title}
          alt="Welcome to the wedding ceremonies"
        />
        <img className="names" src={art.names} alt="Alpha et Sérifat" />
      </div>

      <a className="scroll-cue" href="#annonce">
        <svg viewBox="0 0 24 14" aria-hidden="true">
          <path
            d="M2 12 L12 3 L22 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <strong>scroller</strong>
        <span>vers le haut</span>
      </a>
    </header>
  )
}
