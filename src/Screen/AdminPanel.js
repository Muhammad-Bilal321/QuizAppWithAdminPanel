import React, { useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { fbAdd } from '../Config/firebaseMethod';

function AdminPanel() {
  const navigate = useNavigate(); // Get the navigate function

  const [mainArr, setMainArr] = useState({});
  const [array, setArray] = useState([]);
  const [val, setVal] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const arr = () => {
    setArray([...array, val]);
    setVal("");
    console.log(array);
  }

  const saveList = () => {
    setMainArr({ question: first, options: array, correctAns: second });
    console.log(mainArr);
    setArray([]);
    setFirst("");
    setSecond("");
  }

  const addTask = () => {
    fbAdd("QuizQuestions", mainArr)
      .then((res) => {
        console.log(res);
        setMainArr({});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const listItem = [
    {
      text: 'HTML',
      icon: <Button></Button>,
      route: '/quizscreen' // Specify the route to navigate to
    },
    {
      text: 'CSS',
      icon: <Button></Button>,
      route: '/quizscreen' // Specify the route to navigate to
    },
    {
      text: 'JS Quiz 1',
      icon: <Button></Button>,
      route: '/quizscreen' // Specify the route to navigate to
    },
    {
      text: 'JS Quiz 2',
      icon: <Button></Button>,
      route: '/quizscreen' // Specify the route to navigate to
    },
  ];

  const handleRouter = (route) => {
    navigate(route); // Use navigate to change the route
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Admin Image Section */}
        <div className="col-md-4">
          <div className="admin-image-section mb-5 py-5">
            <div className="admin-image">
              <img src="admin-image.jpg" alt="Admin" />
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="col-md-8">
          <div className="input-section p-5">
            <h2>Admin Input Section</h2>
            <div className="mb-3">
              <TextField
                name="Question"
                type="text"
                fullWidth
                label="Question"
                onChange={(e) => { setFirst(e.target.value) }}
              />
            </div>
            <div className="mb-3">
              <TextField
                name="Options"
                type="text"
                fullWidth
                label="Options"
                onChange={(e) => { setVal(e.target.value) }}
              />
            </div>
            <div className="mb-3 mx-4">
              <TextField
                name="Correct Option"
                type="text"
                onChange={(e) => { setSecond(e.target.value) }}
                label="Correct Option"
              />
            </div>
           
            <Button type="submit" variant="contained" color="primary" onClick={arr}>
              +
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={addTask}>
              Submit
            </Button>
            <Button onClick={saveList}>Lock Quiz</Button>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="row">
        <div className="col-md-12">
          <MuiDrawer variant='permanent' className="w-20">
            <List>
              {listItem.map((item, index) => {
                const { text, icon, route } = item;
                return (
                  <ListItem key={text} onClick={() => handleRouter(route)}>
                    <ListItemButton>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Button
              className='mt-5 w-75 mx-auto'
              variant="contained"
              color="primary"
              onClick={() => handleRouter('/login')}
            >
              Logout
            </Button>
          </MuiDrawer>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
