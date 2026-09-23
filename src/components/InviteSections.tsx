import { useEffect, useRef } from "react"
import { art } from "../assets/invite"
import { closing, location, programme } from "../data/wedding"

const icons = {
  meal: art.iconMeal,
  church: art.iconChurch,
} as const

const familyVideos = [
  {
    src: art.familleVideo1,
    label: "Annonce des familles Camara et Zouré",
  },
  {
    src: art.familleVideo2,
    label: "Annonce du mariage d’Alpha et Sérifat",
  },
] as const

export function InviteSections() {
  const familiesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = familiesRef.current
    if (!section) return

    const videos = Array.from(section.querySelectorAll<HTMLVideoElement>("video"))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.45 },
    )

    videos.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        className="families"
        id="annonce"
        ref={familiesRef}
        aria-label="Annonce des familles"
      >
        {familyVideos.map((clip) => (
          <div className="families-clip" key={clip.src}>
            <video
              className="families-video"
              src={clip.src}
              muted
              playsInline
              preload="metadata"
              controlsList="nodownload"
              aria-label={clip.label}
            />
          </div>
        ))}
      </section>

      <section className="programme" aria-labelledby="programme-title">
        <h2 id="programme-title" className="eyebrow">
          <span>Programme</span>
        </h2>
        <ol>
          {programme.map((item) => (
            <li key={item.time}>
              <img src={icons[item.icon]} alt="" />
              <span className="node" aria-hidden="true" />
              <div>
                <p className="time">{item.time}</p>
                <p className="event">{item.title}</p>
                {item.lines.map((line) => (
                  <p className="place" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="location" aria-labelledby="location-title">
        <h2 id="location-title">{location.label}</h2>
        <a href={location.href} target="_blank" rel="noreferrer">
          <span>{location.place}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="12" cy="10" r="2.2" fill="currentColor" />
          </svg>
        </a>
      </section>

      <footer className="closing">
        <p>{closing.message}</p>
        <div className="phone-rule" aria-hidden="true">
          <span />
          <svg viewBox="0 0 24 24">
            <path
              d="M7 3.5h3.2l1.2 3.2-2 1.2a12 12 0 0 0 5.7 5.7l1.2-2 3.2 1.2V16a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 6.7 2 2 0 0 1 7 3.5z"
              fill="currentColor"
            />
          </svg>
          <span />
        </div>
        <p className="contact-label">{closing.contactLabel}</p>
        <a className="phone" href={closing.phoneHref}>
          {closing.phoneDisplay}
        </a>
      </footer>
    </>
  )
}
