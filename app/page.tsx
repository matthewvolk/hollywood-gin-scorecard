"use client"

import { useState } from "react"
import PlayerSetup from "@/components/player-setup"
import GameDashboard from "@/components/game-dashboard"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState<[string, string]>(["", ""])

  const handleStartGame = (playerNames: [string, string]) => {
    setPlayers(playerNames)
    setGameStarted(true)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Hollywood Gin Scorekeeper</h1>

        {!gameStarted ? <PlayerSetup onStartGame={handleStartGame} /> : <GameDashboard players={players} />}
      </div>
    </main>
  )
}

