import { React , useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cards , setCards] =useState([]);
  // const [deckId , setDeckId] = useState([]);

  let deckId = '';
  useEffect(() => {
   
    const shuffleDeck = async ()=>{
      const url = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

      try{
        const res = await fetch(url);
        const data = await res.json();

      if(typeof data !== 'undefined'){
        deckId = data.deck_id
        
      }else{
        console.error('cards ot in array', deckId ,data)
      }
        console.log('deck',deckId)
      }catch(err){
        console.error(err)
      }
      // otfut3mywmrx
    }
      // return () => shuffleDeck()
  } , [])

  useEffect(() => {
    const drawCard = async()=>{
      console.log('draw',deckId)

      
      const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`;
      try{
        const res = await fetch(url);
        const data = await res.json();

        if(typeof data !== 'undefined') {
           setCards(data.cards)

        } else {
          console.error('cards ot in array', deckId, data)
        }
       
        console.log('draw',data.cards)
      }catch(err){
        console.error(err);
      }
    }
      // return ()=>drawCard()
  }, [])
  return (
    <>
      <ul>
      {Array.isArray(cards)&& 
           cards.map((card ,i) => (
        <li key={i}>
            {card.value}
          list
        </li>
      ))
    }
      </ul>
    </>
  )
}

export default App
