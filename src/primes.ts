interface PrimesHash {
  [index: number]: boolean
}

export const sift = (limit: number): number[] => {
  if (limit === 2) return [2]

  // Step 1: create an array from 2..limit inclusive
  let allNums: number[] = Array.from({ length: limit - 1 }, (_v, k) => k + 2)

  // Step 2: set p = smallest prime
  let p = 2

  // create a hash of { number: boolean }, from the array created in step 1,
  // setting every value to true
  let primes: PrimesHash = allNums.reduce((hash: PrimesHash, num: number) => {
    hash[num] = true
    return hash
  }, {})

  // Step 4: find the next smallest prime and repeat step 3
  while (p <= limit) {
    if (primes[p] === true) {
      // Step 3: mark off all multiples of p. We start from p*p as
      // an optimisation
      for (let i = p * p; i <= limit; i += p) {
        primes[i] = false
      }
    }
    p++
  }

  // Step 5: return all unmarked numbers
  return Object.keys(primes).reduce((array: number[], key) => {
    if (primes[+key] === true) {
      array.push(+key)
    }

    return array
  }, [])
}



