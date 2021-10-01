import React from "react";

export default function EmptyRows({ lapsLength }) {
  const emptyRowsNumber = 7 - lapsLength;
  if (emptyRowsNumber > 0) {
    const emptyRows = new Array(emptyRowsNumber).fill("").map((_, i) => (
      <tr key={i}>
        <td> </td>
        <td> </td>
      </tr>
    ));
    return emptyRows;
  }
  return null;
}
