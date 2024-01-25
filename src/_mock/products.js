import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  price: Math.floor(faker.datatype.number({ min: 1000, max: 10000 })),
  number:Math.floor(faker.datatype.number({ min: 1, max: 1000 })),
  description: faker.lorem.sentences(2),
  price: Math.floor(faker.datatype.number({ min: 1000, max: 10000 })),
}));