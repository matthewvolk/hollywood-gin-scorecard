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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <h1 className="mb-8 cursor-pointer text-center text-3xl font-bold">
              Hollywood Gin Scorecard
            </h1>
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

        {!gameStarted ? (
          <PlayerSetup onStartGame={handleStartGame} />
        ) : (
          <GameDashboard players={players} />
        )}
      </div>
    </main>
  );
}
