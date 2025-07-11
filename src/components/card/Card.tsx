import { useState } from "react";
import styles from "./Card.module.css";

export default function Tarla() {
  const [index, setIndex] = useState(0);
  const harfler = ["", "t", "f", "b", "ç", "k"];
  function ilerle(i: number) {
      if (i === harfler.length) return; 

      setIndex(i);
      setTimeout(() => {
        ilerle(i + 1);
      }, harfler[i] === "ç" ? 4000 : 2000);
    }
  function handleClick() {
    if(harfler[index] ==="k"){
        setIndex(0);
    }
    else{
    ilerle(1); 
    }
  }

  return (
    <div className={styles.kutu} onClick={handleClick}>
      {harfler[index]}
    </div>
  );
}
