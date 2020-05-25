import React, { useState, useEffect } from 'react'

export const TestPage = () => {
// --------------- states ---------------
  const [firstReduce, setFR] = useState(0);
  const [secondReduce, setSR] = useState([]);

  // --------------- raw data arr ---------------
  let data = [
    { test: "test", value: -7.1 },
    { test: "test", value: -5.7 },
    { test: "test", value: -2.49 },
    { test: "test", value: 0.96 },
    { test: "test", value: 7.41 }
  ];

  // --------------- simple reducer ---------------
  const reducerFunc = (acc, curr) => acc + curr;

  // --------------- second reducer ---------------
  const reducerSecondFunc = (acc, curr) => {
    let test =
      acc.length === 0
        ? curr.value
        : Number((acc[acc.length - 1].value + curr.value).toFixed(2));

    console.log("Sum:", test, " Curr:", curr.value);
    // на третъей итерации -12,8 + -2,49 получается не -15,3 а почему то -1,53 какого фига?
    return [
      ...acc,
      {
        ...curr,
        sum:
          acc.length === 0
            ? +curr.value
            : +(+acc[acc.length - 1].value + +curr.value).toFixed(2)
      }
    ];
  };
  // --------------- data for first reduce ---------------
  let tmpArr = data.map(d => {
    return d.value;
  });

  // --------------- effect ---------------
  useEffect(() => {
    // ------- First reduce --------
    if (tmpArr.length > 0) {
      console.log("First reduce: ", +tmpArr.reduce(reducerFunc).toFixed(2));
      setFR(+tmpArr.reduce(reducerFunc).toFixed(2));
    }
    // ------- Second reduce --------
    if (tmpArr.length > 0) {
      // console.log("Second reduce: ", data.reduce(reducerSecondFunc, []));
      // setSR(data.reduce(reducerSecondFunc, []));
      data.reduce(reducerSecondFunc, []);
    }
  }, [data, tmpArr]);

  // --------------- from second reduce ---------------
  const sr = secondReduce.map((d, i) => {
    return (
      <div key={i}>
        # {i} Value from second reduce : {d.value}
      </div>
    );
  });
  // --------------- return ---------------

  return (
    <div>
      <p>First reduce: {firstReduce}</p>
      {sr}
    </div>
  );
}
