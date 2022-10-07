#! /usr/bin/env node
const { program } = require('commander')
const term = require('terminal-kit').terminal;
const pkg = require('../package.json')

program.command('gen')
    .description('生成一个密钥')
    .option('-l, --length <number>', 'password length', '8')
    .action((opts) => genPassword(opts))

function genPassword(opts) {
    console.log('---', opts)
    const { length } = opts
    const letters = new Array(26).fill(0).map((v, i) => String.fromCharCode(i + 97))
    const bigLetters = new Array(26).fill(0).map((v, i) => String.fromCharCode(i + 65))
    const numbers = new Array(10).fill(0).map((v, i) => i)
    const others = ['.', '?', '$', '+', '_', '-', '=', '/', '!', '@', '#', '*', '~']
    
    const l = Number.parseInt(length);
    if (l === NaN) {
        term.red('error: length must be a number!')
        return;
    }

    const all = [...letters, ...bigLetters, ...numbers, ...others]
    let res = '';
    for(let i = 0; i < l; i++) {
        const idx = Math.random() * all.length | 0 
        res += all[idx]
    }
    console.log(res)
    return res;
}

program
    .version(pkg.version)
    .description(pkg.description)

program.parse(process.argv)