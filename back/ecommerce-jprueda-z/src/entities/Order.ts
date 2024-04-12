import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";
import { OrderDetail } from "./OrderDetail";



@Entity({
    name: 'orders',
})
export class Order { 
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    date: Date

    //user_id:  (Relación N:1) con users.
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User

    //Relación 1:1 con orderDetails.
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail
}