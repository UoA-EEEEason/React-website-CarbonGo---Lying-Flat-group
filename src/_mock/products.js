import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
 
  name: faker.person.fullName(),
  company:  faker.number.int({ min: 4, max: 99, precision: 0.01 }),
  
  discription: sample(['This tree is...', 'Hi, This tree balabala']),
  treeNumber: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
  treeUrl:`/assets/images/avatars/avatar_${index + 1}.jpg`
}));