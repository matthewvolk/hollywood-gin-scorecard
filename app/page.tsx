"use client";

import { useState } from "react";

import GameDashboard from "@/components/game-dashboard";
import PlayerSetup from "@/components/player-setup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<[string, string]>(["", ""]);

  const handleStartGame = (playerNames: [string, string]) => {
    setPlayers(playerNames);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setPlayers(["", ""]);
    setGameStarted(false);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Hollywood Gin Scorecard
        </h1>

        {!gameStarted ? (
          <PlayerSetup onStartGame={handleStartGame} />
        ) : (
          <GameDashboard players={players} />
        )}

        {gameStarted && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mx-auto mt-8 block" variant="destructive">
                Reset Game
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset the current game and all player scores will be
                  lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetGame}>
                  Start Over
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </main>
  );
}
