import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Product } from "./Product";
import { Order } from "./Order";

@Entity({
    name: 'order_details'
})
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number

    //order_id: Relación 1:1 con orders.
    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Order

    //Relación N:N con products.
    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({ name: 'order_details_products' })
    products: Product[]
}