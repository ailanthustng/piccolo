import React, { useState, createRef } from 'react';
import { Flex } from 'reflexbox';
import { Typography, Input, Button } from 'antd';
import { RightOutlined } from "@ant-design/icons";
import './App.css';
import Name from './Name';
import GameCard from "./GameCard";

const { Title, Text } = Typography;

function App() {
  const [start, setStart] = useState(false);
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [twoNames, setTwoNames] = useState([]);
  const [error, setError] = useState(false);
  const [nameDuplicateError, setNameDuplicateError] = useState(false);

  const startDisabled = names.length < 2;

  const inputRef = createRef();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    setError(false);
    setNameDuplicateError(false);

    if (name.length === 0) {
      setError(true);
    } else if (names.includes(name)) {
      setNameDuplicateError(true);
    } else {
      setNames([...names, name]);
      setName('');
      setError(false);
      setNameDuplicateError(false);
    }
  }

  const handleStart = () => {
    handleSetRandomNames();
    setStart(true);
  }

  const handleDelete = (name) => {
    const newNames = names.filter(n => n !== name);
    setNames(newNames);
  }

  const handleSetRandomNames = () => {
    const randomFirst = Math.floor(Math.random() * Math.floor(names.length));
    const firstName = names[randomFirst];
    const namesRemoved = names.filter(n => n !== firstName);
    const randomSecond = Math.floor(Math.random() * Math.floor(namesRemoved.length));
    const secondName = namesRemoved[randomSecond];
    setTwoNames([firstName, secondName]);
  }

  const handleNext = () => {
    handleSetRandomNames();
  }

  const handleBack = () => {
    setStart(false);
  }

  const handleDeleteAll = () => {
    setNames([]);
  }

  const renderPicolo = () => {
    return (
      <Flex
        className='picolo-wrapper'
      >
        <Title style={{ padding: '0 0 10px 0', margin: 0 }}>TH Picolo!</Title>
        {names.length === 0 && <Text>Enter names to begin</Text>}
      </Flex>
    )
  }

  const displayNames = () => {
    return (
      names.map((name) => {
        return (
          <Name name={name} key={name} handleDelete={handleDelete}/>
        );
      })
    );
  };

  const renderInputNames = () => {
    return (
      <div style={{ width: '100%' }}>
        {name &&
          (
            <Flex className='name-form-wrapper'>
              <Title level={3} style={{padding: 0, margin: 0}}>{name}</Title>
            </Flex>
          )
        }
        <Flex className='input-wrapper'>
          <Flex className='input-button-wrapper'>
            <Input
              className='input'
              placeholder="Input name"
              onChange={(e) => handleNameChange(e)}
              value={name}
              onPressEnter={() => handleSubmit()}
              ref={inputRef}
              autoFocus
            />
            <Button
              className='submit-button'
              onClick={() => handleSubmit()}
              icon={<RightOutlined />}
            />
          </Flex>
          <Flex className='error-messages-wrapper'>
            <Flex style={{width: '80%'}}>
              {nameDuplicateError && <span style={{color: 'red', fontSize: '12px', fontWeight: 'bold'}}>Name already exists</span>}
              {error && <span style={{color: 'red', fontSize: '12px', fontWeight: 'bold'}}>Name cannot be empty</span>}
            </Flex>
          </Flex>
        </Flex>
        <Flex className='start-button-wrapper'>
          <Title level={4}>Number of players: {names.length}</Title>
          <Flex className='start-and-delete'>
            <Button
              className='delete-button'
              onClick={() => handleDeleteAll()}
            >
              Delete all
            </Button>
            <Button
              onClick={() => handleStart()}
              disabled={startDisabled}
              className='start-button'
            >
              Start!
            </Button>
          </Flex>
          {
            startDisabled && <Title level={4} style={{color: 'red'}}>Enter at least 2 players to start</Title>
          }
        </Flex>
      </div>
    )
  }

  const renderCards = () => {
    return (
      <GameCard
        names={twoNames}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    );
  }

  return (
    <Flex className="App">
      {!start && renderPicolo()}
      {!start && displayNames()}
      {!start && renderInputNames()}
      {start && renderCards()}
    </Flex>
  );
}

export default App;
