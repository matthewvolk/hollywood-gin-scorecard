"use client";

import { useState } from "react";

import GameDashboard from "@/components/game-dashboard";
import PlayerSetup from "@/components/player-setup";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<[string, string]>(["", ""]);

  const handleStartGame = (playerNames: [string, string]) => {
    setPlayers(playerNames);
    setGameStarted(true);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Hollywood Gin Scorekeeper
        </h1>

        {!gameStarted ? (
          <PlayerSetup onStartGame={handleStartGame} />
        ) : (
          <GameDashboard players={players} />
        )}
      </div>
    </main>
  );
}
