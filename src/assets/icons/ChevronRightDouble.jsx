import React from 'react';

function ChevronRightDouble({className,strokeWidth}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
</svg>;
}

export default ChevronRightDouble;

