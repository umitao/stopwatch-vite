import React from "react";

export default function EmptyRows({ lapsLength }) {
  const emptyRowsCount = 8 - lapsLength;
  if (emptyRowsCount > 0) {
    const emptyRows = new Array(emptyRowsCount).fill("").map((_, i) => (
      <tr key={i}>
        <td> </td>
        <td> </td>
      </tr>
    ));
    return emptyRows;
  }
  return null;
}
