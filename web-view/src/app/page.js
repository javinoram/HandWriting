'use client'
import React from "react";

export default function Home() {
  return (
    <div className="container-sm px-3 text-center">
      <p>Welcome, here you can draw the characters that you want that the neural network read.</p>
      <p>For the moment, we only have available hiragana for japanese, single characters for hangul and non-cursive russian characters.</p>
      <p>To have accurate prediction, we recommended to draw the characters well separated (to assure that the split algorithm works fine), 
        and if you upload an image, this one should have a white background and the character writted in black.</p>

      <h4>Technology stack</h4>
      <p>For the web interface we use Nextjs with React. The neural models are done using tensorflow and the API using Flask.</p>
    </div>

  );
}
