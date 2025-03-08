"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PlayerSetupProps {
  onStartGame: (players: [string, string]) => void;
}

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!player1.trim() || !player2.trim()) {
      setError("Both player names are required");
      return;
    }

    if (player1.trim() === player2.trim()) {
      setError("Player names must be different");
      return;
    }

    onStartGame([player1, player2]);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Enter Player Names</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="player1">
              Player 1
            </label>
            <Input
              autoFocus
              id="player1"
              onChange={(e) => setPlayer1(e.target.value)}
              placeholder="Enter name"
              value={player1}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="player2">
              Player 2
            </label>
            <Input
              id="player2"
              onChange={(e) => setPlayer2(e.target.value)}
              placeholder="Enter name"
              value={player2}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Start Game
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
