"use client";
import {useContext} from "react";
import { BalanceContext } from "../../context/balanceContext/BalanceContext";
import Card from "../../components/card/Card"
import styles from "./game.module.css"
import { useRouter } from 'next/navigation';
export default function SignUp() {
const router = useRouter()
const constBalance = useContext(BalanceContext)
  function goStore(){
    router.push('/store')
  }
  return (
    <div>
    <p >Balance: {constBalance.balance}$</p><br /><br />
    <div className={styles.container}>
      
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
   </div>
   <button className={styles.btn} onClick={goStore}>STORE</button>
   </div>
  );
}
