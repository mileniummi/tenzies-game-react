export default function Dice(props) {
    const {die, clickHandler} = props
    return (
        <div className="die" style={{backgroundColor: die.isHold ? "#59E391" : "#fff"}} onClick={clickHandler}> {die.number} </div>
    )
}