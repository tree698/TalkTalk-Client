import React from 'react';

export default function Banner({ text }) {
  return <div>{text && <p>👍 {text}</p>}</div>;
}
