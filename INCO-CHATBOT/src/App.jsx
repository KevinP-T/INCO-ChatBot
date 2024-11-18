import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBot from 'react-chatbotify'
import Engine from 'json-rules-engine'
import React, { useState, useEffect } from 'react';

function App() {

  const reglas = [
    {
      conditions: {
        all: [
          { fact: 'edad', operator: 'greaterThan', value: 21 },
          { fact: 'edad', operator: 'lessThan', value: 25 },
          { fact: 'noEstudia', operator: 'equal', value: true }
        ]
      },
      event: {
        type: 'recomendacion',
        params: {
          recomendacion: 'Recomendación 1'
        }
      }
    },
    
    {
      conditions: {
        all: [
          { fact: 'edad', operator: 'greaterThan', value: 25 },
        ]
      },
      event: {
        type: 'recomendacion',
        params: {
          recomendacion: 'Recomendación 1'
        }
      }
    },

    {
      conditions: {
        all: [
          { fact: 'condicionLaboral', operator: 'equal', value: 'Formal' },
        ]
      },
      event: {
        type: 'alimentante',
        params: {
          recomendacion: 'alimentante'
        }
      }
    },


  ];

  const [engine, setEngine] = useState(null);
  const [hechos, setHechos] = useState({
    edad: 22,
    noEstudia: true,
    condicionLaboral: "Formal"
  });

  useEffect(() => {
    const motor = new Engine();
    reglas.forEach(regla => motor.addRule(regla));
    setEngine(motor);
  }, []);

  const ejecutarReglas = async () => {
    if (!engine) {
      console.error('Motor no inicializado');
      return;
    }
    engine
      .run(hechos)
      .then(({ events }) => {
        console.log(events);
        
        console.log('-----------------------');
        
        events.map(event => console.log(event.params))
      })

  };

  const [count, setCount] = useState(0)

  const flow = {
    start: {
      message: "What is your age?",
      path: "end"
    },
    end: {
      message: (params) => `Hola asi que tenes ${params.userInput} años!`,
      chatDisabled: true
    }
  }

  const settings = {
    general: {
      embedded: false,
      fontFamily: 'Roboto',
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
    <>
      <ChatBot flow={flow} themes={themes} settings={settings} />


      <div>
        <h1>Motor de Reglas</h1>
        <div>
          <label>
            Edad:
            <input
              type="number"
              value={hechos.edad}
              onChange={e => setHechos({ ...hechos, edad: parseInt(e.target.value, 10) })}
            />
          </label>
          <label>
            No estudia:
            <input
              type="checkbox"
              checked={hechos.noEstudia}
              onChange={e => setHechos({ ...hechos, noEstudia: e.target.checked })}
            />
          </label>
          <label>
            Condición laboral del progenitor:
            <select
              value={hechos.condicionLaboral}
              onChange={e => setHechos({ ...hechos, condicionLaboral: e.target.value })}
            >
              <option value="Formal">Formal</option>
              <option value="Informal">Informal</option>
            </select>
          </label>
        </div>
        <button onClick={ejecutarReglas}>Ejecutar Reglas</button>
        <div>
          <h2>Resultados</h2>
        </div>
      </div>

    </>
  )
}

export default App
