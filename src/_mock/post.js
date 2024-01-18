import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const posts = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.sentences(2),
  role: sample(['News', 'Message']),
  date: faker.date.past().toString(),
  imageUrl: sample(['News', 'Message']),
}));
