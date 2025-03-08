import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Hand {
  id: number;
  scores: [number, number];
  winner: number | null;
}

interface GameScores {
  player1: number[];
  player2: number[];
}

interface ScoreCardProps {
  players: [string, string];
  hands: Hand[];
  gameScores: [GameScores, GameScores, GameScores];
  totalScores: number[][];
  gamesCompleted: boolean[];
}

export default function ScoreCard({
  players,
  hands,
  gameScores,
  totalScores,
  gamesCompleted,
}: ScoreCardProps) {
  // Generate rows for 20 possible hands
  const handRows = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Score History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            {/* Header Rows */}
            <thead>
              <tr>
                <th className="w-12 border-b border-r bg-muted p-2 text-center font-medium">
                  {/* Empty cell - removed "Player" text */}
                </th>
                {[1, 2, 3].map((gameNum) => (
                  <th
                    className={cn(
                      "border-b border-r p-2 text-center font-medium",
                      gamesCompleted[gameNum - 1] && "bg-primary/5",
                    )}
                    colSpan={2}
                    key={gameNum}
                  >
                    Game #{gameNum}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="w-12 border-b border-r bg-muted p-2 text-center font-medium">
                  Hand
                </th>
                {[1, 2, 3].map((gameNum) => (
                  <React.Fragment key={gameNum}>
                    <th
                      className={cn(
                        "w-[100px] border-b border-r p-2 text-center font-medium",
                        gamesCompleted[gameNum - 1] && "bg-primary/5",
                      )}
                    >
                      {players[0]}
                    </th>
                    <th
                      className={cn(
                        "w-[100px] border-b border-r p-2 text-center font-medium",
                        gamesCompleted[gameNum - 1] && "bg-primary/5",
                      )}
                    >
                      {players[1]}
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            {/* Score Grid */}
            <tbody>
              {handRows.map((handNum) => (
                <tr className="group" key={handNum}>
                  <td className="w-12 border-b border-r bg-background p-2 text-center font-medium text-muted-foreground group-hover:bg-muted/50">
                    {handNum}
                  </td>
                  {[0, 1, 2].map((gameIndex) => {
                    // Calculate which hand index to use for this game
                    const handIndex = handNum - 1;
                    const hasScore =
                      handIndex < gameScores[gameIndex].player1.length ||
                      handIndex < gameScores[gameIndex].player2.length;

                    return (
                      <React.Fragment key={gameIndex}>
                        <td
                          className={cn(
                            "border-b border-r p-2 text-center",
                            gamesCompleted[gameIndex] && "bg-primary/5",
                            "group-hover:bg-muted/50",
                          )}
                        >
                          {hasScore
                            ? gameScores[gameIndex].player1[handIndex] || "-"
                            : ""}
                        </td>
                        <td
                          className={cn(
                            "border-b border-r p-2 text-center",
                            gamesCompleted[gameIndex] && "bg-primary/5",
                            "group-hover:bg-muted/50",
                          )}
                        >
                          {hasScore
                            ? gameScores[gameIndex].player2[handIndex] || "-"
                            : ""}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}

              {/* Game Totals Row */}
              <tr className="font-bold">
                <td className="w-12 border-b border-r bg-muted p-2 text-center">
                  GAME
                </td>
                {totalScores.map((scores, gameIndex) => (
                  <React.Fragment key={gameIndex}>
                    <td
                      className={cn(
                        "border-b border-r p-2 text-center",
                        gamesCompleted[gameIndex] && "bg-primary/5",
                      )}
                    >
                      {scores[0]}
                    </td>
                    <td
                      className={cn(
                        "border-b border-r p-2 text-center",
                        gamesCompleted[gameIndex] && "bg-primary/5",
                      )}
                    >
                      {scores[1]}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
