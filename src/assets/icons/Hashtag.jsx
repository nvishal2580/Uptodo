import React from 'react';

export default function Hashtag({strokeWidth,className}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
</svg>;
}
