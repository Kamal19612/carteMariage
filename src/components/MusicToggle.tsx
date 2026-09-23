import { useRef, useState } from "react"
import { art } from "../assets/invite"

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={art.musicUrl} loop preload="none" />
      <button
        type="button"
        className={`music${playing ? " is-on" : ""}`}
        onClick={() => void toggle()}
        aria-pressed={playing}
        aria-label={playing ? "Couper la musique" : "Écouter la musique"}
      >
        {playing ? (
          <img src={art.pause} alt="" />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  )
}
