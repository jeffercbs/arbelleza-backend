import { SetMetadata } from '@nestjs/common';
import { Key } from '../enum/key.enum';

export const API_KEY = 'roles';
export const Keys = (key: Key) => SetMetadata(API_KEY, key);
