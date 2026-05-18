import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BloodRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  hospital: string;

  @Column()
  location: string;

  @Column()
  contactNumber: string;

  @Column()
  bloodGroup: string;

  @Column({ nullable: true })
  message: string;

  @Column({ default: 'pending' }) 
  status: string;

  @Column({ nullable: true }) 
  acceptedBy: number;

  @Column({ nullable: true }) 
  acceptedAt: Date;
@Column({
  type: 'timestamp',
  default: () => 'CURRENT_TIMESTAMP',
})
requestDate: Date;
}