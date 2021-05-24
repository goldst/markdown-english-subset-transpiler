export function mdsAltValue(strings, ...values) {
    return {
        regEx: new RegExp(`^${strings.join('(.*?)')}$`, 'gi'),
        values
    };
}

export function mdsRunFn(functions) {
    return function(strings, ...values) {
        const val = strings
            .map((s, i) => s + (values[i] !== undefined ? `\${${i}}` : ''))
            .join('');

        for(let i = 0; i < functions.length; i++) {
            const fn = functions[i];
            for(let alt of fn.alt) {
                const check = alt.regEx.exec(val);
                if(check) {
                    console.info(`"${val}" is interpreted as ${alt.regEx}`);
                    const checkSliced = check.slice(1);
                    const args = checkSliced.map(arg => {
                        const oneVariable = /^\$\{(\d+)\}$/gi.exec(arg);
                        if(oneVariable) {
                            return values[parseInt(oneVariable[1])];
                        }
                        
                        const multiVariables = arg.match(/\$\{(\d+)\}/gi);
                        if(multiVariables) {
                            const firstVariable = parseInt(multiVariables[0].slice(2, -1));
                            const lastVariable = parseInt(multiVariables[multiVariables.length - 1].slice(2, -1));
                            const innerValues = values.slice(firstVariable, lastVariable + 1);

                            const innerStrings = arg
                                .split(/(\$\{\d+\})/gi)
                                .filter((_, i) => i % 2 === 0);

                            return mdsRunFn(functions)(innerStrings, ...innerValues);
                        }

                        return arg;
                    });

                    return fn.fn(...args);
                }
            }
        }

        console.error(`I don't know what you mean by "${val}".`);
    };
}