import { useContext, useState } from "react";
import styles from "./Card.module.css";
import { BalanceContext } from "../../context/balanceContext/BalanceContext";
import Image from "next/image";

export default function Tarla() {
  const {
    incrementFunc,
    totalPapatya,
    totalLale,
    setTotalPapatya,
    setTotalLale,
    papatyaPrice,
    laleprice,
  } = useContext(BalanceContext);

  const [index, setIndex] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<"papatya" | "lale" | null>(null);
  const harfler = ["", "t", "f", "b", "ç", "k"];

  function ilerle(i: number) {
    if (i === harfler.length) return;
    setIndex(i);
    const id = setTimeout(() => {
      ilerle(i + 1);
    }, harfler[i] === "ç" ? 4000 : 2000);
    setTimerId(id);
  }

  function startPlanting(flower: "papatya" | "lale") {
    // önce stoğu kontrol et
    if (flower === "papatya" && totalPapatya <= 0) {
      alert("Papatya stoğun yok, lütfen satın al!");
      setShowPopup(false);
      return;
    }
    if (flower === "lale" && totalLale <= 0) {
      alert("Lale stoğun yok, lütfen satın al!");
      setShowPopup(false);
      return;
    }

    // stoktan 1 eksilt
    if (flower === "papatya") setTotalPapatya((prev) => prev - 1);
    else setTotalLale((prev) => prev - 1);

    setSelectedFlower(flower);
    setShowPopup(false);
    ilerle(1);
  }

  function handleClick() {
    if (harfler[index] !== "" && harfler[index] !== "ç") {
      // animasyon ortasında tıklanırsa iptal et
      setIndex(0);
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }
      setSelectedFlower(null);
      return;
    }

    if (harfler[index] === "ç") {
      setIndex(0);
    
      if (selectedFlower === "papatya") incrementFunc(papatyaPrice);
      else if (selectedFlower === "lale") incrementFunc(laleprice);
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }
      setSelectedFlower(null);
      return;
    }

    // animasyon yok, popup aç
    if (harfler[index] === "") {
      setShowPopup(true);
    }
  }

  return (
    <div>
      <div className={styles.kutu} onClick={handleClick}>
        {selectedFlower && (
            <Image
            src={`/${selectedFlower === "papatya" ? `Daisy-${index}` : `Tulip-${index}`}.png`}
            alt={`${selectedFlower} stage ${index}`}
            width={50}
            height={50}
            onError={(e) => {
                e.currentTarget.style.display = "none"; 
      }}
                />
  )}
</div>

      {/* Popup */}
      {showPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()} // popup dışına tıklamada kapanacak, içine tıklamada kapanmasın
          >
            <h3>Hangi tohumu ekmek istiyorsun?</h3>
            <button onClick={() => startPlanting("papatya")}>
              Papatya ({totalPapatya})
            </button>
            <button onClick={() => startPlanting("lale")}>
               Lale ({totalLale})
            </button>
            <button onClick={() => setShowPopup(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}
