import {useState , useEffect} from 'react';

import './App.css';

export default function App(){
    const [cards , setCards]= useState([]);
    const [deckId , setDeckId] = useState('');
    
  useEffect(() =>{
    const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    const getDeckId = async ()=>{
      try{
        const res = await fetch(url);
        const data = await res.json();
        setDeckId(data.deck_id)

      }catch(error){
        console.error('data no available', data)
      }
    }
      getDeckId()
  },[])

  useEffect(() => {

    if(!deckId) return;
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
    const getCards = async ()=> {
      try{
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.cards)
        setCards(data.cards)
      }catch(error){

      }  
    }
      getCards()
  }, [deckId])

  let player1;
  let player2;
    const handlePlay = (card)=>{
        if(!player1){
        player1 = card.value
        console.log('p1', player1)
        }else{
          player2 = card.value;
          console.log(player1 === player2 ? player1 = '': player2)
          return;
        }
        
    }

  return(
    <>
      <ul>
      {cards.length > 0 ? (
        cards.map((card , index) => (
            <li key={index}>
              <img
              className='cards'
              alt='no image'
              src={card.image}
              width={100}
              onClick={()=>{
                handlePlay(card)
              }}
              />
            </li>
        )) 
      ) : (
          <>Image Not Available</>
        )}  
      </ul>
    </>
  )
}
