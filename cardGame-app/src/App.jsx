import React, { useState, useEffect } from 'react';
import './App.css'
const App = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [unFlipped, setUnFlipped] = useState({});
  const [val, setVal] = useState(null);
  const [val1, setVal1] = useState('');
  const [disabled , setDisabled] = useState({});
  const [winner , setWinner] = useState('')
  useEffect(() => {
    const fetchDeckId = async () => {
      try {
        const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/');
        const data = await response.json();
        setDeckId(data.deck_id);
      } catch (error) {
        console.error('Error fetching deck ID:', error);
      }
    };

    fetchDeckId();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const drawCards = async () => {
      if (!deckId) return;

      const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setCards(data.cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    drawCards();
  }, [deckId]); // This runs only when deckId changes

  const handleFlip = (index) => {
    setUnFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCardValue = (card  ,index) => {
    switch (card.value) {
      case "JACK":
        val1 ? setVal1('11') : null;
      
        break;
      case "QUEEN":
       val1 ?  setVal1('12') : null;
        break;
      case "KING":
        val1 ? setVal1('13') : null;
        break;
      case "ACE":
        val1 ? setVal1('14'): null;
        break;
      default:
        console.log('Card value not available');
    }

    if (!val) {
      setVal(card.value);
    
    } 
      if(!val1 && val){
        setVal1(card.value)
      }   else {
      // setVal1(card.value);
      handlePlay(val, val1 , card , index);
    }
  };

  const handlePlay = (card1, card2 , card , index) => {
    console.log(card1, card2);
    console.log(card.value)
    if (card1 > card2) {
      console.log('Player wins!');
      setVal(card.value)
      setVal1('')
      setWinner(card1)
    } else if (card1 < card2) {
        setVal(card.value)
        setVal1('')
      console.log('Opponent wins!');
    }else if(card1 === card2){
      setVal(card.value)
      setVal1('')
      setDisabled((prev) => ({
        ...prev,
        [index]: true
      }))
      console.log('It\'s a tie!');
      }
  };  

  return (
    <div className='gameBoard'>
      <h1>{winner ? `${winner} IS THE BIGGER CARD`:null}`</h1>
      {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index}>
        
              <img
                className='cards'
                alt='no image'
                src={unFlipped[index] ? card.image : 'https://www.deckofcardsapi.com/static/img/back.png'}
                width={100}
                onClick={(e) => {
                 if(!disabled[index]){
                  handleFlip(index);
                  handleCardValue(card,index, );
                }
                  
                }}
                style={{ cursor: disabled[index] ? 'not-allowed' :'pointer' }}
              />
            
            </div>
          ))
      ) : (
        <p>No cards drawn yet.</p>
      )}
    </div>
  );
};

export default App;
