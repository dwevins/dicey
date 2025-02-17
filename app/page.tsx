"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { RollHistoryItem } from "./model";
import HistoryItem from "./historyItem";

export default function Home() {
  const [numDice, setNumDice] = useState(1);
  const [rollHistory, setRollHistory] = useState<RollHistoryItem[]>([]);

  function handleNumDiceChange(e: ChangeEvent<HTMLInputElement>) {
    setNumDice(parseInt(e.target.value));
  }

  function calculateRolls() {
    const rolls = new Uint8Array(numDice);
    window.crypto.getRandomValues(rolls);

    setRollHistory([
      ...rollHistory,
      {
        timestamp: new Date(),
        rolls: Array.from(rolls).map((roll) => (roll % 6) + 1),
      },
    ]);
  }

  function roll(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(`rolling ${numDice} dice`);
    calculateRolls();
  }

  return (
    <main>
      <form onSubmit={roll}>
        <input
          type="number"
          name="numDice"
          id="numDice"
          onChange={handleNumDiceChange}
          value={numDice}
        />
        <button type="submit">roll</button>
      </form>

      {rollHistory.map((roll, index) => (
        <HistoryItem key={index} roll={roll} />
      ))}
    </main>
  );
}
