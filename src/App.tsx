import { HeroScene } from "./components/HeroScene"
import { InviteSections } from "./components/InviteSections"
import { MusicToggle } from "./components/MusicToggle"

export default function App() {
  return (
    <main className="stage">
      <MusicToggle />
      <HeroScene />
      <InviteSections />
    </main>
  )
}
