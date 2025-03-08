"use client";

import type React from "react";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ScoreInputProps {
  players: [string, string];
  onAddHand: (player1Score: number, player2Score: number) => void;
  disabled?: boolean;
}

export default function ScoreInput({
  players,
  onAddHand,
  disabled = false,
}: ScoreInputProps) {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [error, setError] = useState("");
  const player1InputRef = useRef<HTMLInputElement>(null);
  const player2InputRef = useRef<HTMLInputElement>(null);

  // Handle player 1 score change
  const handlePlayer1ScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value);
    setPlayer1Score(value);

    // If player 1 has a score, reset player 2's score
    if (value > 0) {
      setPlayer2Score(0);
    }
  };

  // Handle player 2 score change
  const handlePlayer2ScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : Number.parseInt(e.target.value);
    setPlayer2Score(value);

    // If player 2 has a score, reset player 1's score
    if (value > 0) {
      setPlayer1Score(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that exactly one player has a score
    if (player1Score <= 0 && player2Score <= 0) {
      setError("One player must have a score greater than 0");
      return;
    }

    onAddHand(player1Score, player2Score);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setError("");

    // Focus the first input after submission
    if (player1InputRef.current) {
      player1InputRef.current.focus();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Record Hand Score</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="player1Score">
                {players[0]}
              </label>
              <Input
                disabled={disabled || player2Score > 0}
                id="player1Score"
                min="0"
                onChange={handlePlayer1ScoreChange}
                placeholder="Score"
                ref={player1InputRef}
                type="number"
                value={player1Score || ""}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="player2Score">
                {players[1]}
              </label>
              <Input
                disabled={disabled || player1Score > 0}
                id="player2Score"
                min="0"
                onChange={handlePlayer2ScoreChange}
                placeholder="Score"
                ref={player2InputRef}
                type="number"
                value={player2Score || ""}
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <p className="text-center text-xs text-muted-foreground">
            Enter a score for the player who won the hand
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={disabled} type="submit">
            Record Hand
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
