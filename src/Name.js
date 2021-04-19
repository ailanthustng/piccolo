import React from 'react';
import { Flex, Box } from 'reflexbox';
import { Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './name.css';

const { Title } = Typography;

const Name = ({ name, handleDelete }) => {
  return (
    <Flex className='name-wrapper'>
      <Flex className='name'>
        <Title level={3}>{name}</Title>
      </Flex>
      <Box className='x-wrapper'>
        <Button size='large' icon={<CloseOutlined />} onClick={() => handleDelete(name)}/>
      </Box>
    </Flex>
  )
}

export default Name;