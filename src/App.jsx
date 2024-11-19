import './App.css'
import ChatBot from 'react-chatbotify'
import React, { useState, useEffect } from 'react';
import Engine from './rules/Engine'
import Recomendations from './rules/Recomendations';

function App() {
    const [otherData, setData] = useState({})
    const [BH, setBH] = useState({
        edad: 0,
        estudia: -1,
        condicionLaboral: '',
        sueldoAbuelo: '',
        sueldoTio: '',
        tipoEmpleo: '',
        alimentante: '',
        tiempo: '',
        recomendacion: ''
    })
    const [recomendation, setRecomendation] = useState('');

    const toEnd = async (fieldName, field) => {
        let BHTest = structuredClone(BH)
        BHTest = { ...BH, [fieldName]: field }
        BHTest = await Engine.reloadBH(BHTest)
        setBH(BHTest)
        console.log("BHTEST", BHTest)
        const recomendation = Recomendations.getRecomendation(BHTest.recomendacion)
        console.log("RECO", recomendation, recomendation != '')
        setRecomendation(recomendation)
        
        return (recomendation != undefined)
    }

    const flow = {
        start: {
            message: "Hola! Soy tu asistente virtual y estoy aqui para ayudarte ¿Cómo te llamas?",
            function: (params) => setData({ ...otherData, userName: params.userInput }),
            path: "SelectTheme"
        },
        SelectTheme: {
            message: `Hola ${otherData.userName} un gusto! ¿De que tema quieres asesorarte hoy?`,
            options: ["Couta Alimentaria"],
            chatDisabled: true,
            path: "SelectChildrenName"
        },
        SelectChildrenName: {
            message: `Genial! te voy a ayudar a informarte sobre cuota alimentaria\n\n¿Como se llama la persona por la que solicitas asesoramiento?`,
            function: (params) => setData({ ...otherData, childName: params.userInput }),
            path: "setEdad"
        },
        setEdad: {
            message: `¿Podrías decirme la edad de ${otherData.childName}?`,
            function: async (params) => await setBH({ ...BH, edad: params.userInput }),
            path: async (params) => {
                let res = (await toEnd("edad", params.userInput)) ? 'end' : 'SelectStudies'
                res = params.userInput < 21 ? 'ask_work_progenitor' : res
                return res
            }
        },
        SelectStudies: {
            message: `¿${otherData.childName} esta terminando su secundario, cursando algun estudio superior o capacitandose para un oficio?`,
            options: ["Si", "No"],
            function: async (params) => await setBH({ ...BH, estudia: params.userInput == "Si" ? 1 : 0 }),
            chatDisabled: true,
            path: async (params) => {
                const res = (await toEnd("estudia", params.userInput == "Si" ? 1 : 0)) ? 'end' : 'ask_work_progenitor'
                return res
            }
        },
        ask_work_progenitor: {
            message: `¿Cual es la situacion laboral del progenitor al que se solicitaran alimentos?`,
            options: ["Trabajo(Formal)", "Trabaja(Informa/Negro)", "No trabaja"],
            function: async (params) => await setBH({ ...BH, condicionLaboral: params.userInput == "Trabajo(Formal)" ? "Formal" : "Informal" }),
            chatDisabled: true,
            path: async (params) => {
                const res = (await toEnd("condicionLaboral", params.userInput == "Trabajo(Formal)" ? "Formal" : "Informal")) ? 'working_condition' : 'ask_grandparents'
                return res
            }
        },
        ask_grandparents: {
            message: `¿Podrias decirnos cual es el mejor sueldo de los padres del progenitor al que se solicitaran alimentos? (Abuelos)`,
            options: ["Menos de $271.571", "Entre $271.571 y $855.860", "Mas de $855.860", "Se desconoce"],
            function: async (params) => {
                let sueldoAbuelo
                if (params.userInput == "Entre $271.571 y $855.860") sueldoAbuelo = "Regular"
                else if (params.userInput == "Mas de $855.860") sueldoAbuelo = "Bueno"
                else sueldoAbuelo = "Minimo"
                await setBH({ ...BH, sueldoAbuelo: sueldoAbuelo })
            },
            path: "ask_uncles"
        },
        ask_uncles: {
            message: `¿Podrias decirnos cual es el mejor sueldo de los hermanos del progenitor al que se solicitaran alimentos? (Tios)`,
            options: ["Menos de $271.571", "Entre $271.571 y $855.860", "Mas de $855.860", "Se desconoce"],
            function: async (params) => {
                let sueldoTio
                if (params.userInput == "Entre $271.571 y $855.860") sueldoTio = "Regular"
                else if (params.userInput == "Mas de $855.860") sueldoTio = "Bueno"
                else sueldoTio = "Minimo"
                await setBH({ ...BH, sueldoTio: sueldoTio })
            },
            path: async (params) => {
                let sueldoTio
                if (params.userInput == "Entre $271.571 y $855.860") sueldoTio = "Regular"
                else if (params.userInput == "Mas de $855.860") sueldoTio = "Bueno"
                else sueldoTio = "Minimo"
                await toEnd("sueldoTio", sueldoTio)
                return 'working_condition'
            }
        },
        working_condition: {
            message: `¿Cual es la condición laboral del ${BH.alimentante}?`,
            options: ["Empleo Publico", "Empleo Privado"],
            chatDisabled: true,
            function: async (params) => await setBH({ ...BH, tipoEmpleo: params.userInput }),
            path: async (params) => {
                await toEnd("tipoEmpleo", params.userInput)
                return 'end'
            }
        },
        end: {
            message: `${recomendation}`,
            function: console.log(BH, recomendation),
            chatDisabled: true
        }
    }

    const settings = {
        general: {
            embedded: false,
        },
        audio: {
            disabled: false,
            language: 'es-AR',
        }
    }
    const themes = [
        { id: "cyborg", version: "0.1.0" },
    ]

    return (
        <main>
            <ChatBot flow={flow} themes={themes} settings={settings} />
        </main>
    )
}

export default App
