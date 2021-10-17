import { sift } from './primes'


const superscriptDigits:string[] = [
    "\u2070",
    "\u00B9",
    "\u00B2",
    "\u00B3",
    "\u2074",
    "\u2075",
    "\u2076",
    "\u2077",
    "\u2078",
    "\u2079",
]

// Given an integer returns it as a unicode superscript string
function numToSuperscript(num:number):string{
    num = Math.floor(num)
    const supers:string[] = []
    const result = ""
    while(num > 0){
        const val = num % 10
        supers.push(superscriptDigits[val])
        num = Math.floor(num/10)
    }
    supers.reverse()
    return result.concat(...supers)
}

// Recursive function that finds the prime factors of a number
export function listPrimeFactors(n:number, primes?:number[], result?: number[] ):number[]{
    if(!primes){
        // It would be quicker to have a list of primes statically 
        primes = sift(Math.floor(n/2))
    }
    if (!result){
         result = []
    }
    if(n < 2){
        return result
    }
    for(const p of primes){
        if(n % p === 0){
            result.push(p)
            return listPrimeFactors(n/p,primes,result)           
        }
    }
    return result
}


interface baseExponent{
    base: number
    exponent: number
}

// Parameter numlist is a sorted list of numbers returns a list of numpowers which
// contains one instance of each unique number value and the exponent of that number, 
// which is how often that unique number occurs in the list
function makeListOfBaseExponents(numlist:number[]):baseExponent[]{
    numlist.sort(function(a,b){return a - b;})
    const lbe:baseExponent[] = new Array ()
    let lastnum:number|undefined
    let lbeindex = -1
    for (const n of numlist){
        if(lastnum != undefined &&  n === lastnum){
            lbe[lbeindex].exponent++
        }
        else{
            lbeindex++
            lbe.push({base:n, exponent:1})
            lastnum = n
        }
    }
    return lbe
}


const myArgs = process.argv.slice(2);
const num:number = +(myArgs[0])

const startTime = new Date().getTime()
const factors = listPrimeFactors(num)

const lbe = makeListOfBaseExponents(factors)
let first = true
let outstring = ""
for (const be of lbe){
    if(!first){
        // Insert the multiplication symbol between numbers
        outstring = outstring.concat(" \u00D7 ")
    }
    first = false
    outstring = outstring.concat(be.base.toString())
    if(be.exponent > 1){
        outstring = outstring.concat(numToSuperscript(be.exponent))
    }
} 
const endTime = new Date().getTime()

console.log(outstring)
console.log (`\n\nTime taken: ${ endTime - startTime } ms`)
