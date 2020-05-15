export const mathRound2 = num => {
    const value = Math.round(num * 100) / 100
    return value ? value : ''
}