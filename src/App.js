import React from "react";
import Dice from "./components/Dice"
import {nanoid} from "nanoid"
import ReactConfetti from "react-confetti";

export default function App() {
    const [dies, setDies] = React.useState(allNewDies())
    const [tenzies, setTenzies] = React.useState(false)

    function handleDieClick(dieId) {
        setDies(oldDice => oldDice.map(die => {
            return die.id === dieId ?
                {...die, isHold: !die.isHold} :
                die
        }))
    }

    React.useEffect(() => {
        let allIsHold = dies.every(die => die.isHold)
        let firstNum = dies[0].number
        let allIsTheSame = dies.every(die => die.number === firstNum)
        if (allIsHold && allIsTheSame) {
            setTenzies(true)
        }
    }, [dies])

    function allNewDies() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push({id: nanoid(), number: Math.ceil(Math.random() * 6), isHold: false})
        }
        return arr
    }

    function rerollDies() {
        if (tenzies) {
            setDies(allNewDies)
            setTenzies(false)
        } else {
            setDies(prevState => {
                let newDies = []
                prevState.forEach(die => {
                    if (die.isHold === false) {
                        die.number = Math.ceil(Math.random() * 6)
                    }
                    newDies.push(die)
                })
                return newDies
            })
        }
    }

    const diesComponents = dies.map(die => <Dice key={die.id} die={die} clickHandler={() => handleDieClick(die.id)}/>)

    return (
        <main>
            <div className="tenzies-container">
                <div className="game-info">
                    <h1 className="game-name">
                        Tenzies
                    </h1>
                    <h2 className="game-description">
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </h2>
                </div>
                <div className="die-container">
                    {diesComponents}
                </div>
                <button onClick={rerollDies} className="reroll-dies">
                    {tenzies ? "New Game" : "Roll"}
                </button>
                {tenzies && <ReactConfetti/>}
            </div>
        </main>
    )
}
