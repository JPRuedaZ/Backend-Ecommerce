import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Category } from "./Category";
import { OrderDetail } from "./OrderDetail";



@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    name: string

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number

    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number

    @Column({
        type: 'text',
        nullable: false,
    })
    imgUrl: string

    //category_id  (Relación N:1).
    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;


    //Relación N:N con orderDetails.
    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]
}