import React from 'react';

export default function ChevronDown({strokeWidth,className}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M9 5l7 7-7 7" />
</svg>;
}


