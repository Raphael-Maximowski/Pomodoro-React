import './style.scss'
import Display from "../../components/Display";
import StartAndStop from "../../components/StartAndStop";
import Tasks from "../../components/Tasks";
import {useEffect, useState} from "react";


const Pomodoro = () => {

    const Colors = ['#BA4949','#38858A', '#397097' ]
    const [ Color, SetColor ] = useState('#BA4949')

    const Sequency = ['Short Break', 'Pomodoro', 'Short Break', 'Pomodoro', 'Short Break', 'Pomodoro', 'Long Break', ]

    const [ SequencyCounter, SetSequency ] = useState(6)

    const [ initialState, SetInitialState ] = useState('Pomodoro')

    const [ Minutes, SetMinutes ] = useState(0)
    const [ Seconds, SetSeconds ] = useState(0)

    const [ TimerState, SetTimerState ] = useState(false)

    const ActiveTimer = (value) => {
        SetTimerState(value)
    }

    useEffect(() => {
        if (TimerState) {
            console.log('Entrou no If');
            const Interval = setInterval(() => {
                console.log('Entrou no Intervalo');
                SetSeconds((prevSeconds) => {
                    console.log('Ultimos Segundos', prevSeconds);
                    if (prevSeconds === 0) {
                        SetSeconds(60);
                        SetMinutes((prevMinutes) => {
                            if (prevMinutes === 0) {
                                SetSequency((prevSequency) => {
                                    if (prevSequency === 7) {
                                        SetInitialState('Pomodoro');
                                        return 0;
                                    }
                                    SetInitialState(Sequency[prevSequency]);
                                    return prevSequency + 1;
                                });
                            } else {
                                return prevMinutes - 1;
                            }
                        });
                        return;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
            return () => clearInterval(Interval);
        }

        console.log('time stop');
    }, [ TimerState ]);

    useEffect(() => {
        if (initialState === 'Pomodoro') {
            SetMinutes(0)
            SetSeconds(10)
            SetColor(Colors[0])
        } else if (initialState === 'Short Break') {
            SetMinutes(0)
            SetSeconds(10)
            SetColor(Colors[1])
        } else if (initialState === 'Long Break') {
            SetMinutes(0)
            SetSeconds(10)
            SetColor(Colors[2])
        }
    }, [initialState])

    return (
        <main style={{ backgroundColor: Color }}>
            <section id={'DisplayContainer'}>
                <Display Color={Color} TypeSetter={SetInitialState} Seconds={Seconds} Minutes={Minutes} />
            </section>
            <section id={'StartStopContainer'}>
                <StartAndStop Color={Color} SetTimer={ActiveTimer} TimerValue={TimerState}  />
            </section>
            <section id={'TasksContainer'}>
                <Tasks Color={Color} />
            </section>
        </main>
    )
}

export default Pomodoro