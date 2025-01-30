import { SetMetadata } from '@nestjs/common';
import { Visibility } from '../visibility.enum';

export const VISIBILITY_KEY = 'visibility';
export const View = (visibility: Visibility) =>
  SetMetadata(VISIBILITY_KEY, visibility);
