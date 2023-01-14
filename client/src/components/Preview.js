import React, { useState, useEffect } from "react";
import styles from "./Preview.module.css";

function Preview(props) {

  return (
    <div className="root">
      <table>
        <colgroup>
          <col width="" />
          <col width="" />
          <col width="" />
        </colgroup>
        <thead>
          <tr>
            <th colSpan="2">Target Goal Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>세일즈 퍼널 위치</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>경쟁대비 위치</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>성공 가능성</th>
            <td></td>
            <td></td>
          </tr>
        </tbody>

      </table>
    </div>
  );
}

export default Preview;
