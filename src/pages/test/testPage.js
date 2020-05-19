import React, { useState, useEffect } from 'react'

export const TestPage = () => {
  function queueTime(customers, n) {
    if (customers.length === 0) return 0
    const sum = (arr) => arr.reduce((sum, a) => sum + a)
    if (n === 1) return sum(customers)
    let totalTime = 0
    while (sum(customers)) {
      debugger
      let count = n
      for (let i = 0; i <= customers.length; i++) {
        if (customers[i] && count) {
          customers[i]--
          count--
        }
      }
      totalTime++
    }
    return totalTime
  }

  console.log(queueTime([2, 2, 3, 3, 4, 4], 2))
  console.log(queueTime([1, 2, 3, 4, 5], 100))

  return <div></div>
}
