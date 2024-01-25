import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  points: Math.floor(faker.datatype.number({ min: 1000, max: 10000 })),
  certificate: Math.floor(faker.datatype.number({ min: 0, max: 100 })),
}));
