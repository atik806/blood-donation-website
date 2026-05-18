import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class Patient{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    bloodGroupNeeded: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'varchar' })
    hospital: string;

    @Column({ type: 'varchar', default: 'normal' })
    urgency: string;

    @Column({
        default: 'patient',

     })
    roles: string;

    @Column({ type: 'varchar', nullable: true })
    petName: string;

    @Column({ type: 'varchar', nullable: true })
    favoriteColor: string;
}