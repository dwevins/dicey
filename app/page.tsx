"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { RollHistoryItem } from "./model";
import HistoryItem from "./components/historyItem";

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

    if (numDice) {
      calculateRolls();
    }
  }

  return (
    <main className="mt-10 max-w-screen px-2">
      <form
        onSubmit={roll}
        className="max-w-screen-sm mx-auto flex gap-2 items-center"
      >
        <input
          className="py-1 px-2"
          pattern="\d*"
          step={1}
          min={1}
          type="number"
          name="numDice"
          id="numDice"
          onChange={handleNumDiceChange}
          value={numDice}
        />
        <div>
          <button className="border px-4 py-1 inline-block" type="submit">
            Roll
          </button>
        </div>
      </form>

      <div className="max-w-screen-sm mx-auto mt-10 grid gap-4">
        {rollHistory.map((roll, index) => (
          <HistoryItem key={index} roll={roll} />
        ))}
      </div>
    </main>
  );
}
