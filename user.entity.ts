import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_users') // Especifica o nome correto da tabela
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  credits: number;

  @Column()
  active: boolean;

  @Column()
  role: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
