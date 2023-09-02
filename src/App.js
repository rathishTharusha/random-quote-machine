import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const url  = "https://api.quotable.io/random"

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [theme, setTheme] = useState("")

  useEffect(() => {
      setLoading(true)
      fetch(url)
          .then(res => {
              if(res.ok){
                  return res.json()
              }
              throw res
      })
          .then(data => {
            console.log(data.content.length)
            if(data.content.length < 200){
              setData(data)
            }
          })
          .catch(msg => {
              console.log(`Error fetvhing data : ${msg}`)
              setError(true)
          })
          .finally(() => {
              setLoading(false)
          })
        }, [theme])
        
  const Themes = ["#FFBB5C", "$C08261", "#D8B4F8", "#45FFCA", "#96C291", "#7091F5", "#982176", "#7A316F", "#957777", "#F16767"]
  
  const changeQuote = () => {
    
    setTheme(prev => {
      let color = Themes[Math.floor(Math.random()*10)];
      while(color === prev){
        color = Themes[Math.floor(Math.random()*10)];
      }
      return color
    })
    
    document.getElementById("root").style.backgroundColor = theme
    document.getElementById("root").style.color = theme
    document.getElementById("new-quote").style.backgroundColor = theme
    document.getElementById("tweet-quote-btn").style.backgroundColor = theme
    console.log(data.content.length)
    
  }
 
  return (
    <div id='quote-box'>
      <div id='content'>
        {loading 
          ? <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          : error 
            ? "Error" 
            : <div>
            <p id='text'>
              <svg xmlns="http://www.w3.org/2000/svg" id='quote-mark' fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg>
              {data.content}</p>
            <p id='author'>- {data.author}</p>
          </div>
        }
      </div>
      <button id='tweet-quote-btn'>
      <a href='http://www.twitter.com/intent/tweet' id='tweet-quote' target='_blank' rel='noreferrer'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-twitter" viewBox="0 0 16 16" id='tweet-quote-svg'>
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
        </svg>
      </a>
      </button>
      <button id='new-quote' onClick={changeQuote}>New Quote</button>
    </div>
  );
}

export default App;