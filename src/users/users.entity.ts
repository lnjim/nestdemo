import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { UserRole } from './users.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
    update: true
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false
  })
  public role: UserRole;

  @BeforeInsert()
  public emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  public async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  public isValidPassword(password: string) {
    return compare(password, this.password);
  }
}
