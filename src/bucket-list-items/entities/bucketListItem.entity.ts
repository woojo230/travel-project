import { BucketList } from 'src/bucket-lists/entities/bucketList.entity';
import { Destination } from 'src/destinations/entities/destination.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BucketListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  achieved: boolean;

  @ManyToOne(() => BucketList, (bucketList) => bucketList.items)
  bucketList: BucketList;

  @ManyToOne(() => Destination, (destination) => destination.bucketListItem)
  destination: Destination;
}
