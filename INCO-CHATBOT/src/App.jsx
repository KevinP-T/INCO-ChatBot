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
          { fact: 'Edad', operator: 'greaterThan', value: 21 },
          { fact: 'Edad', operator: 'lessThan', value: 25 },
          { fact: 'NoEstudia', operator: 'equal', value: true }
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
          { fact: 'Edad', operator: 'greaterThan', value: 25 }
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
          { fact: 'CondicionLaboralProgenitor', operator: 'equal', value: 'Formal' }
        ]
      },
      event: {
        type: 'alimentante',
        params: {
          alimentante: 'Progenitor'
        }
      }
    },
    // Agrega más reglas aquí
  ];

  const [engine, setEngine] = useState(null);
  const [hechos, setHechos] = useState({
    Edad: 22,
    NoEstudia: true,
    CondicionLaboralProgenitor: "Formal"
  });
  const [resultados, setResultados] = useState([]);

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

    try {
      const { events } = await engine.run(hechos);
      setResultados(events.map(event => event.params.recomendacion || event.params.alimentante));
    } catch (error) {
      console.error('Error ejecutando el motor:', error);
    }
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
              value={hechos.Edad}
              onChange={e => setHechos({ ...hechos, Edad: parseInt(e.target.value, 10) })}
            />
          </label>
          <label>
            No estudia:
            <input
              type="checkbox"
              checked={hechos.NoEstudia}
              onChange={e => setHechos({ ...hechos, NoEstudia: e.target.checked })}
            />
          </label>
          <label>
            Condición laboral del progenitor:
            <select
              value={hechos.CondicionLaboralProgenitor}
              onChange={e => setHechos({ ...hechos, CondicionLaboralProgenitor: e.target.value })}
            >
              <option value="Formal">Formal</option>
              <option value="Informal">Informal</option>
            </select>
          </label>
        </div>
        <button onClick={ejecutarReglas}>Ejecutar Reglas</button>
        <div>
          <h2>Resultados</h2>
          <ul>
            {resultados.map((resultado, index) => (
              <li key={index}>{resultado}</li>
            ))}
          </ul>
        </div>
      </div>

    </>
  )
}

export default App
