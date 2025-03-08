"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PlayerSetupProps {
  onStartGame: (players: [string, string]) => void
}

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!player1.trim() || !player2.trim()) {
      setError("Both player names are required")
      return
    }

    if (player1.trim() === player2.trim()) {
      setError("Player names must be different")
      return
    }

    onStartGame([player1, player2])
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Enter Player Names</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="player1" className="text-sm font-medium">
              Player 1
            </label>
            <Input id="player1" value={player1} onChange={(e) => setPlayer1(e.target.value)} placeholder="Enter name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="player2" className="text-sm font-medium">
              Player 2
            </label>
            <Input id="player2" value={player2} onChange={(e) => setPlayer2(e.target.value)} placeholder="Enter name" />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Start Game
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

