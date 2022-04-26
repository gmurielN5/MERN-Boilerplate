import React from "react"
import { useTrail, animated } from "react-spring"

// const Transition = () => {
//   const ref = useRef(setTimeout([]))
//   const [items, set] = useState([])

//   const transitions = useTransition(items, {
//     from: {
//       opacity: 0,
//       height: 0,
//       innerHeight: 0,
//       transform: "perspective(600px) rotateX(0deg)",
//       color: "#8fa5b6",
//     },
//     enter: [
//       { opacity: 1, height: 80, innerHeight: 80 },
//       { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
//       { transform: "perspective(600px) rotateX(0deg)" },
//     ],
//     leave: [
//       { color: "#c23369" },
//       { innerHeight: 0 },
//       { opacity: 0, height: 0 },
//     ],
//     update: { color: "#28b4d7" },
//   })

//   useEffect(() => {
//     ref.current = []
//     set([])
//     ref.current.push(setTimeout(() => set(["Hello", "World"]), 1000))
//     ref.current.push(setTimeout(() => set(["Goodbye", "World"]), 5000))
//     return () => ref.current.forEach(clearTimeout)
//   }, [])

//   return (
//     <>
//       {transitions(({ innerHeight, ...rest }, item) => (
//         <animated.div style={rest} className="names">
//           <animated.div
//             className="name"
//             style={{ overflow: "hidden", height: innerHeight }}
//           >
//             {item}
//           </animated.div>
//         </animated.div>
//       ))}
//     </>
//   )
// }

export const Text = () => {
  //create an array of 0 and 1
  return (
    <>
      <span className="name ">00010110110001011011</span>
      <span className="name blue">0001011011000101101</span>
    </>
  )
}
