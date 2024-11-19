
const recomendations = [
    {
        name: 'Recomendación 1',
        body: 'Según la información proporcionada, en principio el alimentado no cumple con las condiciones legales necesarias para iniciar un proceso de solicitud de cuota alimentaria.\nSi considera que esto podría ser un error o tiene alguna inquietud al respecto, le sugerimos que consulte a un profesional del derecho para recibir asesoramiento completo e integral.'
    },
    {
        name: 'Recomendación 2',
        body: 'Según la información proporcionada, el alimentado parece cumplir con las condiciones necesarias para iniciar un proceso de solicitud de cuota alimentaria.\nDado que el progenitor cuenta con un empleo formal, se sugiere iniciar acciones legales contra él.\nEs importante tener en cuenta que los plazos pueden variar significativamente dependiendo de las particularidades de cada caso. Sin embargo, se estima que podría obtenerse una orden de alimentos provisorios aproximadamente en un plazo de un mes desde el inicio del trámite.\nPara comenzar el proceso, es fundamental contar con la siguiente documentación, que debera ser llevada a la entrevista presencial con el abogado en caso de querer iniciar el trámite:\n\t✅DNI de todas las partes involucradas.\n\t✅Partida de nacimiento del o los menores.\n\t✅Última dirección conocida del progenitor.'
    },
    {
        name: 'Recomendación 3',
        body: 'Según la información proporcionada, el alimentado parece cumplir con las condiciones necesarias para iniciar un proceso de solicitud de cuota alimentaria.\nDado que el progenitor cuenta con un empleo formal, se sugiere iniciar acciones legales contra él.\nEs importante tener en cuenta que los plazos pueden variar significativamente dependiendo de las particularidades de cada caso. Sin embargo, se estima que podría obtenerse una orden de alimentos provisorios aproximadamente en un plazo de tres meses desde el inicio del trámite.\nPara comenzar el proceso, es fundamental contar con la siguiente documentación, que debera ser llevada a la entrevista presencial con el abogado en caso de querer iniciar el trámite:\n\t✅DNI de todas las partes involucradas.\n\t✅Partida de nacimiento del o los menores.\n\t✅Última dirección conocida del progenitor.'
    },
    {
        name: 'Recomendación 4',
        body: 'Según la información proporcionada, el alimentado parece cumplir con las condiciones necesarias para iniciar un proceso de solicitud de cuota alimentaria.\nDado que el progenitor no cuenta con un empleo formal, se sugiere iniciar acciones legales contra los abuelos.\nEs importante tener en cuenta que los plazos pueden variar significativamente dependiendo de las particularidades de cada caso. Sin embargo, se estima que podría obtenerse una orden de alimentos provisorios aproximadamente en un plazo de un mes desde el inicio del trámite.\nPara comenzar el proceso, es fundamental contar con la siguiente documentación, que debera ser llevada a la entrevista presencial con el abogado en caso de querer iniciar el trámite:\n\t✅DNI de todas las partes involucradas.\n\t✅Partida de nacimiento del o los menores.\n\t✅Última dirección conocida del progenitor.'
    },
    {
        name: 'Recomendación 5',
        body: 'Según la información proporcionada, el alimentado parece cumplir con las condiciones necesarias para iniciar un proceso de solicitud de cuota alimentaria.\nDado que el progenitor no cuenta con un empleo formal, se sugiere iniciar acciones legales contra los tios.\nEs importante tener en cuenta que los plazos pueden variar significativamente dependiendo de las particularidades de cada caso. Sin embargo, se estima que podría obtenerse una orden de alimentos provisorios aproximadamente en un plazo de un mes desde el inicio del trámite.\nPara comenzar el proceso, es fundamental contar con la siguiente documentación, que debera ser llevada a la entrevista presencial con el abogado en caso de querer iniciar el trámite:\n\t✅DNI de todas las partes involucradas.\n\t✅Partida de nacimiento del o los menores.\n\t✅Última dirección conocida del progenitor.'
    }
]

const getRecomendation = (toSearch) => {
    let recomendation =  recomendations.find((recomendation) =>  recomendation.name == toSearch)
    return recomendation?.body || undefined
}

export default { getRecomendation }