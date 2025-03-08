"use client";

import { Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameTrackerProps {
  players: [string, string];
  gamesCompleted: boolean[];
  totalScores: number[][];
  completedGamesWon: [number, number];
  overallWinner: string | null;
  onResetGame: () => void;
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
            <div className="text-center" key={gameIndex}>
              <div className="text-sm font-medium">Game {gameIndex + 1}</div>
              <div
                className={`text-xs ${gamesCompleted[gameIndex] ? "font-bold text-primary" : "text-muted-foreground"}`}
              >
                {gamesCompleted[gameIndex] ? "Completed" : "In Progress"}
              </div>
              {gamesCompleted[gameIndex] && (
                <div className="mt-1 text-xs">
                  {totalScores[gameIndex][0] > totalScores[gameIndex][1]
                    ? players[0]
                    : players[1]}
                </div>
              )}
            </div>
          ))}
        </div>

        {overallWinner && (
          <div className="rounded-md bg-muted p-4 text-center">
            <Trophy className="mx-auto mb-2 h-6 w-6" />
            <div className="font-bold">{overallWinner}</div>
            <div className="text-sm">Won the match!</div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onResetGame} variant="outline">
          Reset Game
        </Button>
      </CardFooter>
    </Card>
  );
}
