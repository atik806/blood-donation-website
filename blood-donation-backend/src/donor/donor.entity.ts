import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  bloodGroup: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  available: boolean;

  @Column({ default: 'donor' })
  roles: string;

  @Column({ nullable: true })
  lastDonationDate: string;

  @Column({ default: 0 })
  totalDonations: number;

  @Column({ nullable: true })
  petName: string;

  @Column({ nullable: true })
  favoriteColor: string;
}
