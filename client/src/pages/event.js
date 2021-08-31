// import React from 'react'
// var cors = require("cors");
// const sampleEvent = {
//   date: '1/10/2021',
//   time: '14:00',
//   contact: 'Alice'
// }


// class Event extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           error: null,
//           isLoaded: false,
//           items: []
//         };
//       }
    
//       componentDidMount() {
//         fetch("http://localhost:3000/event"+id)
//           .then(res => res.json())
//           .then(
//             (result) => {
//               this.setState({
//                 isLoaded: true,
//                 items: result.items
//               });
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//               this.setState({
//                 isLoaded: true,
//                 error
//               });
//             }
//           )
//       }
//   render() {
//     return (
//       <div className="event">
//         <ul>
//         {items.map(item => (
//             <li key={item.id}>
//               {item.name} {item.dateTime}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default Event;
