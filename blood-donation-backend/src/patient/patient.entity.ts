import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class Patient{
    @PrimaryGeneratedColumn()
    id: number;

    @Column
    name: string;

    @Column({unique:true})
    email: string;

    @Column
    password: string;

    @Column
    bloodGroupNeeded: string;

    @Column
    phone: number;

    @Column
    address: string;

    @Column
    hospital: string;

    @Column({default: 'normal'})
    urgency: string;

}