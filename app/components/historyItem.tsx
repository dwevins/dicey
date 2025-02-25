"use client";

import { RollHistoryItem } from "../model";

interface Props {
  roll: RollHistoryItem;
}

export default function HistoryItem({ roll }: Props) {
  const rollString = roll.rolls.toSorted().toString().replaceAll(",", ", ");
  const timeString = roll.timestamp.toLocaleTimeString("en-US");

  return (
    <div>
      <p>{timeString}</p>
      <p className="font-bold">{rollString}</p>
    </div>
  );
}
