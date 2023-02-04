import React from 'react';

export default function Banner({ text }) {
  return <>{text && <p>{text}</p>}</>;
}
