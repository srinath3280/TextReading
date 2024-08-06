import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [highlightedWord, setHighlightedWord] = useState({ sentenceIndex: null, wordIndex: null });

  const text = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,',
    'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  ];

  const handleSentenceClick = (sentence, index) => {
    readSentence(sentence, index);
  };

  const readSentence = (sentence, sentenceIndex) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    
    // Split the sentence into words for easier tracking
    const words = sentence.split(' ');

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        // Find the current word being spoken
        const wordIndex = event.charIndex === 0 ? 0 : sentence.substring(0, event.charIndex).split(' ').length - 1;
        setHighlightedWord({ sentenceIndex, wordIndex });
      }
    };

    utterance.onend = () => {
      // Clear the highlighted word when done
      setHighlightedWord({ sentenceIndex: null, wordIndex: null });
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className='App'>
      <h1>Reading the sentences</h1>
      <div style={{margin:'25px 0px'}}>
      {text.map((sentence, sentenceIndex) => (
        <p
          key={sentenceIndex}
          onClick={() => handleSentenceClick(sentence, sentenceIndex)}
          style={{ cursor: 'pointer' }}
        >
          {sentence.split(' ').map((word, wordIndex) => (
            <span
              key={wordIndex}
              style={{
                backgroundColor: highlightedWord.sentenceIndex === sentenceIndex && highlightedWord.wordIndex === wordIndex ? 'yellow' : 'transparent',
                marginRight: '4px',
              }}
            >
              {word}
            </span>
          ))}
        </p>
      ))}
      </div>
    </div>
  );
};

export default App;










// import React, { useState } from 'react';

// const App = () => {
//   const [highlightedWord, setHighlightedWord] = useState('');

//   const text = [
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//     'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,',
//     'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
//   ];

//   const handleSentenceClick = (sentence) => {
//     readSentence(sentence);
//   };

//   const readSentence = (sentence) => {
//     const utterance = new SpeechSynthesisUtterance(sentence);
    
//     // Split the sentence into words for easier tracking
//     const words = sentence.split(' ');

//     utterance.onboundary = (event) => {
//       if (event.name === 'word') {
//         // Find the current word being spoken
//         const wordIndex = event.charIndex === 0 ? 0 : sentence.substring(0, event.charIndex).split(' ').length - 1;
//         setHighlightedWord(words[wordIndex]);
//       }
//     };

//     utterance.onend = () => {
//       // Clear the highlighted word when done
//       setHighlightedWord('');
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div>
//       {text.map((sentence, index) => (
//         <p
//           key={index}
//           onClick={() => handleSentenceClick(sentence)}
//           style={{ cursor: 'pointer' }}
//         >
//           {sentence.split(' ').map((word, wordIndex) => (
//             <span
//               key={wordIndex}
//               style={{
//                 backgroundColor: word === highlightedWord ? 'yellow' : 'transparent',
//                 marginRight: '4px',
//               }}
//             >
//               {word}
//             </span>
//           ))}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default App;










// import React, { useState } from 'react';

// const App = () => {
//   const [highlightedWord, setHighlightedWord] = useState('');
  
//   const text = [
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//     'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,',
//     'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
//   ];

//   const handleSentenceClick = (sentence) => {
//     readSentence(sentence);
//   };

//   const readSentence = (sentence) => {
//     const utterance = new SpeechSynthesisUtterance(sentence);
//     utterance.onboundary = (event) => {
//       if (event.name === 'word') {
//         const word = sentence.split(' ')[event.charIndex];
//         setHighlightedWord(word);
//       }
//     };
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div>
//       {text.map((sentence, index) => (
//         <p
//           key={index}
//           onClick={() => handleSentenceClick(sentence)}
//           style={{ cursor: 'pointer' }}
//         >
//           {sentence.split(' ').map((word, wordIndex) => (
//             <span
//               key={wordIndex}
//               style={{
//                 backgroundColor: word === highlightedWord ? 'yellow' : 'transparent',
//                 marginRight: '4px',
//               }}
//             >
//               {word}
//             </span>
//           ))}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default App;








// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [selectedText, setSelectedText] = useState('');
//   const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//    Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, 
//    when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
//   const handleTextSelection = () => {
//     const selected = window.getSelection().toString();
//     if (selected) {
//       setSelectedText(selected);
//       const utterance = new SpeechSynthesisUtterance(selected);
//       window.speechSynthesis.speak(utterance);
//     }
//   };
//   return (
//     <div className="App">
//       <h1>Reading the text by selected portion</h1>

//       {/* <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
//         <p onClick={() => { handleTextSelection() }} style={{ textAlign: 'justify' }}>
//           {text}
//         </p>
//       </div> */}

//       <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
//         <p onMouseUp={handleTextSelection} style={{ textAlign: 'justify' }}>
//           {text.split(selectedText).map((part, index, array) => (
//             <span key={index}>
//               {part}
//               {index < array.length - 1 && <span className="highlight">{selectedText}</span>}
//             </span>
//           ))}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;