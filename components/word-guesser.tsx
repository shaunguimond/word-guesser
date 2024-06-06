'use client';

import React, { useState, useEffect } from "react";
import { WORDS } from "../lib/constants";


export default function WordGuesser() {
const [isClient, setIsClient] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [wordList, setWordList] = useState<string[]>([]);
    const [enteredWord, setEnteredWord] = useState<JSX.Element | undefined>(undefined);
    const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
    const [wordifiedWord, setWordifiedWord] = useState<string>("");

    useEffect(() => {
        const randomWord = getRandomWord(WORDS);
        setWordOfTheDay(randomWord);
        setWordifiedWord(WORDS.get(randomWord) || "");
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsClient(true);  
    }, []);

    function getRandomWord(collection: Map<string, string>):string {
        let keys = Array.from(collection.keys());
        return keys[Math.floor(Math.random() * keys.length)];
    }

    const handleWordifySubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (inputValue.length != 5) {
            alert("Please enter a 5 letter word");

        }  else {
            setWordList(prev => {
                const updatedList = [...prev, inputValue.toLocaleUpperCase()];
                setEnteredWord(breakOutInput(updatedList));
                return updatedList;
            });
            setInputValue("");

        }
    }

    function confirmWord():Boolean {
        if (inputValue.toLocaleUpperCase() === wordOfTheDay) {
            return true;
        }
        return false;
    }

    function Lose():Boolean {
        return wordList.length > 4;
    }

    function breakOutInput(listOfWords: string[]):JSX.Element {
            return (
                <React.Fragment>
                        {listOfWords.map((item:string, index) => (
                            <React.Fragment key={index}>
                            <li>
                                {item.split('').map((char: string, charIndex: number) => (
                                    <span className={confirmChar(char, charIndex)} key={charIndex}>{char}</span>
                                ))}
                            </li>
                            </React.Fragment>
                        ))}
                </React.Fragment>
            );
    }

    function confirmChar(character: string, charIndex: number):string {
        
        console.error(character, charIndex);
        if (character === wordOfTheDay.charAt(charIndex)) {
            
            return "correct-char";
        } else {
            return "incorrect-char";
        }
    }

    return (
        <div className="word-guesser">
            <h1 className="text-2xl">Wordify</h1>
            <h2>Word of the Day: {isClient ? wordifiedWord : "Loading..."}</h2>
            <ul id="word-list">
               {enteredWord}
            </ul>

            { 
                confirmWord() === true ? 
                <div className="you-win">You win</div> : 
                Lose() === true ? 
                <div className="you-lose">You lose</div> :
                <form id="word-form">
                    <input type="text" id="word-input" value={inputValue} placeholder="Enter guess" onChange={(event) => setInputValue(event.target.value)}  />
                    <button id="submit" onClick={handleWordifySubmit}>Submit</button>
                </form>

            }
            

        </div>
    );
}