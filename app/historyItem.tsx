"use client";

import { RollHistoryItem } from "./model";

interface Props {
  roll: RollHistoryItem;
}

export default function HistoryItem({ roll }: Props) {
  const rollString = roll.rolls.toString().replaceAll(",", ", ");
  const timeString = roll.timestamp.toTimeString();

  return (
    <div>
      <p>{timeString}</p>
      <p>{rollString}</p>
    </div>
  );
}
