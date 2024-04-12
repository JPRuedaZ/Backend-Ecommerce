import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "./Order";



@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    email: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    password: string

    @Column({
        type: 'int',
    })
    phone: number

    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string
    
    @Column({
        type: 'text',
    })
    address: string

    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string

    //orders_id: Relación 1:N con orders.
    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({ name: 'orders_id' })
    orders: Order[]
}

