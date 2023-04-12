import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false
  })
  password: string;
}
