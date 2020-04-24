import React, { useState, useEffect, useRef } from "react";

export const TestPage = () => {
    const [photos, setPhotos] = useState([])

    useEffect(() => {

        async function fetchData() {
            const response = await fetch('https://react-gallery-e3889.firebaseio.com/photos.json');
            response.json()
                .then(result => {
                    setPhotos(result);
                })
                .catch(e => console.log(e));
        }

        fetchData();

    }, []);


    useEffect(() => {
        const handleToggleClick = () => {
            console.log('click')
        };
        const body =  document.body
        body.addEventListener('click', handleToggleClick);
        return () => body.removeEventListener('click', handleToggleClick)
    }, [])


    //1 =====
    function findJewerly(jewerlyString, stonesString) {
        const jewelry = new Set(jewerlyString);
        let result = 0;

        for (let stone of stonesString) {
            if (jewelry.has(stone)) {
                result++;
            }
        }

        return result;
    }
    let jewerlyString = 'ab'
    let stonesString = 'aabbccd'

    // console.log('findJewerly',findJewerly(jewerlyString, stonesString))

    // ====================



    //2 =====
    function longestSequence(items) {
        let best = 0;
        let count = 0;

        for (let item of items) {
            if (item > 0) {
                count++;
                best = Math.max(best, count);
            } else {
                count = 0;
            }
        }

        return best;
    }
    let test = '111001101111010111'
    // console.log('longestSequence',longestSequence(test))

    // ====================


    //=== Brackets ====
    let result = [];
    function generate(n, str = '', l = 0, r = 0) {
        if (str.length === 2 * n) {
            result.push(str)
        }

        if (l < n) {
            generate(n, str + '(', l + 1, r);
        }

        if (r < l) {
            generate(n, str + ')', l, r + 1);
        }

        return result
    }

    // console.log(generate(3))
    // ====================


    // anagrams ======
    function dictFromString(str = '') {
        let dict = {};

        for (let ch of str) {
            dict[ch] = dict[ch] + 1 || 1;
        }

        return dict;
    }


    function areAnagrams(str1 = '', str2 = '') {
        if (str1.length !== str2.length) {
            return 0;
        }

        const dict1 = dictFromString(str1);
        const dict2 = dictFromString(str2);

        if (Object.keys(dict1).length !== Object.keys(dict2).length) {
            return 0;
        }

        for (let ch in dict1) {
            if (dict1[ch] !== dict2[ch]) {
                return 0;
            }
        }

        return 1;
    }

    //==================


    // function swap(items, firstIndex, secondIndex){
    //     const temp = items[firstIndex];
    //     items[firstIndex] = items[secondIndex];
    //     items[secondIndex] = temp;
    // }
    //
    // function partition(arr, left, right) {
    //     var pivot   = arr[Math.floor((right + left) / 2)],
    //         i       = left,
    //         j       = right;
    //     while (i <= j) {
    //         while (arr[i] < pivot) {
    //             i++;
    //         }
    //         while (arr[j] > pivot) {
    //             j--;
    //         }
    //         debugger
    //         if (i <= j) {
    //             swap(arr, i, j);
    //             i++;
    //             j--;
    //         }
    //     }
    //     return i;
    // }
    //
    // function quickSort(arr, left = 0, right = arr.length - 1) {
    //     let index;
    //     if (arr.length > 1) {
    //         index = partition(arr, left, right);
    //         debugger
    //         if (left < index - 1) {
    //             quickSort(arr, left, index - 1);
    //         }
    //         if (index < right) {
    //             quickSort(arr, index, right);
    //         }
    //     }
    //     return arr;
    // }




    function bubbleSort(arr) {
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr.length - i; j++) {
                if(arr[j] > arr[j+1]) {
                    let max = arr[j]
                    arr[j] = arr[j+1]
                    arr[j+1] = max
                }
            }
        }
        return arr
    }

    // console.log('bubbleSort', bubbleSort([5,90, 93,6,11,3,28,74,1,51]))


    const merge = (arrFirst, arrSecond) => {
        // console.log(`arrFirst: ${arrFirst} arrSecond:${arrSecond}`)

        const arrSort = [];
        let i = 0,
        j = 0;
        // сравниваем два массива, поочередно сдвигая указатели
        while (i < arrFirst.length && j < arrSecond.length) {
            arrSort.push(
                (arrFirst[i] < arrSecond[j]) ?
                    arrFirst[i++] : arrSecond[j++]
            );
        }
        // обрабатываем последний элемент при разной длине массивов
        // и возвращаем один отсортированный массив

        return [
            ...arrSort,
            ...arrFirst.slice(i),
            ...arrSecond.slice(j)
        ];
    };

    const mergeSort = arr => {
        // Проверяем корректность переданных данных
        if (!arr || !arr.length) {
            return null;
        }
        //Если массив содержит один элемент просто возвращаем его
        if (arr.length <= 1) {
            return arr;
        }
        // Находим середину массива и делим его на два
        const middle = Math.floor(arr.length / 2);
        const arrLeft = arr.slice(0, middle);
        const arrRight = arr.slice(middle);
        // Для новых массивов снова вызываем сортировку,
        // сливаем их и возвращаем снова единый массив


        let leftArr = mergeSort(arrLeft)
        let rightArr = mergeSort(arrRight)
        return merge(leftArr, rightArr);
    };


    // console.log('mergeSort 5,90, 93,6,11,3,28,74,1,51')
    // console.log('mergeSort', mergeSort([5,90, 93,6,11,3,28,74,1,51]))


    const obj = {
        test: undefined
    }
    console.log('test', obj.hasOwnProperty('test'))


    return (
        <div>
            test
            <div>test2
                <div>test3</div>
            </div>

        </div>
    )

}


// function foo(callback) {
//     setTimeout(function() {
//         callback('A');
//     }, Math.random()*100);
// }
//
// function bar(callback) {
//     setTimeout(function() {
//         callback('B');
//     }, Math.random()*100);
// }
//
// function baz(callback) {
//     setTimeout(function() {
//         callback('C');
//     }, Math.random()*100);
// }
//
// const asyncFunc = async () => {
//     const promiseFoo = new Promise(function(resolve, reject) {
//         resolve(foo)
//     })
//     const resFoo = await promiseFoo
//     console.log(resFoo)
//
// }


//
// function groupAnagrams(list) {
//     const anagramArr = []
//     const isAnagrams = (one, two) => {
//         let isAng = false
//         let sortedOne = one.split('').sort().join()
//         let sortedTwo = two.split('').sort().join()
//         if(sortedOne === sortedTwo) isAng = true
//         return isAng
//     }
//
//     for(let i = 0; i < list.length; i++) {
//         let tempArr = []
//         if(list[i]) tempArr.push(list[i])
//         for(let j = i + 1; j < list.length; j++) {
//             // debugger
//             if(list[i] && list[j] && isAnagrams(list[i], list[j])) {
//                 tempArr.push(list[j])
//                 list[j] = null
//             }
//         }
//         if(tempArr.length) anagramArr.push(tempArr)
//     }
//     return anagramArr
// }
//
// console.log(groupAnagrams(['сон', 'нос', 'сорт', 'трос', 'торт', 'рост']))