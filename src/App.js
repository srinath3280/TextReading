import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [highlightedWord, setHighlightedWord] = useState({ sentenceIndex: null, wordIndex: null });
  const [rate, setRate] = useState(1); // Default reading speed
  const [voice, setVoice] = useState(null); // Selected voice
  const [voices, setVoices] = useState([]); // Available voices

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setVoice(availableVoices[0].name);
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, []);

  const text = [
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, \n or randomised words which don't look even slightly believable.",
    "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    "Lorem Ipsum is not simply random text."
  ];

  const handleSentenceClick = (sentence, index) => {
    readSentence(sentence, index);
  };

  const readSentence = (sentence, sentenceIndex) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = rate;

    if (voice) {
      const selectedVoice = voices.find(v => v.name === voice);
      utterance.voice = selectedVoice;
    }

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const wordIndex = event.charIndex === 0 ? 0 : sentence.substring(0, event.charIndex).split(' ').length - 1;
        setHighlightedWord({ sentenceIndex, wordIndex });
      }
    };

    utterance.onend = () => {
      setHighlightedWord({ sentenceIndex: null, wordIndex: null });
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className='App'>
      <h1>Reading the sentences</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Speed:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          {rate}x &nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <label>
          Voice:
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {voices.map((v, index) => (
              <option key={index} value={v.name}>{v.name}</option>
            ))}
          </select>
        </label>
      </div>
      
      <div style={{margin:'25px 0px'}}>
        {text.map((sentence, sentenceIndex) => (
          <p
            key={sentenceIndex}
            onClick={() => handleSentenceClick(sentence, sentenceIndex)}
            style={{ cursor: 'pointer', color: highlightedWord.sentenceIndex === sentenceIndex ? 'brown' : 'black' }}
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
// import './App.css'

// const App = () => {
//   const [highlightedWord, setHighlightedWord] = useState({ sentenceIndex: null, wordIndex: null });

//   // const text1 = [
//   //   'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//   //   'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,',
//   //   'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
//   // ];

//   const text = [
//     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, \n or randomised words which don't look even slightly believable.",
//     "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
//     "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
//     "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
//     "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
//     "Lorem Ipsum is not simply random text."
//   ]

//   const handleSentenceClick = (sentence, index) => {
//     readSentence(sentence, index);
//   };

//   const readSentence = (sentence, sentenceIndex) => {
//     const utterance = new SpeechSynthesisUtterance(sentence);
    
//     // Split the sentence into words for easier tracking
//     // const words = sentence.split(' ');

//     utterance.onboundary = (event) => {
//       if (event.name === 'word') {
//         // Find the current word being spoken
//         const wordIndex = event.charIndex === 0 ? 0 : sentence.substring(0, event.charIndex).split(' ').length - 1;
//         setHighlightedWord({ sentenceIndex, wordIndex });
//       }
//     };

//     utterance.onend = () => {
//       // Clear the highlighted word when done
//       setHighlightedWord({ sentenceIndex: null, wordIndex: null });
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className='App'>
//       <h1>Reading the sentences</h1>
//       <div style={{margin:'25px 0px'}}>
//       {text.map((sentence, sentenceIndex) => (
//         <p
//           key={sentenceIndex}
//           onClick={() => handleSentenceClick(sentence, sentenceIndex)}
//           style={{ cursor: 'pointer',color: highlightedWord.sentenceIndex === sentenceIndex?'brown':'black' }}
//         >
//           {sentence.split(' ').map((word, wordIndex) => (
//             <span
//               key={wordIndex}
//               style={{
//                 backgroundColor: highlightedWord.sentenceIndex === sentenceIndex && highlightedWord.wordIndex === wordIndex ? 'yellow' : 'transparent',
//                 marginRight: '4px',
//               }}
//             >
//               {word}
//             </span>
//           ))}
//         </p>
//       ))}
//       </div>
//     </div>
//   );
// };

// export default App;










// // import React, { useState } from 'react';

// // const App = () => {
// //   const [highlightedWord, setHighlightedWord] = useState('');

// //   const text = [
// //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// //     'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,',
// //     'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
// //   ];

// //   const handleSentenceClick = (sentence) => {
// //     readSentence(sentence);
// //   };

// //   const readSentence = (sentence) => {
// //     const utterance = new SpeechSynthesisUtterance(sentence);
    
// //     // Split the sentence into words for easier tracking
// //     const words = sentence.split(' ');

// //     utterance.onboundary = (event) => {
// //       if (event.name === 'word') {
// //         // Find the current word being spoken
// //         const wordIndex = event.charIndex === 0 ? 0 : sentence.substring(0, event.charIndex).split(' ').length - 1;
// //         setHighlightedWord(words[wordIndex]);
// //       }
// //     };

// //     utterance.onend = () => {
// //       // Clear the highlighted word when done
// //       setHighlightedWord('');
// //     };

// //     window.speechSynthesis.speak(utterance);
// //   };

// //   return (
// //     <div>
// //       {text.map((sentence, index) => (
// //         <p
// //           key={index}
// //           onClick={() => handleSentenceClick(sentence)}
// //           style={{ cursor: 'pointer' }}
// //         >
// //           {sentence.split(' ').map((word, wordIndex) => (
// //             <span
// //               key={wordIndex}
// //               style={{
// //                 backgroundColor: word === highlightedWord ? 'yellow' : 'transparent',
// //                 marginRight: '4px',
// //               }}
// //             >
// //               {word}
// //             </span>
// //           ))}
// //         </p>
// //       ))}
// //     </div>
// //   );
// // };

// // export default App;










// // import React, { useState } from 'react';

// // const App = () => {
// //   const [highlightedWord, setHighlightedWord] = useState('');
  
// //   const text = [
// //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// //     'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,',
// //     'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
// //   ];

// //   const handleSentenceClick = (sentence) => {
// //     readSentence(sentence);
// //   };

// //   const readSentence = (sentence) => {
// //     const utterance = new SpeechSynthesisUtterance(sentence);
// //     utterance.onboundary = (event) => {
// //       if (event.name === 'word') {
// //         const word = sentence.split(' ')[event.charIndex];
// //         setHighlightedWord(word);
// //       }
// //     };
// //     window.speechSynthesis.speak(utterance);
// //   };

// //   return (
// //     <div>
// //       {text.map((sentence, index) => (
// //         <p
// //           key={index}
// //           onClick={() => handleSentenceClick(sentence)}
// //           style={{ cursor: 'pointer' }}
// //         >
// //           {sentence.split(' ').map((word, wordIndex) => (
// //             <span
// //               key={wordIndex}
// //               style={{
// //                 backgroundColor: word === highlightedWord ? 'yellow' : 'transparent',
// //                 marginRight: '4px',
// //               }}
// //             >
// //               {word}
// //             </span>
// //           ))}
// //         </p>
// //       ))}
// //     </div>
// //   );
// // };

// // export default App;








// // import React, { useState } from 'react';
// // import './App.css';

// // function App() {
// //   const [selectedText, setSelectedText] = useState('');
// //   const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// //    Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, 
// //    when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
// //   const handleTextSelection = () => {
// //     const selected = window.getSelection().toString();
// //     if (selected) {
// //       setSelectedText(selected);
// //       const utterance = new SpeechSynthesisUtterance(selected);
// //       window.speechSynthesis.speak(utterance);
// //     }
// //   };
// //   return (
// //     <div className="App">
// //       <h1>Reading the text by selected portion</h1>

// //       {/* <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
// //         <p onClick={() => { handleTextSelection() }} style={{ textAlign: 'justify' }}>
// //           {text}
// //         </p>
// //       </div> */}

// //       <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
// //         <p onMouseUp={handleTextSelection} style={{ textAlign: 'justify' }}>
// //           {text.split(selectedText).map((part, index, array) => (
// //             <span key={index}>
// //               {part}
// //               {index < array.length - 1 && <span className="highlight">{selectedText}</span>}
// //             </span>
// //           ))}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;