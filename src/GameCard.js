import React from 'react';
import { Flex } from 'reflexbox';
import { Button } from 'antd';
import './game-card.css';

const gameActions = require('./game-actions.json');

const GameCard = ({ names, handleNext, handleBack }) => {
  const colors = [
    '#3685F0',
    '#FF570A',
    '#D72638',
    '#EAF27C',
    '#E28413',
    '#DD4B1A',
    '#EA1744',
    '#588157',
    '#85CB33',
    '#EA9010',
    '#CD533B',
    '#4BA3C3',
    '#D4B2D8',
    '#F1BF98',
    '#BDA0BC',
    '#488286',
    '#F87575',
    '#5C95FF',
    '#EF8354',
    '#D81E5B',
    '#E85D75',
    '#FFB30F',
    '#FD151B',
    '#849324',
    '#437F97',
    '#0075C4',
    '#EFA00B',
  ]

  const getRandomColor = () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(gameActions.actions.length));
    return colors[randomNumber];
  }

  const getRandomAction = () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(gameActions.actions.length));
    return Object.values(gameActions)[0][randomNumber].action;
  }

  const parseAction = () => {
    const action = getRandomAction();
    const newAction1 = action.replace('$1', `<b>${names[0]}</b>`);
    return newAction1.replace('$2', `<b>${names[1]}</b>`);
  }

  const actionDisplay = () => {
    return (
      <div dangerouslySetInnerHTML={{ __html: parseAction() }} />
    )
  }

  return (
    <div className='game-card-wrapper'>
      <Flex className='card-wrapper' style={{backgroundColor: getRandomColor()}}>
        {names && actionDisplay()}
      </Flex>
      <Flex className='button-group-wrapper'>
        <Button
          className='back-button'
          onClick={() => handleBack()}
        >
          Restart
        </Button>
        <Button
          className='next-button'
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
};

export default GameCard;
