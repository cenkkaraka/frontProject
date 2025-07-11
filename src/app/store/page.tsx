"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { BalanceContext } from "../../context/balanceContext/BalanceContext";
import styles from "./store.module.css";

export default function Store() {
  const {
    balance,
    totalPapatya,
    totalLale,
    papatyaPrice,
    laleprice,
    decrementFunc,
    setTotalPapatya,
    setTotalLale,
  } = useContext(BalanceContext);

  const [papatyaAdet, setPapatyaAdet] = useState(0);
  const [laleAdet, setLaleAdet] = useState(0);

  const handleBuy = (flower: "papatya" | "lale") => {
    if (flower === "papatya") {
      const totalCost = papatyaAdet * 10;
      if (balance >= totalCost) {
        decrementFunc(totalCost);
        setTotalPapatya((prev) => prev + papatyaAdet);
        setPapatyaAdet(0);
      } else {

      }
    } else if (flower === "lale") {
      const totalCost = laleAdet * 20;
      if (balance >= totalCost) {
        decrementFunc(totalCost);
        setTotalLale((prev) => prev + laleAdet);
        setLaleAdet(0);
      } else {

      }
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.bas}>Mahallenizin Çiçekçisi</p>
      <br /><br /><br /><br />
      <div className={styles.flowerContainer}>
        
        {/* Papatya */}
        <div className={styles.flowerbox}>
          <Image src="/Daisy.png" alt="Papatya" width={100} height={30} />
          <p>Papatya</p>
          <p>${10}.00 / adet</p>
          <button className={styles.button} onClick={() => setPapatyaAdet((prev) => Math.max(0, prev - 1))}>-</button>
          {papatyaAdet}
          <button className={styles.button} onClick={() => setPapatyaAdet((prev) => prev + 1)}>+</button>
          <p>Toplam: ${papatyaAdet * 10}.00</p>
          <button className={styles.buttonal} onClick={() => handleBuy("papatya")}>Tohum al</button>
          Satın alınan toplam: {totalPapatya}
        </div>

        {/* Lale */}
        <div className={styles.flowerbox}>
          <Image src="/Tulip.png" alt="Lale" width={100} height={30} />
          <p>Lale</p>
          <p>${20}.00 / adet</p>
          <button className={styles.button} onClick={() => setLaleAdet((prev) => Math.max(0, prev - 1))}>-</button>
          {laleAdet}
          <button className={styles.button} onClick={() => setLaleAdet((prev) => prev + 1)}>+</button>
          <p>Toplam: ${laleAdet * 20}.00</p>
          <button className={styles.buttonal} onClick={() => handleBuy("lale")}>Tohum al</button>
          Satın alınan toplam: {totalLale}
        </div>

      </div>

      <p>Bakiyen: ${balance}</p>
      <br /><br />
    </div>
  );
}
