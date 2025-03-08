"use client";

import { useState } from "react";

import GameTracker from "@/components/game-tracker";
import ScoreCard from "@/components/score-card";
import ScoreInput from "@/components/score-input";

interface GameDashboardProps {
  players: [string, string];
}

// Define the structure for a hand
interface Hand {
  id: number;
  scores: [number, number];
  winner: number | null; // 0 for player1, 1 for player2, null for draw
}

// Define the structure for game scores
interface GameScores {
  player1: number[];
  player2: number[];
}

export default function GameDashboard({ players }: GameDashboardProps) {
  const [hands, setHands] = useState<Hand[]>([]);

  // Track scores for all three games
  const [gameScores, setGameScores] = useState<
    [GameScores, GameScores, GameScores]
  >([
    { player1: [], player2: [] },
    { player1: [], player2: [] },
    { player1: [], player2: [] },
  ]);

  // Track which games each player has won
  const [gamesWon, setGamesWon] = useState<[number, number]>([0, 0]);

  // Track if each game is completed
  const [gamesCompleted, setGamesCompleted] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);

  const addHand = (player1Score: number, player2Score: number) => {
    // Determine the winner of this hand
    let winner: number | null = null;
    if (player1Score > player2Score) winner = 0;
    else if (player2Score > player1Score) winner = 1;

    // Create the new hand
    const newHand: Hand = {
      id: hands.length + 1,
      scores: [player1Score, player2Score],
      winner,
    };

    // Add the hand to our history
    setHands([...hands, newHand]);

    // Update game scores based on Hollywood Gin rules
    updateGameScores(winner, player1Score, player2Score);
  };

  const updateGameScores = (
    winner: number | null,
    player1Score: number,
    player2Score: number,
  ) => {
    if (winner === null) return; // No updates for draws

    const newGameScores = [...gameScores] as [
      GameScores,
      GameScores,
      GameScores,
    ];
    const newGamesCompleted = [...gamesCompleted];
    const newGamesWon = [...gamesWon];

    // Apply the Hollywood Gin scoring rules
    if (winner === 0) {
      // Player 1 won
      // First win goes to first game only
      if (newGamesWon[0] === 0) {
        newGameScores[0].player1.push(player1Score);
      }
      // Second win goes to first and second games
      else if (newGamesWon[0] === 1) {
        newGameScores[0].player1.push(player1Score);
        newGameScores[1].player1.push(player1Score);
      }
      // Third and subsequent wins go to all three games
      else {
        newGameScores[0].player1.push(player1Score);
        newGameScores[1].player1.push(player1Score);
        newGameScores[2].player1.push(player1Score);
      }

      newGamesWon[0]++;
    } else {
      // Player 2 won
      // First win goes to first game only
      if (newGamesWon[1] === 0) {
        newGameScores[0].player2.push(player2Score);
      }
      // Second win goes to first and second games
      else if (newGamesWon[1] === 1) {
        newGameScores[0].player2.push(player2Score);
        newGameScores[1].player2.push(player2Score);
      }
      // Third and subsequent wins go to all three games
      else {
        newGameScores[0].player2.push(player2Score);
        newGameScores[1].player2.push(player2Score);
        newGameScores[2].player2.push(player2Score);
      }

      newGamesWon[1]++;
    }

    // Check if any games have reached 100+ points
    for (let i = 0; i < 3; i++) {
      if (!newGamesCompleted[i]) {
        const player1Total = newGameScores[i].player1.reduce(
          (sum, score) => sum + score,
          0,
        );
        const player2Total = newGameScores[i].player2.reduce(
          (sum, score) => sum + score,
          0,
        );

        if (player1Total >= 100) {
          newGamesCompleted[i] = true;
        } else if (player2Total >= 100) {
          newGamesCompleted[i] = true;
        }
      }
    }

    setGameScores(newGameScores);
    setGamesCompleted(newGamesCompleted);
    setGamesWon(newGamesWon);
  };

  // Calculate total scores for each game
  const getTotalScores = () => {
    return gameScores.map((game) => [
      game.player1.reduce((sum, score) => sum + score, 0),
      game.player2.reduce((sum, score) => sum + score, 0),
    ]);
  };

  // Count completed games won by each player
  const getCompletedGamesWon = () => {
    const totalScores = getTotalScores();
    const completedGamesWon: [number, number] = [0, 0];

    for (let i = 0; i < 3; i++) {
      if (gamesCompleted[i]) {
        if (totalScores[i][0] > totalScores[i][1]) {
          completedGamesWon[0]++;
        } else {
          completedGamesWon[1]++;
        }
      }
    }

    return completedGamesWon;
  };

  const resetGame = () => {
    setHands([]);
    setGameScores([
      { player1: [], player2: [] },
      { player1: [], player2: [] },
      { player1: [], player2: [] },
    ]);
    setGamesWon([0, 0]);
    setGamesCompleted([false, false, false]);
  };

  const completedGamesWon = getCompletedGamesWon();
  const totalScores = getTotalScores();
  const overallWinner =
    completedGamesWon[0] >= 2
      ? players[0]
      : completedGamesWon[1] >= 2
        ? players[1]
        : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ScoreInput
          disabled={overallWinner !== null}
          onAddHand={addHand}
          players={players}
        />

        <GameTracker
          completedGamesWon={completedGamesWon}
          gamesCompleted={gamesCompleted}
          onResetGame={resetGame}
          overallWinner={overallWinner}
          players={players}
          totalScores={totalScores}
        />
      </div>

      <ScoreCard
        gameScores={gameScores}
        gamesCompleted={gamesCompleted}
        hands={hands}
        players={players}
        totalScores={totalScores}
      />
    </div>
  );
}
