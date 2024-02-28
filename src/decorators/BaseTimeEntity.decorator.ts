import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export function BaseTimeEntityDecorator() {
  return function (target: any) {
    CreateDateColumn()(target.prototype, 'created_at');
    UpdateDateColumn()(target.prototype, 'updated_at');
  };
}
