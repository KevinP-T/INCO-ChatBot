import { Engine } from 'json-rules-engine';
import rules from './Rules.json' assert { type: 'json' };

const processEngine = (inputs, decisions) => {
    const engine = new Engine(decisions);

    return engine.run(inputs)
        .then(results => {
            // console.log(results.events);
            return results.events
        })
};

const reloadBH = async (BH) => {
    let oldBH = {}, newBH = {};
    newBH = structuredClone(BH)
    while (JSON.stringify(newBH) != JSON.stringify(oldBH) && newBH.recomendacion == '') {
        oldBH = structuredClone(newBH)
        let res = await processEngine(newBH, rules.decisions);
        res.forEach((newRes) => {
            newRes.type
            newBH[newRes.type] = newRes.params[newRes.type]
        })
        // console.log('saludos desde martes', newBH)
    }
    return newBH
}

export default { reloadBH }