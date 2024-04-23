import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Order } from 'src/entities/Order.entity';
import { OrderDetail } from 'src/entities/OrderDetail.entity';
import { User } from 'src/entities/User.entity';
import { Product } from 'src/entities/Product.entity';


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
    async createOrder (userId: string, products: Partial<Product>[]) { 
        let total = 0;
        const user = await this.usersRepository.findOneBy({id: userId});
        if(!user) throw new Error('User not found');

        const productIdSet = new Set(products.map(product => product.id));
        if (productIdSet.size !== products.length) {
          throw new BadRequestException('You cannot have duplicate products');
      }

        const order = new Order();
        order.user = user;
        order.date = new Date();
        
        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(products.map(async (elem) => {
            const product = await this.productsRepository.findOneBy({id: elem.id, stock: MoreThan(0)});
            if(!product) throw new NotFoundException('Product not found');

            if(product.stock === 0) throw new NotFoundException('Product not available');
            total += Number(product.price);
        
        
        await this.productsRepository.update({id: product.id}, {stock: product.stock - 1});
        return product; 
        }));
        const orderDetail = new OrderDetail();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.ordersDetailsRepository.save(orderDetail);

        const finalOrder = await this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: ['user', 'orderDetails']
          });
          
          if (finalOrder && finalOrder.user) {
            delete finalOrder.user.password;
            delete finalOrder.user.isAdmin;
          }
          
          return finalOrder;
        
    };

    async getOrders(id: string): Promise<Order> {
        const order = this.ordersRepository.findOne( { where: { id: id }, relations: { user: true, orderDetails: true } } );
        if(!order) throw new NotFoundException('Order not found');
        const finalOrder = await this.ordersRepository.findOne({
            where: { id: id },
            relations: ['user', 'orderDetails']
          });
          
          if (finalOrder && finalOrder.user) {
            delete finalOrder.user.password;
            delete finalOrder.user.isAdmin;
          }
          
          return finalOrder;
    }
        
            
}
            
        
    

