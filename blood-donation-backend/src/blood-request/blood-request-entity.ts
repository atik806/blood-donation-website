import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class BloodRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  bloodGroup: string;

  @Column()
  hospital: string;

  @Column()
  location: string;

  @Column()
  contactNumber: string;

  @Column()
  requestDate: string;

  @Column({
    nullable: true,
  })
  message: string;
}