import {View, Text} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';

type CustomCardType = {
  title: string;
  content1?: string;
  content2?: string;
  mode?: 'outlined' | 'elevated' | 'contained' | undefined;
  mb?: number;
};
const CustomCard = ({
  title,
  content1,
  content2,
  mode = 'outlined',
  mb = 10,
}: CustomCardType) => {
  return (
    <Card mode={mode} style={{marginBottom: mb}}>
      <Card.Title title={title} />
      {(content1 || content2) && (
        <Card.Content>
          {content1 && <Text>{content1}</Text>}
          {content2 && <Text>{content2}</Text>}
        </Card.Content>
      )}
    </Card>
  );
};

export default CustomCard;
