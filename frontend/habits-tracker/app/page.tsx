'use client';
import Image from "next/image";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchHabitsThunk} from "@/features/habit/habitSlice";
import {AppState, AppDispatch} from "../redux/store";
import Habits from "@/app/habits";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state:AppState) => state.habit.habits); //state.habits
  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Habits habits = {habits}/>
    </div>
  );
}
