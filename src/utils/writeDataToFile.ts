import fs from 'fs';
import { User } from '../data/constants';

export const writeDataToFile = (filename: string, content: User[]) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
};
