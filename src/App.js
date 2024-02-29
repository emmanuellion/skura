import s from './app.module.sass';
import {useEffect, useState} from "react";

const YEN_VALUE = 161.92;

function App() {
    const [euros, setEuros] = useState(0);
    const [yen, setYen] = useState(0);

    function cleanNumber(value){
        let res = 0;
        if(value.length > 0 && parseInt(value)){
            res = parseInt(value);
        }
        return res;
    }

    return (
        <div className={s.app}>
            <div>
                <label>Euros</label>
                <input
                    type={"number"}
                    placeholder={"1.00"}
                    value={euros}
                    onChange={(e) => {
                        const newVal = cleanNumber(e.target.value);
                        setYen(Math.round((newVal*YEN_VALUE) * 100) / 100);
                        setEuros(newVal)}
                }/>
            </div>
            <img src={"/equal.png"} alt={"equal"} className={s.equal}/>
            <div>
                <label>Yen</label>
                <input
                    type={"number"}
                    placeholder={"1.00"}
                    value={yen}
                    onChange={(e) => {
                        const newVal = cleanNumber(e.target.value);
                        setEuros(Math.round((newVal/YEN_VALUE) * 100) / 100);
                        setYen(newVal)}
                }/>
            </div>
        </div>
    );
}

export default App;
