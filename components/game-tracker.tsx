"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface GameTrackerProps {
  players: [string, string]
  gamesCompleted: boolean[]
  totalScores: number[][]
  completedGamesWon: [number, number]
  overallWinner: string | null
  onResetGame: () => void
}

export default function GameTracker({
  players,
  gamesCompleted,
  totalScores,
  completedGamesWon,
  overallWinner,
  onResetGame,
}: GameTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Game Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="font-medium">{players[0]}</h3>
            <div className="text-3xl font-bold">{completedGamesWon[0]}</div>
            <div className="text-sm text-muted-foreground">Games Won</div>
          </div>
          <div className="text-center">
            <h3 className="font-medium">{players[1]}</h3>
            <div className="text-3xl font-bold">{completedGamesWon[1]}</div>
            <div className="text-sm text-muted-foreground">Games Won</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((gameIndex) => (
            <div key={gameIndex} className="text-center">
              <div className="text-sm font-medium">Game {gameIndex + 1}</div>
              <div
                className={`text-xs ${gamesCompleted[gameIndex] ? "text-primary font-bold" : "text-muted-foreground"}`}
              >
                {gamesCompleted[gameIndex] ? "Completed" : "In Progress"}
              </div>
              {gamesCompleted[gameIndex] && (
                <div className="text-xs mt-1">
                  {totalScores[gameIndex][0] > totalScores[gameIndex][1] ? players[0] : players[1]}
                </div>
              )}
            </div>
          ))}
        </div>

        {overallWinner && (
          <div className="bg-muted p-4 rounded-md text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2" />
            <div className="font-bold">{overallWinner}</div>
            <div className="text-sm">Won the match!</div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onResetGame}>
          Reset Game
        </Button>
      </CardFooter>
    </Card>
  )
}

