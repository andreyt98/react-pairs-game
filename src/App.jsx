import { useEffect, useState } from "react";
import { assets, default_img } from "./assets";
function App() {
  const [currentPlayCount, setCurrentPlayCount] = useState(0);
  const [clickedElements, setClickedElements] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);

  const [pairsCreated, setPairsCreated] = useState([]);
  const [playAgain, setPlayAgain] = useState(false);

  const isElementInPairs = (el) => {
    return pairsCreated.includes(el);
  };

  const isElementInClickedElementsArray = (el) => {
    return clickedElements.some((item) => item.id.includes(el));
  };

  const handleCount = () => {
    if (currentPlayCount != 2) {
      setCurrentPlayCount(currentPlayCount + 1);
    } else {
      setCurrentPlayCount(1);
    }
  };

  const handleClick = (el) => {
    if (!isElementInClickedElementsArray(el.id)) {
      handleCount();
      setClickedElements([...clickedElements, { id: el.id, img: el.img }]);

      if (clickedElements.length == 2 && !isElementInPairs(el.img)) {
        setClickedElements([{ id: el.id, img: el.img }]);
      }

      if (clickedElements.some((item) => item.img.includes(el.img)) && clickedElements.length < 2) {
        setPairsCreated([...pairsCreated, el.img]);
        setClickedElements([]);
      }
    } else {
      const aux = clickedElements.filter((elements) => {
        return elements.id != el.id;
      });
      setClickedElements(aux);
      if (currentPlayCount > 0) {
        setCurrentPlayCount(currentPlayCount - 1);
      }
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Hacemos una copia del array original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generamos un índice aleatorio
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Intercambiamos los elementos
    }
    return shuffledArray;
  };

  const resetGame = () => {
    setPairsCreated([]);
    setClickedElements([]);
    setCurrentPlayCount(0);
    setPlayAgain(true);
  };
  useEffect(() => {
    // Barajamos el array de datos
    setShuffledArray(shuffleArray(assets));
    setPlayAgain(false);
  }, [playAgain]);

  return (
    <>
      {pairsCreated.length == 6 ? (
        <>
          <p style={{ textAlign: "center" }}>you win!</p>

          <button
            onClick={() => {
              resetGame();
            }}
          >
            Play again!
          </button>
        </>
      ) : (
        <>
          <h1>PAIRS GAME!</h1>
          <div className="board">
            {shuffledArray.map((el) => {
              return (
                <img
                  className="card"
                  src={isElementInClickedElementsArray(el.id) || isElementInPairs(el.img) ? el.img : default_img}
                  key={el.id}
                  style={{ backgroundColor: isElementInClickedElementsArray(el.id) || isElementInPairs(el.img) ? "#3b3b5e" : "white", pointerEvents: isElementInPairs(el.img) ? "none" : "auto" }}
                  onClick={() => {
                    handleClick(el);
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default App;
