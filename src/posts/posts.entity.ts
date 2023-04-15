import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
    nullable: false
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false
  })
  body: string;
}
