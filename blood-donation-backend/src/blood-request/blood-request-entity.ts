import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class BloodRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  patientId: number;

  @Column({ nullable: true })
  patientName: string;

  @Column({ nullable: true })
  patientPhone: string;

  @Column({ nullable: true })
  patientAddress: string;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column({ nullable: true })
  hospital: string;

  @Column({ nullable: true })
  urgency: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  requestDate: Date;

  @Column({ nullable: true })
  acceptedDate: Date;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  donorId: number;

  @Column({ nullable: true })
  donorName: string;
}