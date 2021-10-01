// import React from 'react';
// import makeStyles from '@mui/styles/makeStyles';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';

// const drawerWidth = 180;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },

//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
//   button: {

//     width: drawerWidth,
//     padding: theme.spacing(4),
//   },
// }));

// export default function PermanentDrawerLeft() {
//   const classes = useStyles();
//   const goToLogin = () => {
//     window.location.href = '/login';
//   };
//   const goToProfile = () => {
//     window.location.href = '/profile';
//   };
//   const goToChat = () => {
//     window.location.href = '/chat';
//   };
//   const goToEvent = () => {
//     window.location.href = '/events';
//   };

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         anchor="left"
//       >

// <Button
//               className={classes.button}
//               color="primary"
//               variant="outlined"
//               onClick={goToEvent}
//             >
//               Events
//             </Button>
//             <Button
//               className={classes.button}
//               color="primary"
//               variant="outlined"
//               onClick={goToChat}
//             >
//               Chat
//             </Button>
//             <Button
//               className={classes.button}
//               color="primary"
//               variant="outlined"
//               onClick={goToProfile}
//             >
//               Profile
//             </Button>
//             <Button
//               className={classes.button}
//               color="primary"
//               variant="outlined"
//               onClick={goToLogin}
//             >
//               Logout
//             </Button>

//       </Drawer>
//     </div>
//   );
// }
