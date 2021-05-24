import fs from 'fs';

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, 'utf8');

const [introduction, ...subsections] = file.split('\n## ')
    .map(subsection =>{
        const lines = subsection
            .split('\n')                        // -> lines
            .map(line => line.trim());           // -> trimmed lines

        return {
            title: lines[0],
            lines: lines
                .slice(1)                                               // -> without title
                .join(' ')                                              // -> cleaned subsection
                .replace(/(`.*?`)/gi, match => match.replace('.', '…')) // -> replace the dots in `` so inline js can run correctly
                .split('.')                                             // -> sentences
                .map(sentence => sentence
                    .trim()
                    .replace(/…/gi, '.')                                 // -> reverse dot replacement
                    .replace(/ \d* /gi, n => ` \${${n}} `)               // -> numberify numbers
                    .replace(/ \d*$/gi, n => ` \${${n} }`)               // -> numberify numbers at sentence end
                    .replace(/ \d*,/gi, n => ` \${${n.slice(0, -1)} },`))// -> numberify numbers at comma
        };
    });

function parsePhrase(phrase) {
    if(phrase.toLowerCase() === 'the input value') {
        return 'input_values[0]';
    }

    const complexArg = /^the (.+..) input value$/gi.exec(phrase);
    if(complexArg) {
        return `input_values[${parseInt(complexArg[1].slice(0, -2)) - 1}]`;
    }

    const variable = /^\*(.*?)\*$/gi.exec(phrase);
    if(variable) {
        return variable[1].replace(/ /gi, '_');
    }

    const nativePhrase = /^the javascript `(.*)`$/gi.exec(phrase);
    if(nativePhrase) {
        return nativePhrase[1];
    }

    const compoundPhrase = phrase.match(/(\*.+?\*)/gi);
    if(compoundPhrase) {
        const replaced = compoundPhrase.reduce((text, from) => text.replace(from, `\${${from.slice(1, -1).replace(/ /gi, '_')}}`), phrase);
        
        return `mdsRunFn(functions) \`${replaced.replace(/`.*`/gi, c => `\${${c.slice(1, -1)}}`)}\``;
    }

    return `mdsRunFn(functions) \`${phrase.replace(/`.*`/gi, c => `\${${c.slice(1, -1)}}`)}\``;
}

function parseStatement(statement) {
    const declaration = /^(.*) is called \*(.*)\*$/gi.exec(statement);
    if(declaration) {
        return `let ${declaration[2].replace(/ /gi, '_')} = ${parsePhrase(declaration[1])};`;
    }

    const nativeRun = /^run the javascript `(.*)`$/gi.exec(statement);
    if(nativeRun) {
        return nativeRun[1];
    }

    const ifThen = /^if (.*), then (.*)$/gi.exec(statement);
    if(ifThen) {
        return `if(${parsePhrase(ifThen[1])}) {\n            ${ parseStatement(ifThen[2]) }\n        }`;
    }

    const returnStatement = /^the result is (.*)$/gi.exec(statement);
    if(returnStatement) {
        return `return ${parsePhrase(returnStatement[1])};`;
    }

    return parsePhrase(statement) + ';';
}
        

let outDocument = `
import { mdsAltValue, mdsRunFn } from './mds.js';
const functions = [];
//functions.push(...definitions);
`;

outDocument += subsections.map(subsection => {
    let mode = 0;

    let outFunction =
        `functions.push({\n    name: '${subsection.title.toLowerCase()}',\n`
        + subsection.lines.map(line => {
            let out = '';

            if(mode === 0) {
                out += '    alt: [\n';
                mode = 1;
            }

            if(mode <= 2) {
                const simpleAltDescription = /^this function is called when someone says "(.*)", where (.*) is the input value$/gi.exec(line);
                if(simpleAltDescription) {
                    out += `        mdsAltValue \`${simpleAltDescription[1].replace(simpleAltDescription[2], '${0}')}\`, `;
    
                    return out;
                }
                
                const complexAltDescription = /^this function is called when someone says "(.*)", where (.*?) is the (\d+..) input value(, (.*?) is the (\d+..) input value)* and (.*?) is the (\d+..) input value$/gi.exec(line);
                if(complexAltDescription) {
                    const originalText = complexAltDescription[1];
                    const replaceFrom = complexAltDescription.filter((_, i) => i % 3 === 2);
                    const replaceTo = complexAltDescription.filter((_, i) => i % 3 === 0)
                        .slice(1)
                        .map(number => parseInt(number.slice(0, -2)) - 1);

                    const replaced = replaceFrom.reduce((text, from, i) => text.replace(from, `\${${replaceTo[i]}}`), originalText);

                    out += `        mdsAltValue \`${replaced}\`, `;
                    return out;
                }
            
                out += `    ],\n    fn: function ${subsection.title.toLowerCase().replace(/ /gi, '_')}(...input_values) {\n`;
                mode = 3;
            }
            
            if(mode === 3) {
                if(line === '') {
                    out += '    }\n});\n';
                    mode = 4;
                    return out;
                }

                out += '        ' + parseStatement(line);
            }

            return out;
        }).join('\n');
    return outFunction;
}).join('\n');

outDocument += `
const main = functions.filter(fn => fn.name === 'main')[0].fn;
if(!main) {
    exit();
}

main(...(process.argv.slice(2)));
`;

console.log(outDocument);
