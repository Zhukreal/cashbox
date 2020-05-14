

export const modifyToNumber = (value) => {
    console.log('value', value)

    let valueN = '',
        dotCount = (value.match(/\./g) || []).length


    const isValid = /^[0-9]*([.][0-9]{1,2})?$/.test(value) || (value !== '.' && dotCount === 1 && value[value.length - 1] === '.')

    if(isValid) {
        valueN = value
    } else {
        valueN = value.slice(0, -1);
    }

    return valueN
}