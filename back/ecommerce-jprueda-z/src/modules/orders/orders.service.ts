import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Order } from 'src/entities/Order';
import { OrderDetail } from 'src/entities/OrderDetail';
import { User } from 'src/entities/User';
import { Product } from 'src/entities/Product';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private readonly ordersDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}
    async createOrder (userId: string, products: any) {
        let total = 0;
        const user = await this.usersRepository.findOneBy({id: userId});
        if(!user) throw new Error('User not found');
        const order = new Order();
        order.user = user;
        order.date = new Date();
        
        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(products.map(async (elem) => {
            const product = await this.productsRepository.findOneBy({id: elem.id, stock: MoreThan(0)});
            if(!product) throw new Error('Product not found');
            total += Number(product.price);
        
        await this.productsRepository.update({id: product.id}, {stock: product.stock - 1});
        console.log(product.price);
        console.log();
        return product; 
        }));
        const orderDetail = new OrderDetail();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.ordersDetailsRepository.save(orderDetail);

        return await this.ordersRepository.find( { where: { id: newOrder.id }, relations: { user: true, orderDetails: true } } );
        
    };

    getOrders(id: string) {
        const order = this.ordersRepository.findOne( { where: { id: id }, relations: { user: true, orderDetails: true } } );
        if(!order) throw new Error('Order not found');
        return order
    }
        
            
}
            
        
    

