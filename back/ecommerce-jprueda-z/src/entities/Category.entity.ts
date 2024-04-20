import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Product } from "./Product.entity";

@Entity({
    name: 'categories',
})
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    name: string

    //Relación 1:N con products.
    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn()
    products: Product[]
}