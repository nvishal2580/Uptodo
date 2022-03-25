export default {
    control: {
      backgroundColor: '#fff',
      fontSize: 14,
      fontWeight: 'normal',
    },
  
    '&multiLine': {
      control: {
        fontFamily: 'monospace',
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        border: '1px solid transparent',
      },
      input: {
        padding: 9,
        border: '1px solid silver',
      },
    },
  
    '&singleLine': {
      display: 'inline-block',
  
      highlighter: {
        padding: 1,
        border: '2px inset transparent',
      },
      input: {
        padding: 1,
        border: '2px inset',
        width: '100%'
      },
    },
  
    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        fontSize: 14,
        zIndex : '50 !important' 
      },
      item: {
        padding: '5px 15px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        '&focused': {
          backgroundColor: '#cee4e5',
        },
      },
    },
  }